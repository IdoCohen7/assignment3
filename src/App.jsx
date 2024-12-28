import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Profile from "./Pages/Pofile";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import EditDetails from "./Pages/EditDetails";
import SystemAdmin from "./Pages/SystemAdmin";
import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userList, setList] = useState(() => {
    // יצירת משתמש אדמין עם UUID חדש
    const adminUser = {
      id: uuidv4(), // יצירת ID ייחודי בעזרת UUID
      username: "admin",
      password: "ad1234321!aD",
      email: "admin@gmail.com",
      firstName: "מנהל",
      lastName: "מערכת",
      dateOfBirth: "2000-01-01",
      city: "רופין",
      street: "מרכז אקדמי",
      number: 0,
      profilePicture: null, // תוכל להוסיף כאן את הנתונים המתאימים אם יש לך תמונה
      passwordConfirm: "ad1234321!aD",
    };

    // בדיקה אם כבר יש משתמשים, אם לא, נוסיף את המשתמש האדמין
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.length != 0) {
      localStorage.setItem("users", JSON.stringify([adminUser])); // שומר את המשתמש האדמין ב-localStorage
      return [adminUser]; // מחזיר את המשתמש האדמין כסטייט
    }

    return existingUsers; // אם כבר יש משתמשים, מחזיר את הרשימה הקיימת
  });

  const registerUser = (newUser) => {
    if (
      userList.some(
        (u) => u.username === newUser.username || u.email === newUser.email
      )
    ) {
      alert("Username or email already exists");
      return;
    }
    const userWithId = { ...newUser, id: uuidv4() };
    console.log("userWithId: ", userWithId);
    setList([...userList, userWithId]);
    alert("המשתמש נוצר בהצלחה");
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
    if (user && user.email === email) {
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

  const editUser = (editedUser) => {
    console.log("editedUser: ", editedUser);
    // Find the index of the user by ID
    const userIndex = userList.findIndex((u) => u.id === editedUser.id);

    if (userIndex !== -1) {
      // Check if the new username already exists (excluding the current user)
      const usernameExists = userList.some(
        (user) =>
          user.username === editedUser.username && user.id !== editedUser.id
      );

      if (usernameExists) {
        alert("שם המשתמש הזה כבר נמצא בשימוש על ידי משתמש אחר");
        return;
      }

      // Update the user data by merging the existing user with the edited details
      const updatedUser = {
        ...userList[userIndex],
        ...editedUser, // Overwrite with edited user details
      };

      // Update the user in the list
      userList[userIndex] = updatedUser;

      // Update the state with the modified user list
      setList([...userList]);
      setUser(updatedUser);

      console.log("updated userList: ", userList);

      alert("הפרטים עודכנו בהצלחה");
      navigate("/profile");
    } else {
      alert("לא נמצאו משתמשים עם מזהה זה");
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
            {user && user.username == "admin" && (
              <>
                <Link to="/systemAdmin" className="nav-link">
                  <i className="fas fa-cogs me-2"></i> ניהול
                </Link>
              </>
            )}

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
        <Route
          path="/profile"
          element={<Profile user={user} logoutUser={logoutUser} />}
        />
        <Route
          path="/register"
          element={<Register onAddUser={registerUser} />}
        />
        <Route path="/login" element={<Login onLogin={loginUser} />} />
        <Route
          path="/editDetails"
          element={<EditDetails user={user} onEdit={editUser} />}
        />
        <Route path="/systemAdmin" element={<SystemAdmin />} />
      </Routes>
    </>
  );
}

export default App;
