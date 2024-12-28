import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Profile from "./Pages/Pofile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import EditDetails from "./Pages/EditDetails";
import SystemAdmin from "./Pages/SystemAdmin";

import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userList, setList] = useState([]);

  const registerUser = (newUser) => {
    if (
      userList.some(
        (u) => u.username === newUser.username || u.email === newUser.email
      )
    ) {
      alert("יש כבר משתמש רשום עם אימייל או שם משתמש זה");
      return;
    }
    setList([...userList, newUser]);
    alert("נרשמת בהצלחה!");
    navigate("/login");
  };

  const loginUser = (user) => {
    if (user.username && user.password) {
      const foundUser = userList.find(
        (u) => u.username === user.username && u.password === user.password
      );
      if (foundUser) {
        setUser(foundUser);
        navigate("/");
        alert("ברוך הבא " + foundUser.username);
      } else {
        alert("שם משתמש או סיסמה שגויים");
      }
    }
  };

  const loadUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const loadUser = () => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  useEffect(() => {
    const usersFromLocalStorage = loadUsers();
    setList(usersFromLocalStorage);
    const loggedInUser = loadUser();
    setUser(loggedInUser);
  }, []); // on component mount

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(userList));
    console.log("users: ", userList);
  }, [userList]); // when new user is added to the list

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]); // when user logs in

  const logoutUser = (email) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("user"));

    if (loggedInUser && loggedInUser.email === email) {
      sessionStorage.removeItem("user");
      alert("המשתמש התנתק בהצלחה!");
      setUser(null);
      navigate("/login");
    } else {
      alert("המשתמש לא מחובר או שהמייל שגוי");
    }
  };

  const deleteUser = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((user) => user.email !== email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("המשתמש נמחק בהצלחה");
  };

  const editUser = (email, updatedUserDetails) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((user) => user.email === email);
  
    if (userIndex !== -1) {
      const updatedUser = {
        ...users[userIndex],
        username: updatedUserDetails.username || users[userIndex].username,
        password: updatedUserDetails.password || users[userIndex].password,
        passwordConfirm: updatedUserDetails.passwordConfirm || users[userIndex].passwordConfirm,
        firstName: updatedUserDetails.firstName || users[userIndex].firstName,
        lastName: updatedUserDetails.lastName || users[userIndex].lastName,
        dateOfBirth: updatedUserDetails.dateOfBirth || users[userIndex].dateOfBirth,
        profilePicture: updatedUserDetails.profilePicture || users[userIndex].profilePicture,
        city: updatedUserDetails.city || users[userIndex].city,
        street: updatedUserDetails.street || users[userIndex].street,
        number: updatedUserDetails.number || users[userIndex].number,
      };
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
  
      alert("הפרטים עודכנו בהצלחה");
    } else {
      alert("לא נמצאו משתמשים עם המייל הזה");
    }
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
        <div className="container">
          <div className="navbar-nav me-auto">
            <Link to="/profile" className="nav-link">
              <i className="fas fa-user me-2"></i> פרופיל
            </Link>
            <Link to="/editDetails" className="nav-link">
              <i className="fas fa-edit me-2"></i> עריכת פרטים
            </Link>
            <Link to="/systemAdmin" className="nav-link">
              <i className="fas fa-cogs me-2"></i> ניהול
            </Link>
            <Link to="/login" className="nav-link">
              <i className="fas fa-sign-in-alt me-2"></i> התחברות
            </Link>
            <Link to="/register" className="nav-link">
              <i className="fas fa-user-plus me-2"></i> הרשמה
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register onAddUser={registerUser} />} />
        <Route path="/login" element={<Login onLogin={loginUser} />} />
        <Route path="/editDetails" element={<EditDetails />} />
        <Route path="/systemAdmin" element={<SystemAdmin />} />
      </Routes>
    </>
  );
}

export default App;
