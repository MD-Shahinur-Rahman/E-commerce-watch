let cartItems = [];

// add item to  cart
function addToCart(plantName, price) {
  const existingItem = cartItems.find(item => item.name === plantName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    const item = { name: plantName, price: price, quantity: 1 };
    cartItems.push(item);
  }
  updateCartUI();
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  cartItemsContainer.innerHTML = '';

  // Calculate the total price
  let total = 0;
  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price.toFixed(2)} x ${item.quantity} = ${itemTotal.toFixed(
      2
    )}</span>
      <div class="quantity-controls">
        <button onclick="decreaseQuantity(${index})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
      </div>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItemDiv);
  });

  cartTotalElement.textContent = `${total.toFixed(2)}`;
}

function decreaseQuantity(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
    updateCartUI();
  } else {
    removeFromCart(index);
  }
}

function increaseQuantity(index) {
  cartItems[index].quantity++;
  updateCartUI();
}

function orderNow() {
  console.log('Order placed!');
}

function filterPlant() {
  var userInput = document.getElementById('plantSearch').value.toLowerCase();

  var plantItems = document
    .getElementsByClassName('card-products')[0]
    .getElementsByTagName('h3');

  for (var i = 0; i < plantItems.length; i++) {
    var plantName = plantItems[i].innerText.toLowerCase();
    var plantCard = plantItems[i].parentNode.parentNode;

    if (plantName.includes(userInput)) {
      plantCard.style.display = 'block';
    } else {
      plantCard.style.display = 'none';
    }
  }
}

const loginForm = document.querySelector('.log');
const registerForm = document.querySelector('.reg');

//  login form submission
loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  alert('Login:', email, password);
});

// registration form submission
registerForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  alert('Register:', name, email, password, confirmPassword);
});

window.addEventListener('scroll', function () {
  var navbar = this.document.querySelector('nav');
  navbar.classList.toggle('navsticky', window.scrollY > 0);
});

const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');

cartBtn.addEventListener('click', () => {
  cartSidebar.classList.add('show');
});

closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('show');
});

window.addEventListener('click', e => {
  if (e.target === cartSidebar) {
    cartSidebar.classList.remove('show');
  }
});

const plantSlider = document.querySelector('.plant-slider');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
let isDragging = false;
let currentPosition = 0;
let prevPosition = 0;

plantSlider.addEventListener('mousedown', dragStart);
plantSlider.addEventListener('mouseup', dragEnd);
plantSlider.addEventListener('mouseleave', dragEnd);
plantSlider.addEventListener('mousemove', drag);
plantSlider.addEventListener('touchstart', dragStart);
plantSlider.addEventListener('touchend', dragEnd);
plantSlider.addEventListener('touchmove', drag);

prevArrow.addEventListener('click', () => {
  plantSlider.scrollLeft -= plantSlider.offsetWidth;
});

nextArrow.addEventListener('click', () => {
  plantSlider.scrollLeft += plantSlider.offsetWidth;
});

function dragStart(e) {
  isDragging = true;
  prevPosition = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
}

function dragEnd() {
  isDragging = false;
}

function drag(e) {
  if (!isDragging) return;
  const currentPosition = e.type.includes('mouse')
    ? e.clientX
    : e.touches[0].clientX;
  const diff = prevPosition - currentPosition;
  plantSlider.scrollLeft += diff;
  prevPosition = currentPosition;
}
