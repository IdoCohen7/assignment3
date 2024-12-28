import { useFormik } from "formik";
import * as Yup from "yup";
import propTypes from "prop-types";

export default function Login({ onLogin }) {
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("שדה חובה")
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+=-]+$/,
        "שם המשתמש חייב להכיל רק אותיות באנגלית ותווים מיוחדים"
      ),
    password: Yup.string()
      .required("שדה חובה")
      .min(7, "הסיסמה חייבת להיות לפחות באורך של 7 תווים")
      .max(12, "הסיסמה חייבת להיות לא יותר מ-12 תווים")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "הסיסמה חייבת להכיל לפחות תו מיוחד אחד"
      )
      .matches(/[A-Z]/, "הסיסמה חייבת להכיל לפחות אות אחת גדולה באנגלית")
      .matches(/[0-9]/, "הסיסמה חייבת להכיל לפחות ספרה אחת"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onLogin(values);
    },
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">התחברות</h1>
    <form onSubmit={formik.handleSubmit} className="row g-3">
      <div className="col-md-6">
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
      </div>

      <div className="col-md-6">
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

      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-sign-in-alt me-2"></i> התחבר
        </button>
      </div>
    </form>
    </div>
  );
}

Login.propTypes = {
  onLogin: propTypes.func.isRequired,
};
