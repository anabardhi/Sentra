const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}


const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (name === "" || email === "" || subject === "" || message === "") {
      alert("Please fill in all fields.");
    } else {
      alert("Message sent successfully!");
      form.reset();
    }
  });
}


const products = document.querySelectorAll(".product-item");

const seikoFilter = document.getElementById("seikoFilter");
const tissotFilter = document.getElementById("tissotFilter");
const alpinaFilter = document.getElementById("alpinaFilter");
const bulovaFilter = document.getElementById("bulovaFilter");

const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const categoryButtons = document.querySelectorAll(".category-btn");
let selectedCategory = "all";

if (products.length > 0 && priceRange && priceValue) {
  function filterProducts() {
    const maxPrice = Number(priceRange.value);

    products.forEach((product) => {
      const card = product.querySelector(".product-card");
      const brand = card.dataset.brand;
      const price = Number(card.dataset.price);
      const category = card.dataset.category;

      let show = true;

      if (price > maxPrice) show = false;
      if (selectedCategory !== "all" && category !== selectedCategory) {
        show = false;
      }

      if (seikoFilter.checked && brand !== "seiko") show = false;
      if (tissotFilter.checked && brand !== "tissot") show = false;
      if (alpinaFilter.checked && brand !== "alpina") show = false;
      if (bulovaFilter.checked && brand !== "bulova") show = false;

      product.style.display = show ? "block" : "none";
    });
  }

  priceRange.addEventListener("input", () => {
    priceValue.textContent = `€${priceRange.value}`;
    filterProducts();
  });

  seikoFilter.addEventListener("change", filterProducts);
  tissotFilter.addEventListener("change", filterProducts);
  alpinaFilter.addEventListener("change", filterProducts);
  bulovaFilter.addEventListener("change", filterProducts);

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      selectedCategory = button.dataset.category;
      filterProducts();
    });
  });
  filterProducts();
}


const clearFilters = document.getElementById("clearFilters");

if (clearFilters) {
  clearFilters.addEventListener("click", () => {
    seikoFilter.checked = false;
    tissotFilter.checked = false;
    alpinaFilter.checked = false;
    bulovaFilter.checked = false;

    priceRange.value = 1200;
    priceValue.textContent = "€1200";
    selectedCategory = "all";

    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    document.querySelector('[data-category="all"]').classList.add("active");

    filterProducts();
  });
}