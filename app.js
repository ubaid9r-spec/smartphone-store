/* ============================================
   PHONEZONE — APP LOGIC
   ============================================ */

// ---- PRODUCT DATA ----
const products = [
  { id: 1,  brand: 'Apple',   name: 'iPhone 17 Pro Max',   emoji: '📱', specs: 'A19 Bionic · 6.9" OLED · 5G · Triple 48MP',   price: 1199, oldPrice: 1399, rating: 4.9, reviews: 2341, badge: 'hot',  category: 'apple',   features: ['A19 Bionic Chip', '6.9" Super Retina XDR', 'ProMotion 120Hz', 'Triple Camera System', 'USB-C', 'Face ID'] },
  { id: 2,  brand: 'Apple',   name: 'iPhone 17',           emoji: '📱', specs: 'A19 Bionic · 6.1" OLED · 5G · 48MP',          price: 799,  oldPrice: 899,  rating: 4.8, reviews: 1892, badge: 'new',  category: 'apple',   features: ['A19 Bionic Chip', '6.1" Super Retina XDR', 'Dynamic Island', '48MP Camera', 'USB-C', 'Face ID'] },
  { id: 3,  brand: 'Apple',   name: 'iPhone SE 4',         emoji: '📱', specs: 'A17 Bionic · 4.7" · 5G · 12MP',               price: 449,  oldPrice: 499,  rating: 4.6, reviews: 980,  badge: null,  category: 'apple',   features: ['A17 Bionic Chip', '4.7" Retina HD', 'Touch ID', '12MP Camera', 'USB-C', '5G'] },
  { id: 4,  brand: 'Samsung', name: 'Galaxy S26 Ultra',    emoji: '📲', specs: 'Snapdragon 9 Gen 4 · 6.8" AMOLED · 200MP',    price: 1299, oldPrice: 1499, rating: 4.9, reviews: 1540, badge: 'hot',  category: 'samsung', features: ['Snapdragon 9 Gen 4', '6.8" Dynamic AMOLED 2X', '200MP Camera', 'S Pen Included', '5000mAh', 'Wi-Fi 7'] },
  { id: 5,  brand: 'Samsung', name: 'Galaxy S26+',         emoji: '📲', specs: 'Snapdragon 9 Gen 4 · 6.6" AMOLED · 50MP',     price: 999,  oldPrice: 1149, rating: 4.8, reviews: 1100, badge: 'new',  category: 'samsung', features: ['Snapdragon 9 Gen 4', '6.6" Dynamic AMOLED', '50MP Triple Camera', '4900mAh', '45W Fast Charging', 'Wi-Fi 7'] },
  { id: 6,  brand: 'Samsung', name: 'Galaxy A56',          emoji: '📲', specs: 'Exynos 1580 · 6.7" AMOLED · 50MP',            price: 449,  oldPrice: 549,  rating: 4.5, reviews: 750,  badge: 'sale', category: 'samsung', features: ['Exynos 1580', '6.7" Super AMOLED', '50MP Camera', '5000mAh', '25W Charging', 'IP67'] },
  { id: 7,  brand: 'Google',  name: 'Pixel 10 Pro',        emoji: '🤖', specs: 'Tensor G5 · 6.3" OLED · 50MP',                price: 999,  oldPrice: 1099, rating: 4.8, reviews: 890,  badge: 'new',  category: 'google',  features: ['Tensor G5 Chip', '6.3" LTPO OLED', '50MP Triple Camera', '7 Years Updates', 'AI Features', 'IP68'] },
  { id: 8,  brand: 'Google',  name: 'Pixel 10',            emoji: '🤖', specs: 'Tensor G5 · 6.0" OLED · 50MP',                price: 699,  oldPrice: 799,  rating: 4.7, reviews: 640,  badge: null,  category: 'google',  features: ['Tensor G5 Chip', '6.0" OLED', '50MP Camera', '7 Years Updates', 'Pure Android', 'IP68'] },
  { id: 9,  brand: 'OnePlus', name: 'OnePlus 14 Pro',      emoji: '⚡', specs: 'Snapdragon 8 Gen 4 · 6.7" AMOLED · 50MP',    price: 849,  oldPrice: 999,  rating: 4.7, reviews: 520,  badge: 'hot',  category: 'other',   features: ['Snapdragon 8 Gen 4', '6.7" LTPO 4.0 AMOLED', 'Hasselblad Camera', '100W SuperVOOC', '50W Wireless', 'OxygenOS'] },
  { id: 10, brand: 'Xiaomi',  name: 'Xiaomi 15 Ultra',     emoji: '🔷', specs: 'Snapdragon 8 Gen 4 · 6.7" AMOLED · 200MP',   price: 899,  oldPrice: 1049, rating: 4.7, reviews: 430,  badge: 'new',  category: 'other',   features: ['Snapdragon 8 Gen 4', '6.7" LTPO AMOLED', 'Leica 200MP Camera', '90W HyperCharge', 'Titanium Frame', 'MIUI 17'] },
  { id: 11, brand: 'Sony',    name: 'Xperia 1 VII',        emoji: '💫', specs: 'Snapdragon 8 Gen 4 · 6.5" 4K OLED · 52MP',   price: 1099, oldPrice: 1249, rating: 4.6, reviews: 310,  badge: null,  category: 'other',   features: ['Snapdragon 8 Gen 4', '6.5" 4K OLED 120Hz', '52MP Zeiss Optics', '4K Video Recording', '3.5mm Jack', 'IP68'] },
  { id: 12, brand: 'Motorola',name: 'Edge 60 Pro',         emoji: '🟢', specs: 'Snapdragon 8s Gen 4 · 6.7" pOLED · 50MP',   price: 599,  oldPrice: 699,  rating: 4.5, reviews: 270,  badge: 'sale', category: 'other',   features: ['Snapdragon 8s Gen 4', '6.7" pOLED 165Hz', '50MP Triple Camera', '5000mAh', '125W TurboPower', 'IP68'] },
];

// ---- STATE ----
let cart = [];
let wishlist = JSON.parse(localStorage.getItem('pz-wishlist') || '[]');
let currentFilter = 'all';
let searchQuery = '';
let sortOption = 'featured';
let appliedDiscount = 0; // percentage

// ---- DARK MODE ----
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('pz-theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('pz-theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
  showToast(current === 'light' ? '🌙 Dark mode on' : '☀️ Light mode on');
});

// ---- MOBILE NAV ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- RENDER PRODUCTS WITH SEARCH & SORT ----
function getFilteredAndSortedProducts() {
  let list = products.slice();

  // Category filter
  if (currentFilter !== 'all') {
    list = list.filter(p => p.category === currentFilter);
  }

  // Search filter
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.specs.toLowerCase().includes(q) ||
      (p.features && p.features.some(f => f.toLowerCase().includes(q)))
    );
  }

  // Sorting
  if (sortOption === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const resultsCount = document.getElementById('resultsCount');
  const filtered = getFilteredAndSortedProducts();

  if (resultsCount) {
    resultsCount.textContent = `Showing ${filtered.length} of ${products.length} phones`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🔎</div>
        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 6px;">No phones found</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Try a different keyword or reset filters.</p>
        <button class="btn btn-primary" onclick="clearSearch()" style="margin-top: 16px;">Reset Search</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const isWished = wishlist.includes(p.id);
    return `
      <div class="product-card" data-category="${p.category}" onclick="openModal(${p.id})" style="cursor:pointer">
        <div class="product-image">
          ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge === 'hot' ? '🔥 Hot' : p.badge === 'new' ? '✨ New' : '💸 Sale'}</span>` : ''}
          <button class="wishlist-btn ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); wishlistToggle(${p.id})" title="${isWished ? 'Remove from wishlist' : 'Add to wishlist'}" style="${isWished ? 'opacity: 1; color: var(--danger);' : ''}">
            ${isWished ? '❤️' : '🤍'}
          </button>
          ${p.emoji}
        </div>
        <div class="product-body">
          <div class="product-brand">${p.brand}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-specs">${p.specs}</div>
          <div class="product-rating">
            ${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}
            <span>(${p.reviews.toLocaleString()})</span>
          </div>
          <div class="product-footer">
            <div>
              <div class="product-price">$${p.price.toLocaleString()}</div>
              ${p.oldPrice ? `<div style="font-size:0.75rem; color:var(--text-muted); text-decoration:line-through">$${p.oldPrice.toLocaleString()}</div>` : ''}
            </div>
            <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart('${p.name}', ${p.price}, '${p.emoji}')">+ Cart</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterProducts(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts();
}

function handleSearch(val) {
  searchQuery = val;
  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) {
    clearBtn.style.display = val ? 'block' : 'none';
  }
  renderProducts();
}

function clearSearch() {
  searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';
  renderProducts();
}

function handleSort(val) {
  sortOption = val;
  renderProducts();
}

// ---- CART ----
function addToCart(name, price, emoji = '📱') {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, emoji, qty: 1 });
  }
  updateCartUI();
  showToast(`✅ ${name} added to cart`);
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCartUI();
}

function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(name); return; }
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Badge
  badge.textContent = totalQty;
  badge.classList.remove('bump');
  void badge.offsetWidth; // reflow
  badge.classList.add('bump');

  // Items
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty 🛍️</p>';
    cartFooter.style.display = 'none';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-emoji">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${(item.price * item.qty).toLocaleString()}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty('${item.name}', -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.name}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.name}')" title="Remove">🗑️</button>
      </div>
    `).join('');
    cartFooter.style.display = 'block';
    cartTotal.textContent = `$${totalPrice.toLocaleString()}`;
  }
}

// Toggle Cart Sidebar
function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

document.getElementById('cartBtn').addEventListener('click', toggleCart);

// ---- WISHLIST SYSTEM ----
function wishlistToggle(id) {
  const index = wishlist.indexOf(id);
  const p = products.find(item => item.id === id);
  if (!p) return;

  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`🤍 ${p.name} removed from wishlist`);
  } else {
    wishlist.push(id);
    showToast(`❤️ ${p.name} saved to wishlist`);
  }
  localStorage.setItem('pz-wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  renderProducts(); // re-render to update heart buttons
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlistBadge');
  const itemsContainer = document.getElementById('wishlistItems');
  if (badge) badge.textContent = wishlist.length;

  if (!itemsContainer) return;

  if (wishlist.length === 0) {
    itemsContainer.innerHTML = '<p class="cart-empty">Your wishlist is empty 🤍</p>';
    return;
  }

  const wishedProducts = products.filter(p => wishlist.includes(p.id));
  itemsContainer.innerHTML = wishedProducts.map(p => `
    <div class="cart-item">
      <div class="cart-item-emoji">${p.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-price">$${p.price.toLocaleString()}</div>
        <button class="btn btn-outline" style="padding:4px 10px; font-size:0.75rem; margin-top:6px;" onclick="moveToCart(${p.id})">Move to Cart 🛒</button>
      </div>
      <button class="cart-item-remove" onclick="wishlistToggle(${p.id})" title="Remove">✕</button>
    </div>
  `).join('');
}

function moveToCart(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;
  addToCart(p.name, p.price, p.emoji);
  wishlistToggle(id);
}

function toggleWishlist() {
  const sidebar = document.getElementById('wishlistSidebar');
  const overlay = document.getElementById('wishlistOverlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
    if (sidebar.classList.contains('open')) {
      updateWishlistUI();
    }
  }
}

// ---- FLASH SALE COUNTDOWN ----
let countdownTime = 4 * 3600 + 28 * 60 + 15; // 4 hours 28 mins 15 secs
function initCountdown() {
  setInterval(() => {
    if (countdownTime > 0) {
      countdownTime--;
      const h = Math.floor(countdownTime / 3600);
      const m = Math.floor((countdownTime % 3600) / 60);
      const s = countdownTime % 60;

      const elH = document.getElementById('timerHours');
      const elM = document.getElementById('timerMinutes');
      const elS = document.getElementById('timerSeconds');

      if (elH) elH.textContent = String(h).padStart(2, '0');
      if (elM) elM.textContent = String(m).padStart(2, '0');
      if (elS) elS.textContent = String(s).padStart(2, '0');
    }
  }, 1000);
}

function copyPromoCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToast(`📋 Code "${code}" copied to clipboard!`);
  }).catch(() => {
    showToast(`Use code: ${code}`);
  });
}

// ---- CHECKOUT MODAL & FLOW ----
function openCheckout() {
  if (cart.length === 0) {
    showToast('⚠️ Your cart is empty! Add a phone first.');
    return;
  }

  // Close cart sidebar
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');

  // Reset to form view
  document.getElementById('checkoutFormView').style.display = 'block';
  document.getElementById('checkoutSuccessView').style.display = 'none';

  // Render items and totals
  renderCheckoutSummary();

  document.getElementById('checkoutOverlay').classList.add('open');
  document.getElementById('checkoutModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('open');
  document.getElementById('checkoutModal').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItems');
  const subtotalEl = document.getElementById('coSubtotal');
  const discountRow = document.getElementById('coDiscountRow');
  const discountEl = document.getElementById('coDiscount');
  const discountPercentEl = document.getElementById('discountPercent');
  const totalEl = document.getElementById('coTotal');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = Math.round(subtotal * (appliedDiscount / 100));
  const total = subtotal - discountAmt;

  if (container) {
    container.innerHTML = cart.map(i => `
      <div class="checkout-item-row">
        <span>${i.emoji} ${i.name} × ${i.qty}</span>
        <strong>$${(i.price * i.qty).toLocaleString()}</strong>
      </div>
    `).join('');
  }

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;

  if (appliedDiscount > 0) {
    if (discountRow) discountRow.style.display = 'flex';
    if (discountPercentEl) discountPercentEl.textContent = `${appliedDiscount}%`;
    if (discountEl) discountEl.textContent = `-$${discountAmt.toLocaleString()}`;
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }

  if (totalEl) totalEl.textContent = `$${total.toLocaleString()}`;
}

function applyCoupon() {
  const input = document.getElementById('couponInput');
  const status = document.getElementById('couponStatus');
  if (!input || !status) return;

  const code = input.value.trim().toUpperCase();
  if (code === 'FLASH20') {
    appliedDiscount = 20;
    status.innerHTML = '<span style="color:var(--success);font-weight:700">✅ 20% Discount applied!</span>';
    showToast('🎉 Coupon FLASH20 applied: 20% OFF!');
  } else if (code === 'SAVE10') {
    appliedDiscount = 10;
    status.innerHTML = '<span style="color:var(--success);font-weight:700">✅ 10% Discount applied!</span>';
    showToast('🎉 Coupon SAVE10 applied: 10% OFF!');
  } else {
    status.innerHTML = '<span style="color:var(--danger)">❌ Invalid code. Try FLASH20</span>';
    return;
  }
  renderCheckoutSummary();
}

function selectPaymentMethod(type) {
  document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
  const cardFields = document.getElementById('cardFields');
  const digitalFields = document.getElementById('digitalFields');
  const codFields = document.getElementById('codFields');

  if (type === 'card') {
    document.getElementById('tabCard').classList.add('active');
    cardFields.style.display = 'block';
    digitalFields.style.display = 'none';
    codFields.style.display = 'none';
  } else if (type === 'digital') {
    document.getElementById('tabDigital').classList.add('active');
    cardFields.style.display = 'none';
    digitalFields.style.display = 'block';
    codFields.style.display = 'none';
  } else if (type === 'cod') {
    document.getElementById('tabCod').classList.add('active');
    cardFields.style.display = 'none';
    digitalFields.style.display = 'none';
    codFields.style.display = 'block';
  }
}

// Live card simulator input
function formatCardNumber(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  val = val.match(/.{1,4}/g)?.join(' ') || val;
  input.value = val;
  const sim = document.getElementById('cardSimNumber');
  if (sim) sim.textContent = val || '•••• •••• •••• ••••';
}

function updateSimName(val) {
  const sim = document.getElementById('cardSimName');
  if (sim) sim.textContent = val.toUpperCase().trim() || 'YOUR NAME';
}

function formatExpDate(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 3) {
    val = val.substring(0, 2) + '/' + val.substring(2);
  }
  input.value = val;
  const sim = document.getElementById('cardSimExp');
  if (sim) sim.textContent = val || 'MM/YY';
}

function processOrder(e) {
  e.preventDefault();
  const btn = document.getElementById('placeOrderBtn');
  btn.disabled = true;
  btn.textContent = '🔒 Processing payment...';

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'Place Order Now →';

    const orderId = '#SP-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const discountAmt = Math.round(subtotal * (appliedDiscount / 100));
    const finalAmount = subtotal - discountAmt;

    document.getElementById('receiptOrderId').textContent = orderId;
    document.getElementById('receiptAmount').textContent = `$${finalAmount.toLocaleString()}`;

    document.getElementById('checkoutFormView').style.display = 'none';
    document.getElementById('checkoutSuccessView').style.display = 'block';

    // Clear cart
    cart = [];
    appliedDiscount = 0;
    updateCartUI();

    showToast(`🎉 Order ${orderId} confirmed!`);
  }, 1200);
}

function finishOrder() {
  closeCheckout();
  showToast('🛍️ Happy shopping at SmartPhone Store!');
}

// ---- NEWSLETTER ----
function subscribeNewsletter(e) {
  e.preventDefault();
  showToast('🎉 You\'re subscribed! Welcome to SmartPhone Store.');
  e.target.reset();
}

// ---- CONTACT ----
function submitContact(e) {
  e.preventDefault();
  showToast('📬 Message sent! We\'ll reply within 24 hours.');
  e.target.reset();
}

// ---- TOAST ----
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ---- NAVBAR SCROLL SHADOW & BACK TO TOP ----
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('backToTop');

  if (window.scrollY > 30) {
    if (navbar) navbar.style.boxShadow = 'var(--shadow-md)';
  } else {
    if (navbar) navbar.style.boxShadow = 'none';
  }

  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- INTERSECTION OBSERVER (Fade-in on scroll) ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.why-card, .deal-card, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ---- PRODUCT MODAL ----
function openModal(id) {
  const p = products.find(pr => pr.id === id);
  if (!p) return;

  document.getElementById('modalImage').textContent = p.emoji;
  document.getElementById('modalBrand').textContent = p.brand;
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalRating').innerHTML =
    '★'.repeat(Math.floor(p.rating)) +
    '☆'.repeat(5 - Math.floor(p.rating)) +
    ` <span style="color:var(--text-muted);font-size:0.8rem">(${p.reviews.toLocaleString()} reviews)</span>`;
  document.getElementById('modalSpecs').textContent = p.specs;
  document.getElementById('modalFeatures').innerHTML =
    p.features.map(f => `<span class="modal-feature-tag">${f}</span>`).join('');
  document.getElementById('modalPrice').textContent = `$${p.price.toLocaleString()}`;
  document.getElementById('modalOldPrice').textContent = p.oldPrice ? `$${p.oldPrice.toLocaleString()}` : '';

  document.getElementById('modalAddCart').onclick = (e) => {
    e.stopPropagation();
    addToCart(p.name, p.price, p.emoji);
    closeModal();
  };
  document.getElementById('modalWishlist').onclick = (e) => {
    e.stopPropagation();
    wishlistToggle(p.id);
  };

  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeCheckout();
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartSidebar) cartSidebar.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');

    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const wishlistOverlay = document.getElementById('wishlistOverlay');
    if (wishlistSidebar) wishlistSidebar.classList.remove('open');
    if (wishlistOverlay) wishlistOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ---- INIT ----
renderProducts();
updateCartUI();
updateWishlistUI();
initCountdown();
