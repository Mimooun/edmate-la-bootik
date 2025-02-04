$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const courseId = urlParams.get("courseId");

  fetch("../../data/formations.json")
    .then((response) => response.json())
    .then((data) => {
      let formations = data.formations;

      let formation = formations.find((formation) => {
        return formation.id == id;
      });

      const coursesHtml = formation.courses
        .map((course, index) => {
          return `
            <li class="course-list__item flex-align gap-8 mb-16 active">
              <span class="circle flex-shrink-0 text-32 d-flex text-gray-100"><i class="ph ph-circle"></i></span>
              <div class="w-100">
                <a href="?${new URLSearchParams({
                  ...Object.fromEntries(
                    new URLSearchParams(window.location.search)
                  ),
                  courseId: course.id,
                }).toString()}" 
                class="text-gray-300 fw-medium d-block hover-text-main-600 d-lg-block">
                  ${index + 1}. ${course.name}
                </a>
              </div>
            </li>
        `;
        })
        .join("");

      $("#courses-container").append(coursesHtml);
      $("#formation-name").html(formation.name);
      $("#courses-number").html(formation.courses.length + " cours");

      let course =
        formation.courses.find((course) => {
          return course.id == courseId;
        }) || formation.courses[0];

      $("#course-name").html(course.name);
      $("#course-description").html(course.description);

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

      const thumbnailUrl = course?.isExterne
        ? course.thumbnail
        : `../../assets/videos/${formation.id}/` + course.thumbnail;
      $("#player").attr(
        "poster",
        thumbnailUrl
      );
      const url = course?.isExterne
        ? course.url
        : `../../assets/videos/${formation.id}/` + course.url;
      $("#player source").attr("src", url);
      $("#player")[0].load();
    })
    .catch((error) => console.error("Error fetching formations:", error));
});
