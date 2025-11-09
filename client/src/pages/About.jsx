export default function About() {
  return (
    <div className="container my-5">
      <h2>About TrueTravelMoments</h2>
      <p>
        TrueTravelMoments is a global storytelling platform for travelers who believe that every journey
        has a story worth telling. We celebrate honesty over perfection.
      </p>
      <h5>Our Mission</h5>
      <p>
        To build a community of travelers who embrace truth in storytelling —
        sharing their moments of awe, adventure, and self-discovery.
      </p>

      {/* Technologies & Features */}
      <div className="mt-4 p-3 border rounded-3">
        <h5 className="mb-3">What we use</h5>
        <div className="mb-3 d-flex flex-wrap gap-2 align-items-center">
          <span className="badge rounded-pill text-bg-dark"><span className="me-1">⚛️</span> React</span>
          <span className="badge rounded-pill text-bg-dark"><i className="bi bi-diagram-3 me-1"></i> Redux Toolkit</span>
          <span className="badge rounded-pill text-bg-dark"><span className="me-1">🟢</span> Node.js</span>
          <span className="badge rounded-pill text-bg-dark"><span className="me-1">🚂</span> Express</span>
          <span className="badge rounded-pill text-bg-dark"><span className="me-1">🍃</span> MongoDB</span>
          <span className="badge rounded-pill text-bg-dark"><i className="bi bi-shield-lock me-1"></i> JWT</span>
          <span className="badge rounded-pill text-bg-dark"><i className="bi bi-envelope me-1"></i> Nodemailer</span>
          <span className="badge rounded-pill text-bg-dark"><i className="bi bi-bootstrap me-1"></i> Bootstrap</span>
          <span className="badge rounded-pill text-bg-dark"><i className="bi bi-lightning-charge me-1"></i> Vite</span>
        </div>
        <h6 className="mb-2">Key Features</h6>
        <ul className="mb-0">
          <li className="mb-1"><i className="bi bi-check-circle me-2" style={{ color: '#ff6b5f' }}></i>Email OTP-based signup</li>
          <li className="mb-1"><i className="bi bi-check-circle me-2" style={{ color: '#ff6b5f' }}></i>JWT auth with httpOnly cookies</li>
          <li className="mb-1"><i className="bi bi-check-circle me-2" style={{ color: '#ff6b5f' }}></i>State management with Redux Toolkit</li>
          <li className="mb-1"><i className="bi bi-check-circle me-2" style={{ color: '#ff6b5f' }}></i>Create and explore travel stories</li>
          <li className="mb-1"><i className="bi bi-check-circle me-2" style={{ color: '#ff6b5f' }}></i>Responsive UI with Bootstrap</li>
        </ul>
      </div>
      <div className="mt-4 p-3 border rounded-3">
        <h5 className="mb-2">About the Developer</h5>
        <p className="mb-3">Built by <b>K Suresh Chandra Reddy</b> — <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', marginRight: '6px' }}></span>Open to work</p>
        <div className="d-flex gap-3 align-items-center">
          <a href="https://github.com/KSURESHCHANDRAREDDY" target="_blank" rel="noreferrer" className="text-decoration-none">
            <i className="bi bi-github" style={{ color: '#ff6b5f' }}></i> <span className="ms-1">GitHub</span>
          </a>
          <a href="https://your-portfolio-url.example" target="_blank" rel="noreferrer" className="text-decoration-none">
            <i className="bi bi-box-arrow-up-right" style={{ color: '#ff6b5f' }}></i> <span className="ms-1">Portfolio</span>
          </a>
        </div>
      </div>
    </div>
  )
}
