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
            <button class="btn mt-5 text-[#ffffff] bg-[#15803D] rounded-full w-full">Add To Cart</button>
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



// ✅ Load All Plants - Modified
const allCategories = () => {
    showLoadingSpinner();
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((data) => {
            displayAllCat(data.plants);
            hideLoadingSpinner();
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            hideLoadingSpinner(); 
        });
};

// ✅ Show all plants
const displayAllCat = (everyCats) => {
  const allCat = document.getElementById("all-cards");
  allCat.innerHTML = "";
  for (let everyCat of everyCats) {
    const allCatdivs = document.createElement("div");
    allCatdivs.innerHTML = `
    <div class="p-4 shadow-lg rounded-lg bg-white h-full">
      <div class="mb-2">
          <img class=" md:h-48 w-full rounded-md" src=${everyCat.image} alt="">
      </div>
      <div class="">
          <h3 class="text-xl font-semibold mb-3">${everyCat.name}</h3>
          <p class="text-sm font-light mb-8">${everyCat.description}</p>
      </div>
      <div class="flex justify-between items-center mb-4">
          <span class="bg-[#DCFCE7] rounded-full p-3">${everyCat.category}</span>
          <span><span>$</span><span>${everyCat.price}</span></span>
      </div>
      <div class="text-center ">
          <button class="btn bg-[#15803D] text-[#ffffff] rounded-full w-full">Add To Cart</button>
      </div>
    </div>`;
    allCat.append(allCatdivs);
  }
};



// cart data
let desktopCart = [];
let mobileCart = [];

// main container listener (desktop + mobile)
treesContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "Add To Cart") {
    handleDesktopCart(e);
    handleMobileCart(e);
  }

  // ❌ remove item (desktop)
  if (e.target.classList.contains("desktop-remove")) {
    const index = e.target.dataset.index;
    desktopCart.splice(index, 1);
    showDesktopCart(desktopCart);
  }

  // ❌ remove item (mobile)
  if (e.target.classList.contains("mobile-remove")) {
    const index = e.target.dataset.index;
    mobileCart.splice(index, 1);
    showMobileCart(mobileCart);
  }
});


// ================= Desktop Cart =================
const handleDesktopCart = (e) => {
  const title = e.target.parentNode.parentNode.children[1].children[0].innerText;
  const taka = e.target.parentNode.parentNode.children[2].children[1].children[1].innerText;

  desktopCart.push({ title, taka });
  showDesktopCart(desktopCart);
};

const showDesktopCart = (carts) => {
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = "";

  let total = 0;

  carts.forEach((cart, index) => {
    total += parseFloat(cart.taka);
    cartContainer.innerHTML += `
      <div class="flex justify-between items-center border border-gray-200 bg-[#cff0dc49] mb-2 p-3 rounded-lg">
        <div>
          <h1 class="font-semibold">${cart.title}</h1>
          <p><i class="fa-solid fa-bangladeshi-taka-sign"></i>${cart.taka} × 1</p>
        </div>
        <div>
          <i class="fa-solid fa-xmark desktop-remove cursor-pointer " data-index="${index}"></i>
        </div>
      </div>
    `;
  });

  // ✅ Desktop total update
  const desktopTotal = document.querySelector("#treesContainers .flex.p-1 span");
  if (desktopTotal) {
    desktopTotal.innerText = total;
  }
};


// ================= Mobile Cart =================
const handleMobileCart = (e) => {
  const title = e.target.parentNode.parentNode.children[1].children[0].innerText;
  const taka = e.target.parentNode.parentNode.children[2].children[1].children[1].innerText;

  mobileCart.push({ title, taka });
  showMobileCart(mobileCart);

  // ✅ Update counter
  document.getElementById("cartCounts").innerText = mobileCart.length;
};


const showMobileCart = (carts) => {
  const cartContainers = document.getElementById("cardCotainers");
  cartContainers.innerHTML = "";

  let total = 0;

  carts.forEach((cart, index) => {
    total += parseFloat(cart.taka);

    cartContainers.innerHTML += `
      <div class="flex justify-between items-center border border-gray-200 bg-[#cff0dc49] mb-2 p-3 rounded-lg w-full">
        <div>
          <h1 class="font-semibold">${cart.title}</h1>
          <p><i class="fa-solid fa-bangladeshi-taka-sign"></i>${cart.taka} × 1</p>
        </div>
        <div>
          <i class="fa-solid fa-xmark mobile-remove cursor-pointer" data-index="${index}"></i>
        </div>
      </div>
    `;
  });

  // ✅ Mobile total update
  const mobileTotal = document.querySelector(".dropdown-end ul .flex.justify-between p span");
  if (mobileTotal) {
    mobileTotal.innerText = total;
  }

  // ✅ Update cart count
  document.getElementById("cartCounts").innerText = carts.length;
};



// ✅ Loading Functions
const showLoadingSpinner = () => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.classList.remove('hidden');
    }
    const allCards = document.getElementById('all-cards');
    if (allCards) {
        allCards.classList.add('hidden');
    }
};

const hideLoadingSpinner = () => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.classList.add('hidden');
    }
    const allCards = document.getElementById('all-cards');
    if (allCards) {
        allCards.classList.remove('hidden');
    }
};
loadCategories();
