import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function SystemAdmin({ list, logoutUser, onDelete }) {
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
                      navigate("/editDetails", { state: { user } });
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (user.email == "admin@gmail.com") {
                        alert("לא ניתן למחוק את המנהל המערכתי");
                        return;
                      }
                      onDelete(user.email);
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
  logoutUser: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
};
