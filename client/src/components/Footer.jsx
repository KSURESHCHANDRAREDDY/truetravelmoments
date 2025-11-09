
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="text-light py-4"
      style={{ backgroundColor: "#111827", borderTop: "3px solid #ff6b5f" }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-start">
        
        {/* ===== Left Section ===== */}
        <div className="mb-3 mb-md-0">
          <h5 className="fw-bold mb-2">
            True<span style={{ color: "#ff6b5f" }}>Travel</span>Moments
          </h5>
          <a href="https://github.com/KSURESHCHANDRAREDDY" className="text-secondary text-decoration-none">Bulit by <span className="text-white text-decoration-underline">K Suresh Chandra Reddy</span></a>
          <p className="mb-0 small text-white">
            © {new Date().getFullYear()} . All rights reserved.
          </p>
        </div>

        {/* ===== Middle Navigation ===== */}
        <div className="text-center mb-3 mb-md-0 align-self-center">
          <Link to="/" className="text-light text-decoration-none mx-3">Home</Link>
          <Link to="/explore" className="text-light text-decoration-none mx-3">Explore</Link>
          <Link to="/about" className="text-light text-decoration-none mx-3">About</Link>
          <Link to="/signup" className="text-light text-decoration-none mx-3">Join</Link>
        </div>

        {/* ===== Right Section (Socials) ===== */}
        <div className="text-md-end">
          <div className="mb-2">
            <a
              href="https://github.com/KSURESHCHANDRAREDDY"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light fs-5 me-3"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/yourlinkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light fs-5 me-3"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            
          </div>

          <Link to="/privacy" className="text-light text-decoration-none small">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
