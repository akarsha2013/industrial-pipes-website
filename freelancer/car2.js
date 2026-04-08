const vehicles = [
  {
    name: "Swift LX",
    price: 6.5,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
  },
  {
    name: "SUV Pro",
    price: 12,
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
  },
  {
    name: "Sedan X",
    price: 10,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
  },
];

const container = document.getElementById("vehicleContainer");

function render(data) {
  container.innerHTML = data
    .map(
      (v) => `
      <div class="card">
        <img src="${v.image}">
        <h3>${v.name}</h3>
        <p>₹${v.price} Lakhs</p>
      </div>
    `
    )
    .join("");
}

render(vehicles);

// SEARCH + FILTER
function filterData() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filter = document.getElementById("priceFilter").value;

  let result = vehicles.filter((v) => v.name.toLowerCase().includes(search));

  if (filter === "low") result = result.filter((v) => v.price < 8);
  if (filter === "mid")
    result = result.filter((v) => v.price >= 8 && v.price <= 11);
  if (filter === "high") result = result.filter((v) => v.price > 11);

  render(result);
}

document.getElementById("searchInput").addEventListener("input", filterData);
document.getElementById("priceFilter").addEventListener("change", filterData);

// CAROUSEL
const slides = document.querySelectorAll(".slide");
let i = 0;
setInterval(() => {
  slides.forEach((s) => s.classList.remove("active"));
  slides[i].classList.add("active");
  i = (i + 1) % slides.length;
}, 3000);

// REVIEWS
const reviews = document.querySelectorAll(".review");
let r = 0;
setInterval(() => {
  reviews.forEach((el) => el.classList.remove("active"));
  reviews[r].classList.add("active");
  r = (r + 1) % reviews.length;
}, 3000);

// HAMBURGER
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}
