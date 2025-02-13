$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  let formations = [];
  let modules = [];

  const user = localStorage.getItem("connectedUser");
  const parsedUser = JSON.parse(user);

  // Load user data from a JSON file
  fetch("../../data/formations.json")
    .then((response) => response.json())
    .then((data) => {
      formations = data.formations;

      let formation = formations.find((formation) => {
        return formation.id == id;
      });

      modules = formation.modules;

      const modulesHtml = modules
        .map((module, index) => {
          if (parsedUser.formations.includes(formation.id)) {
            return `
                  <div class="col-xxl-3 col-lg-4 col-sm-6">
                        <div class="card border border-gray-100">
                            <div class="card-body">
                                <a href="course-details.html?formationId=${formation.id}&moduleId=${module.id}" class="bg-main-100 rounded-8 overflow-hidden text-center flex-center">
                                    <img src="${module.imageUrl}" alt="Course Image">
                                </a>
                                <div class="p-8">
                                    <span class="text-13 py-2 px-10 rounded-pill bg-success-50 text-success-600 mb-16">${formation.name}</span>
                                    <h5 class="mb-0"><a href="modules.html?id=${module.id}" class="hover-text-main-600">${module.name}</a></h5>

                                   
                                                          
                                    <a href="course-details.html?formationId=${formation.id}&moduleId=${module.id}" class="btn btn-outline-main rounded-pill py-9 w-100 mt-24">Detail module</a>
                                </div>
                            </div>
                        </div>
                    </div>
                  `;
          }

          return "";
        })
        .join("");

      $("#modules-container").append(modulesHtml);
    })
    .catch((error) => {
      console.error("Error loading modules data:", error);
    });
});
