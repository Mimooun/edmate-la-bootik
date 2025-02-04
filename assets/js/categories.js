$(document).ready(function () {
  let categories = [];

  // Load categories data from a JSON file
  fetch("../../data/categories.json")
    .then((response) => response.json())
    .then((data) => {
      categories = data.categories;

      // Dynamically generate the tab navigation items
      const tabsHtml = categories
        .map(
          (category, index) => `
          <li class="nav-item" role="presentation">
            <button 
              class="nav-link ${index === 0 ? "active" : ""}" 
              id="pills-${category.id}-tab" 
              data-bs-toggle="pill" 
              data-bs-target="#pills-${category.id}" 
              type="button" 
              role="tab" 
              aria-controls="pills-${category.id}" 
              aria-selected="${index === 0}">
              ${category.name}
            </button>
          </li>
        `
        )
        .join("");

      // Append the generated tabs to the pills-tab element
      $("#pills-tab").append(tabsHtml);
    })
    .catch((error) => {
      console.error("Error loading categories data:", error);
    });
});
