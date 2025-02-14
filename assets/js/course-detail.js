$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const moduleId = urlParams.get("moduleId");
  const formationId = urlParams.get("formationId");
  const chapitreId = urlParams.get("chapitreId");

  fetch("../../data/formations.json")
    .then((response) => response.json())
    .then((data) => {
      let formations = data.formations;

      let formation = formations.find((formation) => {
        return formation.id == formationId;
      });

      let module = formation.modules.find((module) => {
        return module.id == moduleId;
      });

      const chapitresHtml = module.chapitres
        .map((chapitre, index) => {
          return `
            <li class="course-list__item flex-align gap-8 mb-16 active">
              <span class="circle flex-shrink-0 text-32 d-flex text-gray-100"><i class="ph ph-circle"></i></span>
              <div class="w-100">
                <a href="?${new URLSearchParams({
            ...Object.fromEntries(
              new URLSearchParams(window.location.search)
            ),
            chapitreId: chapitre.id,
          }).toString()}" 
                class="text-gray-300 fw-medium d-block hover-text-main-600 d-lg-block">
                  ${index + 1}. ${chapitre.name}
                  <br>
                  <div class="text-gray-300 fw-medium d-block hover-text-main-600 d-lg-block text-end"> ✅ Réussi</div>
                </a>
              </div>
            </li>
        `;
        })
        .join("");

      $("#courses-container").append(chapitresHtml);
      $("#formation-name").html(formation.name);
      $("#courses-number").html(module.chapitres.length + " cours");

      let chapitre =
        module.chapitres.find((chapitre) => {
          return chapitre.id == chapitreId;
        }) || module.chapitres[0];

      $("#course-name").html(chapitre.name);
      $("#course-description").html(chapitre.description);

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

      $("#formation-resources").append(resourcesHtml);

      if (!chapitre.url) {
        $("#player").hide();
      }

      if (chapitre.images && chapitre.images.length > 0) {
        chapitre.images.map((image) => {
          $("#images-container").append(`
            <div class="rounded-16 overflow-hidden">
                <img src="${image.url}" />
            </div>`);
        });
      }

      if (chapitre.pdfs && chapitre.pdfs.length > 0) {
        chapitre.pdfs.map((pdf) => {
          $("#pdfs-container").append(`
                    <object data="${pdf.url}" type="application/pdf" width="100%" height="500px">
          </object>`);
        });
      }
      if (chapitre.link && chapitre.link.length > 0) {
        chapitre.link.forEach((link) => {
            if (!link.url.includes(".mp4") && !link.url.includes("youtube") && !link.url.includes("vimeo")) {
                window.open(link.url, "_blank");
            }
        });
    }
    
      
      


      const thumbnailUrl = chapitre?.isExterne
        ? chapitre.thumbnail
        : `../../assets/videos/${formation.id}/` + chapitre.thumbnail;
      $("#player").attr("poster", thumbnailUrl);
      const url = chapitre?.isExterne
        ? chapitre.url
        : `../../assets/videos/${formation.id}/` + chapitre.url;
      $("#player source").attr("src", url);
      $("#player")[0].load();
    })
    .catch((error) => console.error("Error fetching formations:", error));
});
