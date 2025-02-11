$(document).ready(function () {
  // Check connection status
  const isConnected = localStorage.getItem("isConnected") === "true";
  if (!isConnected) {
    // If not connected, redirect to the sign-in screen
    window.location.href = "sign-in.html";
  } else {
    const user = localStorage.getItem("connectedUser");
    const parsedUser = JSON.parse(user);

    // Load user data from a JSON file
    fetch("../../data/formations.json")
      .then((response) => response.json())
      .then((data) => {
        const formations = data.formations;

        const formationsHtml = formations
          .map((formation) => {
            if (parsedUser.formations.includes(formation.id)) {
              return `
                <div class="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1 mb-16">
                    <div class="flex-align flex-wrap gap-8">
                        <span class="text-main-600 bg-main-50 w-44 h-44 rounded-circle flex-center text-2xl flex-shrink-0"><i class="ph-fill ph-graduation-cap"></i></span>
                        <div>
                            <h6 class="mb-0">${formation.name}</h6> <!-- Assuming you want the formation's name here -->
                        </div>
                    </div>
                    <a href="course-details.html?id=${formation.id}" class="text-gray-900 hover-text-main-600"><i class="ph ph-caret-right"></i></a>
                </div>
              `;
            }
            return "";
          })
          .join("");

        $("#my-formations").append(formationsHtml);

        /* courses length */
        let coursesLength = formations.reduce((total, formation) => {
          if (parsedUser.formations.includes(formation.id)) {
            return total + formation.courses.length;
          }
          return total;
        }, 0);

        let resourcesLength = formations.reduce((total, formation) => {
          if (parsedUser.formations.includes(formation.id)) {
            return total + formation.resources.length;
          }
          return total;
        }, 0);

        $("#courses-length").html(`${coursesLength}+`);
        $("#resouces-length").html(`${resourcesLength}+`);
      })
      .catch((error) => {
        console.error("Error loading formations:", error);
      });
  }
});
