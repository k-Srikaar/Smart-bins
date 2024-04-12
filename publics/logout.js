document
  .getElementById("logout")
  .addEventListener("click", async function (event) {
    // event.preventDefault();

    // localStorage.removeItem("token");

    const response = await fetch("api/v1/users/Logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data);
    if (data.message == "Success") {
      alert("You have been logged out");

      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  });
