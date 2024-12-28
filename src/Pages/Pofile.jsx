import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

export default function Profile({ user, logoutUser }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-card">
        <h3>נא להתחבר כדי לראות את פרופילך</h3>
      </div>
    );
  }

  const handleLogout = () => {
    logoutUser(user.email);
  };

  console.log(user);
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
          <strong>שם פרטי:</strong> {user.firstName}
        </p>
        <p>
          <strong>שם משפחה:</strong> {user.lastName}
        </p>
        <p>
          <strong>שם משתמש:</strong> {user.username}
        </p>
        <p>
          <strong>אימייל:</strong> {user.email}
        </p>
        <p>
          <strong>תאריך לידה:</strong> {user.dateOfBirth}
        </p>
        <p>
          <strong>עיר:</strong> {user.city}
        </p>
        <p>
          <strong>רחוב:</strong> {user.street}
        </p>
        <p>
          <strong>מספר בית:</strong> {user.number}
        </p>
      </div>
      {/* קישור למשחק */}
      <div className="game-link">
        <a
          href="https://www.izzygames.com/fireboy-and-watergirl-1-t3534.html?gad_source=1&gclid=Cj0KCQiAvbm7BhC5ARIsAFjwNHt5lvUuLpq5UINpqpLZxIFmBUlRaguJiGhuPnMMPGS3M3lMl2lfnhAaAmzAEALw_wcB"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-game"
        >
          קישור למשחק אונליין האהוב עלינו
        </a>
      </div>

      {/* כפתורים */}
      <div className="buttons">
        <button onClick={handleLogout} className="btn btn-danger">
          <i className="fas fa-sign-out-alt"></i> התנתק
        </button>

        <button
          onClick={() => {
            navigate("/editDetails");
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
