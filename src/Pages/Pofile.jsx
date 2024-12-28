import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

export default function Profile({ user, logoutUser }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-card">
        <p style={{ textAlign: "center" }}>נא להתחבר כדי לראות את פרופילך</p>
      </div>
    );
  }

  const handleLogout = () => {
    logoutUser(user.email);
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img
          src={user?.profilePicture || "/default-image.png"}
          alt="Profile"
          className="profile-picture"
        />
        <h1>שלום {user.username}!</h1>
      </div>

      <div className="profile-details">
        <p>
          <strong>שם מלא:</strong> {user.firstName + " " + user.lastName}
        </p>
        <p>
          <strong>אימייל:</strong> {user.email}
        </p>
        <p>
          <strong>תאריך לידה:</strong> {user.dateOfBirth}
        </p>
        <p>
          <strong>כתובת:</strong>{" "}
          {user.street + " " + user.number + ", " + user.city}
        </p>
      </div>
      {/* קישור למשחק */}
      <div className="game-link">
        <a
          href="https://www.izzygames.com/fireboy-and-watergirl-1-t3534.html?gad_source=1&gclid=Cj0KCQiAvbm7BhC5ARIsAFjwNHt5lvUuLpq5UINpqpLZxIFmBUlRaguJiGhuPnMMPGS3M3lMl2lfnhAaAmzAEALw_wcB"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-game" /* הכפתור שכולל את התמונה כרקע */
        >
          <span>קישור למשחק האהוב עלינו</span> {/* טקסט הכפתור */}
        </a>
      </div>

      <div className="buttons">
        <button onClick={handleLogout} className="btn btn-danger">
          <i className="fas fa-sign-out-alt"></i> התנתק
        </button>

        <button
          onClick={() => {
            navigate("/editDetails", { state: { user } });
          }}
          className="btn btn-primary"
        >
          <i className="fas fa-edit"></i> עריכת פרטים
        </button>
      </div>
    </div>
  );
}

Profile.propTypes = {
  user: propTypes.object.isRequired,
  logoutUser: propTypes.func.isRequired,
};
