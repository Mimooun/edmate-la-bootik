$(document).ready(function () {
  // Check connection status
  const isConnected = localStorage.getItem("isConnected") === "true";
  if (!isConnected) {
    window.location.href = "sign-in.html";
    return;
  }

  // Load formations data first
  fetch("../../data/formations.json")
    .then((response) => response.json())
    .then((formationData) => {
      const formations = formationData.formations;

      // Load users data after formations are ready
      return fetch("../../data/users.json")
        .then((response) => response.json())
        .then((userData) => {
          const users = userData.users.filter((user) => user.role !== "admin");

          const studentsHtml = users
            .map((user) => {
              const formation = formations.find(
                (f) => f.id === user.formations[0]
              ); // ✅ Correct matching
              return `
                <tr>
                  <td class="fixed-width">
                      <div class="form-check">
                          <input class="form-check-input border-gray-200 rounded-4" type="checkbox">
                      </div>
                  </td>
                  <td>
                      <div class="flex-align gap-8">
                          <img src="assets/images/thumbs/student-img1.png" alt="" class="w-40 h-40 rounded-circle">
                          <span class="h6 mb-0 fw-medium text-gray-300">${
                            user.firstname
                          } ${user.lastname}</span>
                      </div>
                  </td>
                  <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">${
                        user.email
                      }</span>
                  </td>
                  <td>
                      <span class="h6 mb-0 fw-medium text-gray-300">${
                        formation ? formation.name : "N/A"
                      }</span> <!-- ✅ Display formation -->
                  </td>
                  <td>
                      <span class="text-13 py-2 px-8 bg-success-50 text-success-600 d-inline-flex align-items-center gap-8 rounded-pill">
                          <span class="w-6 h-6 bg-success-600 rounded-circle flex-shrink-0"></span>
                          Completed
                      </span>
                  </td>
                </tr>
              `;
            })
            .join("");

          $("#studentTable tbody").append(studentsHtml);
        });
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
});
