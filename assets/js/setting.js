$(document).ready(function () {
  const isConnected = localStorage.getItem("isConnected") === "true";
  if (isConnected) {
    const user = localStorage.getItem("connectedUser");
    if (user) {
      const parsedUser = JSON.parse(user);

      $("#user-name").html(parsedUser.name);
      $("#user-diploma").html(parsedUser.diploma);
      $("#user-birthCity").html(parsedUser.birthCity);
      $("#user-birthDate").html(parsedUser.birthDate);

      $("form input#fname").val(parsedUser.firstname);
      $("form input#lname").val(parsedUser.lastname);
      $("form input#email").val(parsedUser.email);
      $("form input#phone").val(parsedUser.phoneNumber);
      $("form input#phone").val(parsedUser.phoneNumber);
      $("form input#adresse").val(parsedUser.address);
    } else {
      console.log("No connected user found in localStorage.");
    }
  }
});
