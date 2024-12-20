import { useFormik } from "formik";
import * as Yup from "yup";
import propTypes from "prop-types";

export default function Register({ onAddUser }) {
  const validationSchema = Yup.object({
    email: Yup.string().email("כתובת האימייל אינה תקינה").required("שדה חובה"),
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+=-]+$/,
        "שם המשתמש חייב להכיל רק אותיות באנגלית ותווים מיוחדים"
      )
      .required("שדה חובה"),
    password: Yup.string()
      .min(7, "הסיסמה חייבת להיות לפחות באורך של 7 תווים")
      .max(12, "הסיסמה חייבת להיות לא יותר מ-12 תווים")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "הסיסמה חייבת להכיל לפחות תו מיוחד אחד"
      )
      .matches(/[A-Z]/, "הסיסמה חייבת להכיל לפחות אות אחת גדולה באנגלית")
      .matches(/[0-9]/, "הסיסמה חייבת להכיל לפחות ספרה אחת")
      .required("שדה חובה"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "הסיסמאות אינן תואמות")
      .required("שדה חובה"),
    firstName: Yup.string()
      .matches(/^[a-zA-Zא-ת-]+$/, "השם הפרטי יכול להכיל אותיות בלבד")
      .required("שדה חובה"),
    lastName: Yup.string()
      .matches(/^[a-zA-Zא-ת-]+$/, "שם המשפחה יכול להכיל אותיות בלבד")
      .required("שדה חובה"),
    dateOfBirth: Yup.date()
      .required("שדה חובה")
      .test("is-of-age", "תאריך לידה לא תקין", function (value) {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        const age = new Date(today - birthDate).getUTCFullYear() - 1970;
        return age >= 18 && age < 120;
      }),
    profilePicture: Yup.mixed()
      .nullable()
      .test("fileType", "הקובץ חייב להיות jpg או jpeg", (value) => {
        return !value || ["image/jpeg", "image/jpg"].includes(value.type);
      }),
    city: Yup.string().required("שדה חובה"),
    street: Yup.string()
      .matches(/^[\u0590-\u05fe]+$/, "הרחוב חייב להיות בעברית בלבד")
      .required("שדה חובה"),
    number: Yup.number()
      .min(0, "מספר הבית לא יכול להיות שלילי")
      .typeError("המספר חייב להיות ערך נומרי")
      .required("שדה חובה"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      profilePicture: null,
      city: "",
      street: "",
      number: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onAddUser(values);
    },
  });

  return (
    <div className="container mt-5">
      <form onSubmit={formik.handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">אימייל:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">שם משתמש:</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-danger">{formik.errors.username}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">סיסמה:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">אישור סיסמה:</label>
          <input
            type="password"
            name="passwordConfirm"
            className="form-control"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
            <div className="text-danger">{formik.errors.passwordConfirm}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">שם פרטי:</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-danger">{formik.errors.firstName}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">שם משפחה:</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-danger">{formik.errors.lastName}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">תאריך לידה:</label>
          <input
            type="date"
            name="dateOfBirth"
            className="form-control"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <div className="text-danger">{formik.errors.dateOfBirth}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">תמונת פרופיל:</label>
          <input
            type="file"
            name="profilePicture"
            accept="image/jpeg, image/jpg"
            className="form-control"
            onChange={(e) =>
              formik.setFieldValue("profilePicture", e.target.files[0])
            }
          />
          {formik.touched.profilePicture && formik.errors.profilePicture && (
            <div className="text-danger">{formik.errors.profilePicture}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">עיר:</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            list="city-list" // תווסף את רשימת הערים האוטומטית
          />
          <datalist id="city-list">
            <option value="אילת" />
            <option value="באר שבע" />
            <option value="הוד השרון" />
            <option value="חדרה" />
            <option value="חיפה" />
            <option value="ירושלים" />
            <option value="מודיעין" />
            <option value="נתניה" />
            <option value="פתח תקווה" />
            <option value="רמת גן" />
            <option value="רמת השרון" />
            <option value="תל אביב" />
          </datalist>
          {formik.touched.city && formik.errors.city && (
            <div className="text-danger">{formik.errors.city}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">רחוב:</label>
          <input
            type="text"
            name="street"
            className="form-control"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.street && formik.errors.street && (
            <div className="text-danger">{formik.errors.street}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">מספר בית:</label>
          <input
            type="number"
            name="number"
            className="form-control"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.number && formik.errors.number && (
            <div className="text-danger">{formik.errors.number}</div>
          )}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            נרשם
          </button>
        </div>
      </form>
    </div>
  );
}

Register.propTypes = {
  onAddUser: propTypes.func.isRequired,
};
