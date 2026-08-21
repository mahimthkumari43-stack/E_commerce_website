// Central Shared State & Cart Management
const ShopApp = {
  // Cart state stored in browser LocalStorage
  getCart() {
    return JSON.parse(localStorage.getItem('shopease_cart')) || [
      { id: 1, name: "Nike Air Max 270", price: 129.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300", quantity: 1, variant: "Men's Shoes - Size 9" },
      { id: 2, name: "Fossil Chronograph Watch", price: 159.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300", quantity: 1, variant: "Color: Brown" },
      { id: 3, name: "Lavie Women's Handbag", price: 49.99, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300", quantity: 1, variant: "Color: Pink" }
    ];
  },

  saveCart(cart) {
    localStorage.setItem('shopease_cart', JSON.stringify(cart));
    this.updateCartBadge();
  },

  addToCart(product) {
    let cart = this.getCart();
    let existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += product.quantity || 1;
    } else {
      cart.push(product);
    }
    this.saveCart(cart);
    alert(`${product.name} added to cart!`);
  },

  updateCartBadge() {
    const cart = this.getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(b => b.textContent = totalCount);
  },

  formatCurrency(num) {
    return '$' + parseFloat(num).toFixed(2);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ShopApp.updateCartBadge();
});