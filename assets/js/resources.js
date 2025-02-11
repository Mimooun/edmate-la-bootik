$(document).ready(function () {
  let formations = [];

  const user = localStorage.getItem("connectedUser");
  const parsedUser = JSON.parse(user);

  fetch("../../data/formations.json")
    .then((response) => response.json())
    .then((data) => {
      formations = data.formations;

      const formationsHtml = formations
        .map((formation, index) => {
          const resourcesHtml = formation.resources
            .map((resource, resourceIndex) => {
              return `
                    <a href="assets/resources/${resource.url}" target="_blank">
                      <div class="resource-item" class="fixed-width">
                          <label for="checkbox1" class="cursor-pointer">
                              <span class="d-block mb-16 d-flex align-items-center justify-content-center"><img src="assets/images/thumbs/pdf-file.png" alt=""></span>
                              <span class="text-center d-block text-gray-400 text-15">${resource.name}</span>
                          </label>
                      </div>
                    </a>
                `;
            })
            .join("");

          if (parsedUser.formations.includes(formation.id)) {
            return `
                <div class="px-24">
                    <h4>${formation.name}</h4>
                </div>
                <div class="resource-item-wrapper px-24 mt-32">
                    ${resourcesHtml}
                </div>
            `;
          }
        })
        .join("");

      $("#resources-container").empty().append(formationsHtml);
    })
    .catch((error) => console.error("Error fetching formations:", error));
});



// excercice

