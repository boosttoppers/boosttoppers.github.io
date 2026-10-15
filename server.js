require("dotenv").config();
const express=require("express"),helmet=require("helmet"),cors=require("cors"),rateLimit=require("express-rate-limit"),jwt=require("jsonwebtoken"),crypto=require("crypto");
const {PORT=3000,JWT_SECRET,OTP_SECRET,ALLOWED_ORIGIN}=process.env;
if(!JWT_SECRET||!OTP_SECRET){console.error("Set JWT_SECRET and OTP_SECRET in .env");process.exit(1)}
const app=express();app.set("trust proxy",1);app.use(helmet());app.use(express.json({limit:"1kb"}));
app.use(cors({origin:ALLOWED_ORIGIN?ALLOWED_ORIGIN.split(","):false}));
app.use("/api/",rateLimit({windowMs:15*60*1000,limit:40,standardHeaders:true,legacyHeaders:false}));
const otps=new Map(); // phone -> {hash,exp,tries,last,sent[]}. Use Redis/DB if you run more than one server.
const ok=p=>/^[6-9]\d{9}$/.test(p);
const hmac=(p,c)=>crypto.createHmac("sha256",OTP_SECRET).update(p+":"+c).digest("hex");

// The only place that talks to an SMS provider. Check your provider's current docs and your DLT template.
async function sendSms(mobile,otp){
  if(process.env.SMS_PROVIDER==="msg91"){
    const u=new URL("https://control.msg91.com/api/v5/otp");
    u.search=new URLSearchParams({template_id:process.env.MSG91_TEMPLATE_ID,mobile:"91"+mobile,authkey:process.env.MSG91_AUTHKEY,otp});
    const r=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"});
    const j=await r.json().catch(()=>({}));
    if(!r.ok||j.type==="error")throw new Error("SMS provider error: "+JSON.stringify(j));
    return;
  }
  if(process.env.NODE_ENV!=="production"){console.log(`[DEV ONLY] OTP for ${mobile}: ${otp}`);return}
  throw new Error("No SMS provider configured");
}

app.post("/api/otp/send",async(req,res)=>{
  const p=String(req.body.phone||"");if(!ok(p))return res.status(400).json({error:"Invalid phone number"});
  const now=Date.now(),r=otps.get(p)||{sent:[]};
  r.sent=r.sent.filter(t=>now-t<3600e3);
  if(r.last&&now-r.last<30e3)return res.status(429).json({error:"Wait 30 seconds before requesting another OTP"});
  if(r.sent.length>=5)return res.status(429).json({error:"Too many OTP requests. Try again in an hour"});
  const code=String(crypto.randomInt(0,1e6)).padStart(6,"0");
  try{await sendSms(p,code)}catch(e){console.error(e.message);return res.status(502).json({error:"Could not send SMS"})}
  Object.assign(r,{hash:hmac(p,code),exp:now+5*60e3,tries:0,last:now});r.sent.push(now);otps.set(p,r);
  res.json({ok:true});
});

app.post("/api/otp/verify",(req,res)=>{
  const p=String(req.body.phone||""),c=String(req.body.code||""),r=otps.get(p);
  if(!ok(p)||!/^\d{6}$/.test(c)||!r||!r.hash||Date.now()>r.exp)return res.status(400).json({error:"OTP expired or not requested"});
  if(++r.tries>5){r.hash=null;return res.status(429).json({error:"Too many wrong attempts. Request a new OTP"})}
  const a=Buffer.from(hmac(p,c)),b=Buffer.from(r.hash);
  if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return res.status(400).json({error:"Wrong OTP"});
  r.hash=null;
  res.json({token:jwt.sign({phone:p},JWT_SECRET,{expiresIn:"7d"})});
});

const auth=(req,res,next)=>{try{req.user=jwt.verify((req.headers.authorization||"").replace("Bearer ",""),JWT_SECRET);next()}catch{res.status(401).json({error:"Unauthorized"})}};
app.get("/api/me",auth,(req,res)=>res.json({phone:req.user.phone})); // use `auth` on every protected route
setInterval(()=>{const n=Date.now();for(const[k,v]of otps)if(n>v.exp+36e5)otps.delete(k)},600e3).unref();
app.listen(PORT,()=>console.log("OTP server on port "+PORT));
