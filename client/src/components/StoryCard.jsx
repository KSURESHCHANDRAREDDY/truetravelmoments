import { Link } from "react-router-dom";

function StoryCard({ story }) {
  return (
    <div className="card h-100 shadow-sm border-0">
      {/* Story Image */}
      <img
        src={story.image || "https://picsum.photos/400/250"}
        className="card-img-top"
        alt={story.title}
        style={{ objectFit: "cover", height: "230px" }}
      />

      {/* Story Body */}
      <div className="card-body">
        <h5 className="card-title fw-bold">{story.title}</h5>
        <p className="card-text text-muted">
          {story.excerpt?.slice(0, 90) || "A travel story worth telling..."}
        </p>
        <Link to={`/stories/${story._id}`} className="btn btn-outline-orange btn-sm">
          Read More
        </Link>
      </div>

      {/* User Info Footer */}
      <div className="card-footer bg-white border-0 d-flex align-items-center mt-auto">
        <img
          src={story.user?.avatar || "/default-avatar.png"}
          alt={story.user?.name || "User"}
          className="rounded-circle me-2"
          style={{ width: "36px", height: "36px", objectFit: "cover" }}
        />
        <div>
          <h6 className="mb-0 small fw-semibold">
            {story.user?.name || "Traveler Name"}
          </h6>
          <p className="mb-0 text-muted small">
            {story.location || "Somewhere on Earth"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;
