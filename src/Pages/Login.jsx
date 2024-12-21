import * as Yup from "yup";
import { useFormik } from "formik";
import propTypes from "prop-types";

export default function Login({ onLogin }) {
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Required field")
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+=-]+$/,
        "Username must contain only English letters and special characters"
      ),
    password: Yup.string()
      .required("Required field")
      .min(7, "Password must be at least 7 characters long")
      .max(12, "Password must be no more than 12 characters long")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number"),
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
      <form onSubmit={formik.handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Username:</label>
          <input
            type="text"
            name="username"
            className={`form-control ${
              formik.touched.username && formik.errors.username
                ? "is-invalid"
                : ""
            }`}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="invalid-feedback">{formik.errors.username}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            className={`form-control ${
              formik.touched.password && formik.errors.password
                ? "is-invalid"
                : ""
            }`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  onLogin: propTypes.func.isRequired,
};
