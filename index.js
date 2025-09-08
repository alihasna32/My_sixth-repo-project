const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      displayDesktopCategories(data.categories);
      displayMobileCategories(data.categories);

      // ✅ Auto-load All Trees on page load
      allCategories();
      // Apply active style on both Desktop & Mobile All Trees
      document.querySelectorAll("#cat-all").forEach(el => {
        el.classList.add("bg-[#15803D]", "text-white", "rounded-sm");
      });
    });
};

// remove active style (desktop + mobile)
const removeActive = () => {
  const treeCat = document.querySelectorAll(".tree-cat");
  for (let cats of treeCat) {
    cats.classList.remove("bg-[#15803D]", "text-white", "rounded-sm");
  }
};

// ✅ when clicking category
const loadTreeCategorie = (id) => {
  removeActive();

  if (id === "all") {
    document.querySelectorAll("#cat-all").forEach(el => {
      el.classList.add("bg-[#15803D]", "text-white", "rounded-sm");
    });
    allCategories(); // ✅ Load all plants
    return;
  }

  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll(`#cat-${id}`).forEach(el => {
        el.classList.add("bg-[#15803D]", "text-white", "rounded-sm");
      });
      displayLoadTreeCategorie(data.plants);
    });
};


// ✅ show plants for a category
const displayLoadTreeCategorie = (TreeCategories) => {
  const treeCat = document.getElementById("all-cards");
  treeCat.innerHTML = "";
  if (!TreeCategories || TreeCategories.length === 0) {
    treeCat.innerHTML = `<p class=" text-center col-span-3 text-red-500">No plants found for this category.</p>`;
    return;
  }

  for (let TreeCategorie of TreeCategories) {
    const treeCatDiv = document.createElement("div");
    treeCatDiv.innerHTML = `   
      <div class="p-4 shadow-lg rounded-lg bg-white h-full">
        <div class="mb-2">
            <img class="md:h-48 w-full rounded-md" src=${TreeCategorie.image} alt="">
        </div>
        <div class="mb-2">
            <h3 class="text-xl font-semibold mb-3">${TreeCategorie.name}</h3>
            <p class="text-sm font-light md:h-30">${TreeCategorie.description}</p>
        </div>
        <div class="flex justify-between items-center md:mb-2">
            <span class="bg-[#DCFCE7] rounded-full p-3">${TreeCategorie.category}</span>
            <span><span>$</span><span>${TreeCategorie.price}</span></span>
        </div>
        <div class="text-center ">
            <button class="btn bg-[#FACC15] text-[#15803D] rounded-full w-full">Add To Cart</button>
        </div>
      </div>`;
    treeCat.append(treeCatDiv);
  }
};

// ✅ Desktop categories
const displayDesktopCategories = (categories) => {
  const tressContainer = document.getElementById("catagories-lists");
  tressContainer.innerHTML = "";

  // Add All Trees first
  const allItem = document.createElement("li");
  allItem.innerHTML = `
      <li id="cat-all" onclick="loadTreeCategorie('all')" 
        class="pl-3 cursor-pointer tree-cat hover:bg-[#15803D] hover:text-white hover:rounded-sm">
        <a>All Trees</a>
      </li>`;
  tressContainer.append(allItem);

  // Add other categories
  for (let categorie of categories) {
    const catlist = document.createElement("li");
    catlist.innerHTML = `
        <li id="cat-${categorie.id}" onclick="loadTreeCategorie(${categorie.id})" 
          class="pl-3  cursor-pointer tree-cat hover:bg-[#15803D] hover:text-white hover:rounded-sm">
          <a>${categorie.category_name}</a>
        </li>`;
    tressContainer.append(catlist);
  }
};

// ✅ Mobile categories
const displayMobileCategories = (categories) => {
  const tressContainer = document.getElementById("catagories-list");
  tressContainer.innerHTML = "";

  // Add All Trees first
  const allItem = document.createElement("li");
  allItem.innerHTML = `
      <li id="cat-all" onclick="loadTreeCategorie('all')" 
        class="cursor-pointer tree-cat hover:bg-[#15803D] hover:text-white hover:rounded-sm">
        <a>All Trees</a>
      </li>`;
  tressContainer.append(allItem);

  // Add other categories
  for (let categorie of categories) {
    const catlist = document.createElement("li");
    catlist.innerHTML = `
        <li id="cat-${categorie.id}" onclick="loadTreeCategorie(${categorie.id})" 
          class="cursor-pointer tree-cat hover:bg-[#15803D] hover:text-white hover:rounded-sm">
          <a>${categorie.category_name}</a>
        </li>`;
    tressContainer.append(catlist);
  }
};
