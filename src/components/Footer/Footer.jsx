import React, { useEffect, useRef } from 'react';
import './Footer.css';
function Footer() {
  const sphereRef = useRef(null);

  useEffect(() => {
    // This effect handles the mousemove animation for the 'sphere' element.
    // It's placed in a useEffect hook to ensure it runs after the component has mounted.
    const handleMouseMove = (e) => {
      if (sphereRef.current) {
        // Calculate the new position based on the mouse position relative to the window size.
        const x = (window.innerWidth - e.pageX) / 50;
        const y = (window.innerHeight - e.pageY) / 50;
        
        // Apply the transform style to the sphere element directly.
        sphereRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    // Add the mousemove event listener to the document.
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove the event listener when the component unmounts.
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  return (
    <>
      {/* Inline styles for the component, replicating the CSS */}
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #000;
            color: #fff;
            overflow-x: hidden;
          }

          /* This is the sphere element for the JavaScript animation */
          .sphere {
              position: fixed;
              top: 50%;
              left: 50%;
              width: 50px;
              height: 50px;
              background: radial-gradient(circle, #5b5b5b, #000);
              border-radius: 50%;
              transform: translate(-50%, -50%);
              z-index: -1;
              pointer-events: none;
              transition: transform 0.2s ease-out;
          }

          /* Styles for the footer section */
          footer {
              background-color: #000;
              color: white;
              padding: 60px 20px;
              font-family: 'Inter', sans-serif;
              border-top: 1px solid #222;
          }
          .footer-content {
              max-width: 1200px;
              margin: 0 auto;
          }
          .footer-cta {
              text-align: center;
              margin-bottom: 40px;
          }
          .footer-title {
              font-family: 'Poppins', sans-serif;
              font-size: 32px;
              font-weight: 700;
              margin-bottom: 10px;
          }
          .footer-subtitle {
              color: #a5a5a5;
              max-width: 600px;
              margin: 0 auto 20px;
          }
          .btn-primary {
              background-color: #245f37;
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              transition: background-color 0.3s ease;
          }
          .btn-primary:hover {
              background-color: #1b472a;
          }
          .footer-divider {
              border-bottom: 1px solid #333;
              margin: 20px 0;
          }
          .footer-links {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              gap: 40px;
          }
          .footer-section {
              flex: 1;
              min-width: 150px;
          }
          .logo {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
          }
          .footer-section-title {
              font-family: 'Poppins', sans-serif;
              font-size: 14px;
              font-weight: 700;
              color: #888;
              text-transform: uppercase;
              margin-bottom: 15px;
          }
          .footer-link {
              display: block;
              color: #a5a5a5;
              text-decoration: none;
              margin-bottom: 8px;
              transition: color 0.3s ease;
          }
          .footer-link:hover {
              color: #fff;
          }
          .footer-bottom {
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
              gap: 20px;
              margin-top: 20px;
          }
          .copyright {
              color: #a5a5a5;
              font-size: 14px;
          }
          .social-links {
              display: flex;
              gap: 20px;
          }
          .social-icon svg {
              width: 24px;
              height: 24px;
              transition: fill 0.3s ease;
          }
          .social-icon:hover svg {
              fill: #fff;
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
              .footer-links {
                  flex-direction: column;
                  gap: 20px;
              }
              .footer-bottom {
                  flex-direction: column;
                  text-align: center;
              }
              .social-links {
                  justify-content: center;
              }
          }
        `}
      </style>
      
      {/* Sphere element for the mousemove animation */}
      <div ref={sphereRef} className="sphere"></div>
      
      {/* Main footer component from your HTML */}
      <footer>
        <div className="footer-content">
          <div className="footer-cta">
            <h2 className="footer-title">
              Your Business.<br />
              Supercharged with AI.
            </h2>
            <p className="footer-subtitle">Save time, boost efficiency, and streamline your business with AI automation from Helium.</p>
            <a href="#" className="btn btn-primary">Book a Call</a>
          </div>
          
          <div className="footer-divider"></div>
          
          <div className="footer-links">
            <div className="footer-section">
              <div className="logo">
                <img src="https://framerusercontent.com/images/xskSMX1ZvOzyPbACw9W97qU5M.png" alt="Helium AI Automation" width="40" height="40" />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', marginLeft: '10px' }}>Helium</span>
              </div>
              <p style={{ color: '#a5a5a5', marginTop: '16px' }}>Powering businesses with AI-driven automation.</p>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-section-title">EXPLORE</h3>
              <a href="#" className="footer-link">Services</a>
              <a href="#" className="footer-link">Case Studies</a>
              <a href="#" className="footer-link">About Us</a>
              <a href="#" className="footer-link">Pricing</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
            
            <div className="footer-section">
              <h3 className="footer-section-title">LEGAL</h3>
              <a href="#" className="footer-link">Terms & Conditions</a>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">404</a>
            </div>
          </div>
          
          <div className="footer-divider"></div>
          
          <div className="footer-bottom">
            <div className="copyright">© 2025 Helium. All rights reserved. Made by Nee Say</div>
            
            <div className="social-links">
              <a href="#" className="social-icon">
                <svg viewBox="0 0 21.333 15.031" fill="#a5a5a5">
                  <path d="M20.887 2.348C20.642 1.424 19.923 0.7 19.001 0.449C17.338 0 10.667 0 10.667 0C10.667 0 3.996 0 2.332 0.449C1.41 0.701 0.692 1.424 0.446 2.348C0 4.022 0 7.516 0 7.516C0 7.516 0 11.009 0.446 12.684C0.691 13.607 1.41 14.331 2.332 14.582C3.996 15.031 10.667 15.031 10.667 15.031C10.667 15.031 17.338 15.031 19.002 14.582C19.924 14.331 20.643 13.608 20.888 12.684C21.333 11.009 21.333 7.516 21.333 7.516C21.333 7.516 21.333 4.022 20.887 2.348ZM8.484 10.687L8.484 4.344L14.06 7.516Z" />
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 21.333 21.255" fill="#a5a5a5">
                  <path d="M8.09 21.02L8.09 13.926L5.891 13.926L5.891 10.667L8.09 10.667L8.09 9.262C8.09 5.631 9.732 3.948 13.297 3.948C13.653 3.948 14.146 3.986 14.602 4.04C14.943 4.075 15.282 4.133 15.616 4.213L15.616 7.169C15.423 7.151 15.229 7.14 15.036 7.137C14.818 7.131 14.601 7.129 14.384 7.129C13.756 7.129 13.265 7.214 12.895 7.404C12.647 7.528 12.438 7.72 12.292 7.956C12.062 8.33 11.959 8.841 11.959 9.514L11.959 10.667L15.443 10.667L15.1 12.536L14.844 13.926L11.959 13.926L11.959 21.255C17.241 20.617 21.333 16.12 21.333 10.667C21.333 4.776 16.557 0 10.667 0C4.776 0 0 4.776 0 10.667C0 15.669 3.444 19.867 8.09 21.02Z" />
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 21.333 21.333" fill="#a5a5a5">
                  <path d="M18.175 18.18L15.016 18.18L15.016 13.229C15.016 12.049 14.992 10.53 13.37 10.53C11.723 10.53 11.471 11.814 11.471 13.142L11.471 18.18L8.312 18.18L8.312 8L11.347 8L11.347 9.388L11.388 9.388C11.812 8.588 12.843 7.743 14.383 7.743C17.584 7.743 18.176 9.85 18.176 12.592L18.176 18.18ZM4.744 6.607C4.257 6.607 3.79 6.414 3.446 6.07C3.102 5.725 2.91 5.258 2.91 4.772C2.911 3.758 3.733 2.937 4.746 2.938C5.759 2.938 6.58 3.76 6.58 4.773C6.579 5.787 5.757 6.608 4.744 6.607ZM6.328 18.18L3.16 18.18L3.16 8L6.328 8ZM19.756 0L1.574 0C0.704 0 0 0.688 0 1.537L0 19.796C0 20.646 0.704 21.333 1.574 21.333L19.753 21.333C20.622 21.333 21.333 20.646 21.333 19.796L21.333 1.537C21.333 0.688 20.622 0 19.753 0Z" />
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 21.333 21.335" fill="#a5a5a5">
                  <path d="M6.249 0.076C5.114 0.129 4.339 0.31 3.663 0.576C2.951 0.845 2.306 1.266 1.775 1.81C1.233 2.343 0.814 2.989 0.548 3.701C0.286 4.38 0.107 5.157 0.057 6.291C0.007 7.427 -0.004 7.791 0.001 10.688C0.007 13.585 0.02 13.948 0.075 15.086C0.129 16.221 0.31 16.996 0.575 17.673C0.849 18.374 1.215 18.968 1.809 19.56C2.343 20.102 2.989 20.521 3.702 20.787C4.38 21.049 5.156 21.228 6.291 21.278C7.427 21.327 7.792 21.339 10.688 21.334C13.583 21.327 13.949 21.315 15.086 21.261C16.223 21.207 16.994 21.025 17.672 20.76C18.384 20.491 19.028 20.07 19.559 19.526C20.101 18.992 20.52 18.347 20.786 17.634C21.048 16.956 21.227 16.18 21.276 15.046C21.326 13.908 21.338 13.543 21.332 10.647C21.327 7.751 21.314 7.388 21.26 6.25C21.207 5.112 21.025 4.341 20.759 3.662C20.489 2.951 20.069 2.307 19.526 1.775C18.992 1.233 18.347 0.814 17.634 0.549C16.955 0.287 16.18 0.108 15.044 0.06C13.909 0.009 13.543 -0.004 10.647 0.001C7.75 0.008 7.387 0.02 6.249 0.076M6.374 19.358C5.334 19.314 4.769 19.141 4.393 18.996C3.93 18.825 3.51 18.553 3.165 18.2C2.809 17.857 2.536 17.439 2.365 16.975C2.218 16.599 2.042 16.035 1.994 14.995C1.941 13.871 1.93 13.534 1.923 10.686C1.918 7.838 1.928 7.501 1.977 6.376C2.022 5.337 2.196 4.772 2.34 4.396C2.532 3.897 2.764 3.542 3.135 3.167C3.479 2.812 3.898 2.539 4.361 2.367C4.737 2.221 5.301 2.046 6.341 1.997C7.465 1.943 7.802 1.933 10.65 1.926C13.497 1.92 13.835 1.931 14.961 1.981C15.999 2.025 16.565 2.198 16.941 2.343C17.439 2.535 17.794 2.766 18.169 3.139C18.543 3.512 18.775 3.865 18.969 4.364C19.116 4.739 19.291 5.302 19.34 6.343C19.393 7.468 19.406 7.806 19.411 10.653C19.415 13.5 19.406 13.838 19.357 14.962C19.311 16.002 19.139 16.566 18.994 16.944C18.802 17.442 18.57 17.798 18.198 18.171C17.854 18.526 17.436 18.799 16.973 18.971C16.598 19.118 16.032 19.293 14.994 19.342C13.869 19.396 13.532 19.406 10.683 19.413C7.835 19.419 7.499 19.407 6.374 19.359M15.07 4.966C15.07 5.484 15.383 5.951 15.862 6.148C16.34 6.345 16.891 6.235 17.256 5.868C17.622 5.501 17.73 4.951 17.531 4.473C17.332 3.995 16.865 3.684 16.347 3.685C15.64 3.686 15.069 4.26 15.07 4.966M5.191 10.678C5.196 13.703 7.653 16.151 10.678 16.145C13.703 16.139 16.15 13.682 16.144 10.657C16.101 7.659 13.655 5.254 10.657 5.259C7.659 5.265 5.222 7.68 5.191 10.678M7.111 10.675C7.107 8.711 8.696 7.116 10.66 7.112C12.624 7.108 14.219 8.697 14.223 10.661C14.226 12.624 12.638 14.219 10.674 14.223C9.731 14.225 8.826 13.852 8.158 13.187C7.49 12.521 7.113 11.618 7.111 10.675" />
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg viewBox="0 0 21.333 19.283" fill="#a5a5a5">
                  <path d="M16.801 0L20.072 0L12.925 8.169L21.333 19.283L14.75 19.283L9.595 12.541L3.694 19.283L0.421 19.283L8.066 10.545L0 0.001L6.75 0.001L11.411 6.163ZM15.653 17.325L17.466 17.325L5.765 1.855L3.82 1.855Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
