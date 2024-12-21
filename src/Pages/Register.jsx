import { useFormik } from "formik";
import * as Yup from "yup";
import propTypes from "prop-types";

export default function Register({ onAddUser }) {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required field"),
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+=-]+$/,
        "Username must only contain letters, numbers, and special characters"
      )
      .required("Required field"),
    password: Yup.string()
      .min(7, "Password must be at least 7 characters long")
      .max(12, "Password must be no longer than 12 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Required field"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Required field"),
    firstName: Yup.string()
      .matches(/^[a-zA-Z-]+$/, "First name can only contain letters")
      .required("Required field"),
    lastName: Yup.string()
      .matches(/^[a-zA-Z-]+$/, "Last name can only contain letters")
      .required("Required field"),
    dateOfBirth: Yup.date()
      .required("Required field")
      .test("is-of-age", "Invalid date of birth", function (value) {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--; 
        }

      }),
    profilePicture: Yup.mixed()
      .nullable()
      .test("fileType", "File must be jpg or jpeg", (value) => {
        return !value || ["image/jpeg", "image/jpg"].includes(value.type);
      }),
    city: Yup.string().required("Required field"),
    street: Yup.string()
      .matches(/^[a-zA-Z\u0590-\u05fe-]+$/, "Street must contain only letters")
      .required("Required field"),
    number: Yup.number()
      .min(0, "House number cannot be negative")
      .typeError("Number must be a numeric value")
      .required("Required field"),
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
          <label className="form-label">Email:</label>
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
          <label className="form-label">Username:</label>
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
          <label className="form-label">Password:</label>
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
          <label className="form-label">Confirm Password:</label>
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
          <label className="form-label">First Name:</label>
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
          <label className="form-label">Last Name:</label>
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
          <label className="form-label">Date of Birth:</label>
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
          <label className="form-label">Profile Picture:</label>
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
          <label className="form-label">City:</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            list="city-list" // Add automatic city list
          />
          <datalist id="city-list">
            <option value="Eilat" />
            <option value="Beersheba" />
            <option value="Hod Hasharon" />
            <option value="Hadera" />
            <option value="Haifa" />
            <option value="Jerusalem" />
            <option value="Modi'in" />
            <option value="Netanya" />
            <option value="Petah Tikva" />
            <option value="Ramat Gan" />
            <option value="Ramat Hasharon" />
            <option value="Tel Aviv" />
          </datalist>
          {formik.touched.city && formik.errors.city && (
            <div className="text-danger">{formik.errors.city}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Street:</label>
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
          <label className="form-label">House Number:</label>
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

Register.propTypes = {
  onAddUser: propTypes.func.isRequired,
};
