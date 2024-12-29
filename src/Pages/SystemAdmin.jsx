import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function SystemAdmin({ list, onDelete, logoutUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser("admin@gmail.com");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">ניהול משתמשים</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>תמונת פרופיל</th>
              <th>שם משתמש</th>
              <th>שם פרטי</th>
              <th>שם משפחה</th>
              <th>תאריך לידה</th>
              <th>כתובת</th>
              <th>אימייל</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {list.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="profile-picture"
                    />
                  ) : (
                    "אין תמונה"
                  )}
                </td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.dateOfBirth}</td>
                <td>{`${user.street} ${user.number}, ${user.city}`}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      if (user.email === "admin@gmail.com") {
                        alert("לא ניתן לערוך את המנהל המערכתי");
                        return;
                      }
                      navigate("/editDetails", {
                        state: { user: user }, // Pass the current user to the next page
                      });
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (confirm("האם אתה בטוח שברצונך למחוק משתמש זה?")) {
                        // Remove profile picture from local storage
                        localStorage.removeItem(user.email);
                        // Call the onDelete function to remove the user
                        onDelete(user.email);
                      }
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleLogout} className="btn btn-danger">
        <i className="fas fa-sign-out-alt"></i> התנתק
      </button>
    </div>
  );
}

SystemAdmin.propTypes = {
  list: propTypes.array.isRequired,
  onDelete: propTypes.func.isRequired,
  logoutUser: propTypes.func.isRequired,
};
