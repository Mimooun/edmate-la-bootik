$(document).ready(function () {
  let formations = [];

  const user = localStorage.getItem("connectedUser");
  const parsedUser = JSON.parse(user);

  // Load user data from a JSON file
  fetch("../../data/formations.json")
    .then((response) => response.json())
    .then((data) => {
      formations = data.formations;

      const formationsHtml = formations
        .map((formation, index) => {
          if (parsedUser.formations.includes(formation.id)) {
            return `
                  <div class="col-xxl-3 col-lg-4 col-sm-6">
                        <div class="card border border-gray-100">
                            <div class="card-body">
                                <a href="modules.html?id=${formation.id}" class="bg-main-100 rounded-8 overflow-hidden text-center flex-center">
                                    <img src="${formation.imageUrl}" alt="Course Image">
                                </a>
                                <div class="p-8">
                                    <span class="text-13 py-2 px-10 rounded-pill bg-success-50 text-success-600 mb-16">${formation.categoryName}</span>
                                    <h5 class="mb-0"><a href="modules.html?id=${formation.id}" class="hover-text-main-600">${formation.name}</a></h5>

                                    <div class="mt-10">
                                      <p>${formation.description}</p>
                                    </div>
                                                          
                                    <a href="modules.html?id=${formation.id}" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Detail formation</a>
                                </div>
                            </div>
                        </div>
                    </div>
                  `;
          }

          return "";
        })
        .join("");

      $("#formations-container").append(formationsHtml);
    })
    .catch((error) => {
      console.error("Error loading formations data:", error);
    });
});
