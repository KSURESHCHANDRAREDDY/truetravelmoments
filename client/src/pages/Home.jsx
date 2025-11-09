import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useAppSelector } from "../app/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <div className="hero text-center py-5">
        <h1>Discover</h1>
        <h1>
          <span className="highlight">Untold</span> Travel Moments
        </h1>
        <p className="lead">
          Real Stories. Real Journeys. Every trip has a story worth telling.
        </p>
        <div className="mt-4">
          <Link to="/explore" className="btn btn-outline-orange me-2">
            Explore
          </Link>
          <Link to={user ? "/add-story" : "/signup"} className="btn btn-orange">
            Share Your Story
          </Link>
        </div>
      </div>

      {/* ===== FEATURED STORIES ===== */}
      <div className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Featured Travel Moments</h2>
        <div className="row">
          {[1, 2, 3].map((i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`https://picsum.photos/400/250?random=${i}`}
                  className="card-img-top"
                  alt="story"
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">A Journey to Remember</h5>
                  <p className="card-text text-muted">
                    A moment that changed my view of travel forever...
                  </p>
                  <Link to="/explore" className="btn btn-outline-orange btn-sm">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

{/* ===== WHY TRUE TRAVEL MOMENTS ===== */}
<section className="py-5 text-center bg-white">
  <div className="container">
    <h2 className="fw-bold mb-4">
      Why <span className="highlight">True Travel Moments?</span>
    </h2>

    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-8">
        <p className="lead text-muted mb-4">
          Because the best stories aren’t polished — they’re real.  
          Every traveler carries a moment that changed their way of seeing the world.  
          Here, we capture those <span className="highlight fw-semibold">untold emotions</span> 
          and share them with honesty.
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <div className="p-3 bg-light rounded-4 shadow-sm" style={{ width: "250px" }}>
            <i className="bi bi-heart-fill text-orange fs-3 mb-2"></i>
            <h6 className="fw-bold">Authentic Stories</h6>
            <p className="small text-muted mb-0">No filters. No edits. Just truth.</p>
          </div>

          <div className="p-3 bg-light rounded-4 shadow-sm" style={{ width: "250px" }}>
            <i className="bi bi-globe-americas text-orange fs-3 mb-2"></i>
            <h6 className="fw-bold">Global Voices</h6>
            <p className="small text-muted mb-0">Stories from travelers worldwide.</p>
          </div>

          <div className="p-3 bg-light rounded-4 shadow-sm" style={{ width: "250px" }}>
            <i className="bi bi-people-fill text-orange fs-3 mb-2"></i>
            <h6 className="fw-bold">Human Connection</h6>
            <p className="small text-muted mb-0">Feel the journey through others.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ===== COMMUNITY CTA ===== */}
<section
  className="text-center text-light py-5"
  style={{
    backgroundColor: "#ff6b5f",
    backgroundImage:
      "linear-gradient(135deg, rgba(255,107,95,0.9), rgba(17,24,39,0.9))",
  }}
>
  <div className="container py-4">
    <h2 className="fw-bold mb-3">
      Join the <span className="text-warning">Journey</span>
    </h2>
    <p className="lead mb-4" style={{ maxWidth: "650px", margin: "0 auto" }}>
      Become part of a growing community of travelers who believe every story —
      big or small — deserves to be told.
    </p>
    <Link to={user ? "/add-story" : "/signup"} className="btn btn-light btn-lg fw-semibold">
      Share Your Moment
    </Link>
  </div>
</section>

      <Footer/> 
    </>
  );
}
