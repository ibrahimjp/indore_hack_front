import React, { useState, useEffect } from 'react';
import './Pharmacy.css';
// Product data to be mapped over
const PRODUCTS = [
  {
    id: 'p1',
    category: 'Pain Relief',
    title: 'Paracetamol 500mg',
    description: 'Effective pain relief and fever reducer for adults and children (age appropriate).',
    brand: 'HealthCorp',
    image: 'https://images.pexels.com/photos/3683079/pexels-photo-3683079.jpeg',
    price: 12.99,
    oldPrice: 15.99,
  },
  {
    id: 'p2',
    category: 'Vitamins',
    title: 'Vitamin D3 1000IU',
    description: 'Daily vitamin D supplement to support bone health and immunity.',
    brand: 'VitaLife',
    image: 'https://images.pexels.com/photos/3683088/pexels-photo-3683088.jpeg',
    price: 24.99,
    oldPrice: 29.99,
  },
  {
    id: 'p3',
    category: 'Cold & Flu',
    title: 'Cough Syrup 100ml',
    description: 'Soothing relief for persistent cough with gentle formula.',
    brand: 'MediCare',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Caov1IdWfgI_7nIpS3hkqQHaHa?pid=Api&P=0&h=220',
    price: 18.99,
    oldPrice: 22.99,
  },
  {
    id: 'p4',
    category: 'Pain Relief',
    title: 'Ibuprofen 400mg',
    description: 'Anti-inflammatory pain relief for muscle and joint pain.',
    brand: 'PharmaCorp',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300',
    price: 16.99,
    oldPrice: 19.99,
  },
  {
    id: 'p5',
    category: 'Vitamins',
    title: 'Multivitamin Complex',
    description: 'Complete daily nutrition to support overall health.',
    brand: 'NutriMax',
    image: 'https://images.pexels.com/photos/3683081/pexels-photo-3683081.jpeg',
    price: 32.99,
    oldPrice: 39.99,
  },
  {
    id: 'p6',
    category: 'First Aid',
    title: 'First Aid Kit',
    description: 'Essential first aid kit for home and travel emergencies.',
    brand: 'SafeCare',
    image: 'https://tse4.mm.bing.net/th/id/OIP.oxGPo9sN1XhhTWpt6jDuvgHaE8?pid=Api&P=0&h=220',
    price: 45.99,
    oldPrice: 54.99,
  },
];

// Reusable SVG components for Lucide icons
const Link2 = () => (
  <svg style={{ width: '20px', height: '20px', color: 'var(--accent)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" />
    <line x1="8" x2="16" y1="12" y2="12" />
  </svg>
);
const Truck = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 18l-1.5-3H6M3 21h17a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-1a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3" />
    <circle cx="7" cy="18" r="2" />
    <path d="M7 16V9" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);
const Shield = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const Zap = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 12v5h4l-4 5v-5h-4l4-5zM12 2l-4 5h4l-4 5h4" />
  </svg>
);
const Heart = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.84a5.5 5.5 0 0 0-7.78 0L12 6.88l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l8.84 8.84 8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const ShoppingCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 12.2a2 2 0 0 0 2 1.8h9.72a2 2 0 0 0 2-1.8L23 6H6" />
  </svg>
);
const FileText = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
const Upload = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const Clock = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

function Pharmacy() {
  const [cartItems, setCartItems] = useState([]);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false);

  // Calculate total quantity of items in the cart
  const cartTotalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate subtotal of items in the cart
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Show a toast message
  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 1400);
  };

  // Add an item to the cart or increment its quantity if it already exists
  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    showToast('Added to cart');
  };

  // Handle quantity change for a cart item
  const handleQuantityChange = (id, action) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item => {
        if (item.id === id) {
          if (action === 'increment') {
            return { ...item, quantity: item.quantity + 1 };
          } else if (action === 'decrement') {
            return { ...item, quantity: Math.max(1, item.quantity - 1) };
          }
        }
        return item;
      });
      return newItems;
    });
  };

  // Remove an item from the cart
  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Open the cart panel
  const handleOpenCart = () => {
    setIsCartPanelOpen(true);
  };

  // Close the cart panel
  const handleCloseCart = () => {
    setIsCartPanelOpen(false);
  };

  // Handle Escape key to close the cart
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle file upload
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      showToast('Prescription uploaded');
    }
  };

  return (
    <>
      <div className="container">
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-content">
            <div className="hero-top">
              <div className="pill">
                <Link2 />
                Online Pharmacy
              </div>
            </div>
            <h1 id="hero-heading" className="hero-title">Your Health, <span className="accent">Delivered</span></h1>
            <p className="hero-sub">
              Order medicines online with best prices, genuine products, and fast doorstep delivery.
              Compare prices across pharmacies and save money.
            </p>

            {/* features */}
            <div className="features-row" role="list">
              <div className="feature" role="listitem">
                <div className="feature-icon"><Truck /></div>
                <h4>Fast Delivery</h4>
                <p>Same-day delivery for urgent medications and scheduled shipping for convenience.</p>
              </div>
              <div className="feature" role="listitem">
                <div className="feature-icon"><Shield /></div>
                <h4>Authentic Products</h4>
                <p>All medicines sourced from verified manufacturers and quality-checked by pharmacists.</p>
              </div>
              <div className="feature" role="listitem">
                <div className="feature-icon"><Zap /></div>
                <h4>Price Match</h4>
                <p>We compare prices across multiple pharmacies — get the best available price.</p>
              </div>
              <div className="feature" role="listitem">
                <div className="feature-icon"><Heart /></div>
                <h4>Prescription Support</h4>
                <p>Upload prescriptions easily — our pharmacists will verify and prepare your order.</p>
              </div>
            </div>

            {/* search row */}
            <div className="search-wrap" role="search" aria-label="Search medicines">
              <div className="search-left" aria-hidden="false">
                <svg style={{ width: '20px', height: '20px', color: 'var(--accent)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="search" placeholder="Search medicines, supplements, health products..." aria-label="Search medicines" />
              </div>
              <select className="select-cat" aria-label="Select category">
                <option>All Categories</option>
                <option>Vitamins</option>
                <option>Pain Relief</option>
                <option>Cold &amp; Flu</option>
                <option>First Aid</option>
              </select>
              <button id="open-cart" className="cart-btn" aria-label="Open cart" onClick={handleOpenCart}>
                <ShoppingCart style={{ color: '#00120a' }} />
                Cart
                <span className="badge cart-count">{cartTotalQty}</span>
              </button>
            </div>
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <h2 className="section-title">Featured Products</h2>
        <div className="products-grid" aria-live="polite">
          {PRODUCTS.map(product => (
            <article className="product-card" key={product.id}>
              <img className="product-image" src={product.image} alt={product.title} />
              <div className="product-body">
                <div className="meta">{product.category}</div>
                <div className="prod-title">{product.title}</div>
                <div className="prod-desc">{product.description}</div>
                <div className="prod-brand">{product.brand}</div>
                <div className="price-row">
                  <div className="price">${product.price.toFixed(2)}</div>
                  <div className="old">${product.oldPrice.toFixed(2)}</div>
                  <div className="save">Save ${(product.oldPrice - product.price).toFixed(2)}</div>
                </div>
                <button className="add-btn" onClick={() => handleAddToCart(product)}>Add to cart</button>
              </div>
            </article>
          ))}
        </div>

        {/* PRESCRIPTION */}
        <section className="prescription" aria-labelledby="prescription-heading">
          <div className="icon"><FileText /></div>
          <h3 id="prescription-heading">Need Prescription Medicines?</h3>
          <p>Upload your prescription and we'll prepare your order with verified medicines at the best prices.
            Our pharmacists will verify your prescription for safety and contact you if any information is needed.</p>
          <div className="upload-row">
            <label htmlFor="pres-upload">
              <button className="upload-btn" onClick={(e) => { e.preventDefault(); document.getElementById('pres-upload').click(); }}>
                <Upload /> Upload Prescription
              </button>
            </label>
            <input id="pres-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
            <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '6px', color: 'var(--muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(0,255,135,0.04)', display: 'grid', placeItems: 'center', color: 'var(--accent)' }}>
                  <Shield />
                </span>
                <span>Secure & Confidential</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(0,255,135,0.04)', display: 'grid', placeItems: 'center', color: 'var(--accent)' }}>
                  <Clock />
                </span>
                <span>Quick Processing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(0,255,135,0.04)', display: 'grid', placeItems: 'center', color: 'var(--accent)' }}>
                  <Truck />
                </span>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="site-footer">
          <div style={{ marginTop: '18px', color: 'var(--muted)' }}>© 2025 MediCare Pharmacy. All rights reserved.</div>
        </footer>
      </div>

      {/* Cart overlay & panel */}
      {isCartPanelOpen && <div className="cart-overlay" id="cart-overlay" aria-hidden="false" onClick={handleCloseCart}></div>}
      <aside className={`cart-panel ${isCartPanelOpen ? 'open' : ''}`} id="cart-panel" aria-hidden={!isCartPanelOpen}>
        <div className="cart-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <strong style={{ fontSize: '16px', color: 'var(--text-heading)' }}>Your Cart</strong>
          </div>
          <div>
            <button id="close-cart" aria-label="Close cart" onClick={handleCloseCart} style={{ background: 'transparent', border: 'none', fontWeight: '700', fontSize: '20px', cursor: 'pointer', color: 'var(--muted)' }}>✕</button>
          </div>
        </div>
        <div className="cart-items" id="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="cart-meta">
                  <h5>{item.title}</h5>
                  <p>${item.price.toFixed(2)} each</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button onClick={() => handleQuantityChange(item.id, 'decrement')} style={{ border: '1px solid rgba(0,255,135,0.03)', background: 'transparent', padding: '6px', borderRadius: '8px', cursor: 'pointer', color: 'var(--muted)' }}>-</button>
                    <div style={{ minWidth: '26px', textAlign: 'center', color: 'var(--text-heading)' }}>{item.quantity}</div>
                    <button onClick={() => handleQuantityChange(item.id, 'increment')} style={{ border: '1px solid rgba(0,255,135,0.03)', background: 'transparent', padding: '6px', borderRadius: '8px', cursor: 'pointer', color: 'var(--muted)' }}>+</button>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} style={{ background: 'transparent', border: 'none', color: '#ff7b7b', cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: 'var(--muted)', padding: '12px' }}>Your cart is empty</div>
          )}
        </div>
        <div className="cart-footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: '700', color: 'var(--muted)' }}>Subtotal</div>
            <div id="cart-subtotal" style={{ fontWeight: '900', color: 'var(--accent)' }}>${cartSubtotal.toFixed(2)}</div>
          </div>
          <button className="checkout-btn" id="checkout-btn">Checkout</button>
        </div>
      </aside>

      {/* toast */}
      <div className={`toast ${isToastVisible ? 'show' : ''}`} id="toast" role="status" aria-live="polite">
        <span id="toast-dot" className="toast-dot"></span>
        <span id="toast-text">{toastMessage}</span>
      </div>
    </>
  );
}

export default Pharmacy;
