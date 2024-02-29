async function fetchCategories() {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categories = data.data;
  console.log(categories);
  createCategoryButton(categories);
}
function createCategoryButton(categories) {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.classList = `bg-gray-300 category-btn px-4 py-2 text-center text-xl rounded-lg`;
    categoryBtn.innerText = `${category.category}`;
    categoryBtn.addEventListener("click", () => {
      loadDataByCategory(category.category_id);
      const allCategoryButtons = document.querySelectorAll(".category-btn");
      for (const categoryButton of allCategoryButtons) {
        categoryButton.classList.remove("bg-red-500");
      }
      categoryBtn.classList.add("bg-red-500");
    });

    categoryContainer.appendChild(categoryBtn);
  });
}
fetchCategories();

async function loadDataByCategory(categoryId) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const dataById = await response.json();
  const data = dataById.data;
  console.log(dataById);
  makeCard(data);
}

function makeCard(videos) {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    const noData = document.getElementById("no-data-available");
    noData.classList.remove("hidden");
  } else {
    const noData = document.getElementById("no-data-available");
    noData.classList.add("hidden");
  }
  const sortButton = document.getElementById("sorted");
  sortButton.addEventListener("click", () => {
    // videos.sort((a,b) => )
    console.log("hello");
  });
  videos.forEach((video) => {
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
        <div class="w-[320px] h-auto shadow-lg rounded-lg pb-3">
        <div class="overflow-hidden rounded-t-lg h-[170px]">
          <img class="w-[100%] h-auto" src="${video.thumbnail}" alt="" />
        </div>
        <div class="flex mt-4 gap-2 ml-1">
          <div class="rounded-full w-[15%]">
            <img class="rounded-full w-12 h-12" src="${video.authors[0].profile_picture}" alt="" />
          </div>
          <div class="w-[70%]">
            <h3 class="text-xl font-bold text-wrap">${video.title}</h3>
            <div class="flex items-center gap-2">
              <p>${video.authors[0].profile_name}</p>
              <i id='${video.authors[0].profile_name}' class="fa-solid fa-circle-check"></i>
            </div>
            <p>${video.others.views}</p>
          </div>
        </div>
      </div>
        `;
    videoContainer.appendChild(videoDiv);
    const verified = document.getElementById(
      `${video.authors[0].profile_name}`
    );
    if (!video.authors[0].verified) {
      verified.classList.add("hidden");
    }
  });
}
