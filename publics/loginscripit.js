document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    // console.log("in the scripit");
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("api/v1/users/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    // console.log(data);
    if (response.ok) {
      //   localStorage.setItem("token", data.token);
      document.getElementById("message").innerText = "Logged in successfully";
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    } else {
      document.getElementById("message").innerText = data.message;
    }
  });
