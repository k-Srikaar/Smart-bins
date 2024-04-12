document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const response = await fetch("api/v1/users/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    const data = await response.json();
    // console.log(data);
    document.getElementById("message").innerText = data.message;
    if (data.message == "Success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 2000);
    }
  });
