document
  .getElementById("FeedbackForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("userEmail").value;
    const message = document.getElementById("userFeedback").value;

    const response = await fetch("api/v1/users/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, feedback: message }),
    });
    // console.log(response);
    const data = await response.json();
    document.getElementById("message").innerText = data.message;
    if (data.message == "Success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 2000);
    }
  });
