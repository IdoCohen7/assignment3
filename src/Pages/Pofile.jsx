import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Profile({ user, logoutUser }) {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const loadImageFromLocalStorage = (email) => {
    const base64String = localStorage.getItem(email);
    if (base64String) {
      return `data:image/jpeg;base64,${base64String}`;
    }
    return null; // if no image in local storage
  };

  const handleLogout = () => {
    logoutUser(user.email);
  };

  useEffect(() => {
    if (user && user.email) {
      const img = loadImageFromLocalStorage(user.email);
      setImage(img);
    }
  }, [user]); // should run only when user changes

  if (!user) {
    return (
      <div className="profile-card">
        <p style={{ textAlign: "center" }}>נא להתחבר כדי לראות את פרופילך</p>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <img
          src={image || "/default-image.png"} // using default image if no image in state
          alt="Profile"
          className="profile-picture-comp"
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
      {/* Game link */}
      <div className="game-link">
        <a
          href="https://www.izzygames.com/fireboy-and-watergirl-1-t3534.html"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-game"
        >
          <span>קישור למשחק האהוב עלינו</span>
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
  user: propTypes.object,
  logoutUser: propTypes.func.isRequired,
};
