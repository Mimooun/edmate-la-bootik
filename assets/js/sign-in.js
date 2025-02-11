$(document).ready(function () {
  const isConnected = localStorage.getItem("isConnected") === "true";
  if (isConnected) {
    window.location.href = "index.html";
  }
  let users = [];

  // Load user data from a JSON file
  fetch("../../data/users.json")
    .then((response) => response.json())
    .then((data) => {
      users = data.users;
    })
    .catch((error) => {
      console.error("Error loading user data:", error);
    });

  // Handle form submission
  $("form").on("submit", function (e) {
    e.preventDefault();

    const emailOrUsername = $("#fname").val().trim();
    const password = $("#current-password").val().trim();

    let hasError = false;

    // Reset error messages
    $("#fname-error").text("");
    $("#password-error").text("");

    // Add error message if fields are empty
    if (!emailOrUsername) {
      $("#fname-error").text("Veuillez entrer un email ou nom d'utilisateur.");
      $("#fname").addClass("error");
      hasError = true;
    }

    if (!password) {
      $("#password-error").text("Veuillez entrer votre mot de passe.");
      $("#current-password").addClass("error");
      hasError = true;
    }

    if (hasError) return;

    // Find user by email or username
    const user = users.find(
      (u) =>
        (u.email === emailOrUsername || u.name === emailOrUsername) &&
        u.password === password
    );

    if (user) {
      // Set connected flag in localStorage
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("connectedUser", JSON.stringify(user));
      window.location.href = "index.html";
    } else {
      $("#fname-error").text(
        "Email/Nom d'utilisateur ou mot de passe incorrect."
      );
      $("#fname").addClass("error");
      $("#current-password").addClass("error");
    }
  });

  // Remove error class and message on input focus or typing
  $("input").on("focus input", function () {
    $(this).removeClass("error");
    $(this).siblings(".form-error").text("");
  });
});
