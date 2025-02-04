$(document).ready(function () {
  const isConnected = localStorage.getItem("isConnected") === "true";
  if (isConnected) {
    const user = localStorage.getItem("connectedUser");
    if (user) {
      const parsedUser = JSON.parse(user);

      const chatHtml = parsedUser.discution
        .map((data) => {
          return `
            <div class="chat-box-item d-flex align-items-end gap-8 ${
              data.from != "support" ? "right" : ""
            } ">
                    <img src="${
                      data.from == "support"
                        ? "assets/images/thumbs/support-img.png"
                        : "assets/images/thumbs/user-img.png"
                    }" alt="" class="w-40 h-40 rounded-circle object-fit-cover flex-shrink-0">
                    <div class="chat-box-item__content">
                        <p class="chat-box-item__text p-16 rounded-16 mb-12">${
                          data.message
                        }</p>
                        <span class="text-gray-200 text-13 mt-2 d-block">${
                          data.date
                        }</span>
                    </div>
            </div>
        `;
        })
        .join("");

      $("#chat-container").empty().append(chatHtml);
      $("#last-msg").html(parsedUser.discution[parsedUser.discution.length - 1].message);
    } else {
      console.log("No connected user found in localStorage.");
    }
  }
});
