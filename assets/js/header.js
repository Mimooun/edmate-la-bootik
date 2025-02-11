$(document).ready(function () {
  const isConnected = localStorage.getItem("isConnected") === "true";
  if (isConnected) {
    const user = localStorage.getItem("connectedUser");
    if (user) {
      const parsedUser = JSON.parse(user);

      $("#user-info h4").html(parsedUser.name);
      $("#user-info p").html(parsedUser.email);
    } else {
      console.log("No connected user found in localStorage.");
    }
  }
});
