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
      <h1 className="text-center mb-4">הרשמה</h1>
    <form onSubmit={formik.handleSubmit} className="row g-3 container-fluid">
      <div className="col-md-4">
        <label htmlFor="email" className="form-label">אימייל:</label>
        <input
          type="email"
          name="email"
          className={`form-control ${formik.touched.email && !formik.errors.email ? 'is-valid' : formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="email"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="invalid-feedback">{formik.errors.email}</div>
        )}

      </div>

      <div className="col-md-4">
        <label htmlFor="username" className="form-label">שם משתמש:</label>
        <input
          type="text"
          name="username"
          className={`form-control ${formik.touched.username && !formik.errors.username ? 'is-valid' : formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="username"
        />
        {formik.touched.username && formik.errors.username && (
          <div className="invalid-feedback">{formik.errors.username}</div>
        )}
        {formik.touched.username && !formik.errors.username && !formik.values.username && (
          <div className="valid-feedback">Looks good!</div>
        )}
      </div>

      <div className="col-md-4">
        <label htmlFor="password" className="form-label">סיסמה:</label>
        <input
          type="password"
          name="password"
          className={`form-control ${formik.touched.password && !formik.errors.password ? 'is-valid' : formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="password"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="invalid-feedback">{formik.errors.password}</div>
        )}
      </div>

      <div className="col-md-4">
        <label htmlFor="passwordConfirm" className="form-label">אישור סיסמה:</label>
        <input
          type="password"
          name="passwordConfirm"
          className={`form-control ${formik.touched.passwordConfirm && !formik.errors.passwordConfirm ? 'is-valid' : formik.touched.passwordConfirm && formik.errors.passwordConfirm ? 'is-invalid' : ''}`}
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="passwordConfirm"
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
          <div className="invalid-feedback">{formik.errors.passwordConfirm}</div>
        )}
      </div>
      <div className="col-md-4">
        <label htmlFor="firstName" className="form-label">שם פרטי:</label>
        <input
          type="text"
          name="firstName"
          className={`form-control ${formik.touched.firstName && !formik.errors.firstName ? 'is-valid' : formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="firstName"
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="invalid-feedback">{formik.errors.firstName}</div>
        )}
      </div>

      <div className="col-md-4">
        <label htmlFor="lastName" className="form-label">שם משפחה:</label>
        <input
          type="text"
          name="lastName"
          className={`form-control ${formik.touched.lastName && !formik.errors.lastName ? 'is-valid' : formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="lastName"
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="invalid-feedback">{formik.errors.lastName}</div>
        )}
      </div>

      <div className="col-md-4">
        <label htmlFor="dateOfBirth" className="form-label">תאריך לידה:</label>
        <input
          type="date"
          name="dateOfBirth"
          className={`form-control ${formik.touched.dateOfBirth && !formik.errors.dateOfBirth ? 'is-valid' : formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'is-invalid' : ''}`}
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="dateOfBirth"
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
          <div className="invalid-feedback">{formik.errors.dateOfBirth}</div>
        )}
      </div>

      <div className="col-md-4">
        <label htmlFor="profilePicture" className="form-label">תמונת פרופיל:</label>
        <input
          type="file"
          name="profilePicture"
          className={`form-control ${formik.touched.profilePicture && !formik.errors.profilePicture ? 'is-valid' : formik.touched.profilePicture && formik.errors.profilePicture ? 'is-invalid' : ''}`}
          onChange={(e) =>
            formik.setFieldValue("profilePicture", e.target.files[0])
          }
          id="profilePicture"
        />
        {formik.touched.profilePicture && formik.errors.profilePicture && (
          <div className="invalid-feedback">{formik.errors.profilePicture}</div>
        )}
      </div>

      <div className="col-md-4">
        <label htmlFor="city" className="form-label">עיר:</label>
        <input
          type="text"
          name="city"
          className={`form-control ${formik.touched.city && !formik.errors.city ? 'is-valid' : formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="city"
          list="city-list"
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
          <div className="invalid-feedback">{formik.errors.city}</div>
        )}
      </div>
      <div className="col-md-4">
        <label htmlFor="street" className="form-label">רחוב:</label>
        <input
          type="text"
          name="street"
          className={`form-control ${formik.touched.street && !formik.errors.street ? 'is-valid' : formik.touched.street && formik.errors.street ? 'is-invalid' : ''}`}
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="street"
        />
        {formik.touched.street && formik.errors.street && (
          <div className="invalid-feedback">{formik.errors.street}</div>
        )}
      </div>

      <div className="col-md-4">
        <label htmlFor="number" className="form-label">מספר בית:</label>
        <input
          type="number"
          name="number"
          className={`form-control ${formik.touched.number && !formik.errors.number ? 'is-valid' : formik.touched.number && formik.errors.number ? 'is-invalid' : ''}`}
          value={formik.values.number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="number"
        />
        {formik.touched.number && formik.errors.number && (
          <div className="invalid-feedback">{formik.errors.number}</div>
        )}
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-user-plus me-2"></i> נרשם
        </button>
      </div>

    </form>
  </div>
  );
}

Register.propTypes = {
  onAddUser: propTypes.func.isRequired,
};
