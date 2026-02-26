async function askAI() {
  const question = document.getElementById("question").value;

  try {
    const response = await axios.post(
      "https://your-backend-url.com/api/ask-ai",
      {
        message: question,
        model: "gpt"
      }
    );

    document.getElementById("answer").innerText =
      response.data.reply;
  } catch (error) {
    document.getElementById("answer").innerText =
      "Server error";
  }
}
