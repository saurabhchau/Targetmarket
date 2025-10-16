// Toggle mobile menu
function toggleMenu() {
  const nav = document.getElementById('nav-menu');
  nav.classList.toggle('active');
}

// Product Data
const products = [
  {id:1,title:"Flipkart",Sale:'50% to 80% off',cat:'mens',img:'images/flipkart.png',affiliate:'https://fktr.in/zghpiIa',discount:'-20%'},
  {id:2,title:"Puma",Sale:'50% to 80% off',cat:'womens',img:'images/puma.png',affiliate:'https://bitli.in/1lhfkoy',discount:'-30%'},
  {id:3,title:"Make My Trip",Sale:'50% to 80% off',cat:'child',img:'images/makemytrip.png',affiliate:'https://bitli.in/2i3f5jy',discount:'-25%'},
  {id:4,title:"SBI Credit Card",Sale:'50% to 80% off',cat:'gadget',img:'images/sbicard.png',affiliate:'https://bitli.in/ai7QXrL',discount:'-15%'},
  {id:5,title:"AJIO",Sale:'50% to 80% off',cat:'laptop',img:'images/ajio.png',affiliate:'https://ajiio.in/s6C843q',discount:'-10%'},
  {id:6,title:"Croma",Sale:'50% to 80% off',cat:'electronics',img:'images/croma.png',affiliate:'https://bitli.in/HdgqQMg',discount:'-20%'},
  {id:7,title:"Bajaj Finserv",Sale:'50% to 80% off',cat:'grocery',img:'images/bajaj finserv.png',affiliate:'https://bitli.in/uScZBfS',discount:'-35%'},
  {id:8,title:"Myntra - Buy Now",Sale:'50% to 80% off',cat:'fashion',img:'images/myntra.png',affiliate:'https://myntr.it/ljWi1c8',discount:'-20%'},
  {id:9,title:"HSBC Credit Card",Sale:'50% to 80% off',cat:'finance',img:'images/hsbc.png',affiliate:'https://bitli.in/pKHkJkD',discount:'-20%'},
  {id:10,title:"Axis MyZone Card",Sale:'50% to 80% off',cat:'finance',img:'images/axis bank.png',affiliate:'https://bitli.in/lSbDlTW',discount:'-20%'},
  {id:11,title:"Noise",Sale:'50% to 80% off',cat:'gadgets',img:'images/noise.png',affiliate:'https://bitli.in/WpPRTDp',discount:'-20%'},
  {id:12,title:"IDFC FIRST Bank",Sale:'50% to 80% off',cat:'finance',img:'images/idfc first bank.png',affiliate:'https://bitli.in/2Zwwtgr',discount:'-20%'},
  {id:13,title:"VLCC",Sale:'50% to 80% off',cat:'beauty',img:'images/vlcc.png',affiliate:'https://bitli.in/iP3s409',discount:'-20%'},
];

const grid = document.getElementById('productGrid');

function render(list) {
  grid.innerHTML = '';
  list.forEach(p => {
    grid.innerHTML += `
      <div class='product-card'>
        <div class='discount-tag'>${p.discount}</div>
        <a href='${p.affiliate}' target="_blank">
          <img src='${p.img}' alt='${p.title}'>
          <div class='product-info'>
            <h3>${p.title}</h3>
            <p>${p.Sale}</p>
          </div>
        </a>
      </div>`;
  });
}

render(products);

// Search Function
function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.title.toLowerCase().includes(input));
  render(filtered);
}

// Cart Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Ensure numeric price for sum calculation
cart.forEach(item => {
    if(!item.priceNum) {
        // If price has ₹ or is string, convert to number
        item.priceNum = parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) || 0;
    }
});

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if(!product.priceNum) {
        product.priceNum = parseFloat(product.price.toString().replace(/[^0-9.]/g, '')) || 0;
    }
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function toggleCart() {
    const popup = document.getElementById('cartPopup');
    popup.classList.toggle('active');
    showCart();
}

function showCart() {
    const list = document.getElementById('cartItems');
    const total = document.getElementById('cartTotal');
    list.innerHTML = '';
    let sum = 0;
    cart.forEach((item, i) => {
        list.innerHTML += `<li>${item.title} - ₹${item.priceNum} <button onclick="removeItem(${i})">❌</button></li>`;
        sum += item.priceNum;
    });
    total.innerText = `Total: ₹${sum}`;
}

// Toggle mobile menu
    function toggleMenu() {
      const nav = document.getElementById('nav-menu');
      nav.classList.toggle('active');
    }

    // Toggle cart popup
    function toggleCart() {
      const popup = document.getElementById('cartPopup');
      popup.classList.toggle('active');
    }
function removeItem(i) {
    cart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart();
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    showCart();
}

// Initialize
updateCartCount();
showCart();

// Load and display products from CSV
document.addEventListener("DOMContentLoaded", () => {
  fetch("Demo_CSV.csv")
    .then((response) => response.text())
    .then((data) => {
      const rows = data.split("\n").slice(1); // Skip header
      const productGrid = document.getElementById("productGrid");

      rows.forEach((row) => {
        const columns = row.split(",");
        if (columns.length < 3) return; // Skip invalid rows

        const [name, price, image, category, description] = columns;

        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
          <img src="${image.trim()}" alt="${name.trim()}">
          <h3>${name.trim()}</h3>
          <p>${description?.trim() || ""}</p>
          <p><strong>₹${price.trim()}</strong></p>
          <button onclick="addToCart('${name.trim()}', ${price.trim()}, '${image.trim()}')">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
      });
    })
    .catch((err) => console.error("Error loading CSV:", err));
});


