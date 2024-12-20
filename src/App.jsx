import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
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

  return (
    <>
      <h2>המשחק האהוב עליי</h2>
      <button className="logout-bttn">התנתקות</button>
      <Link to="/">בית</Link> | <Link to="/login">התחברות</Link> |{" "}
      <Link to="/register">הרשמה</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register onAddUser={registerUser} />}
        />
        <Route path="/login" element={<Login onLogin={loginUser} />} />
      </Routes>
    </>
  );
}

export default App;
