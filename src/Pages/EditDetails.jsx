import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

export default function EditDetails({ user, onEdit }) {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[a-zA-Zא-ת-]+$/, "השם הפרטי יכול להכיל אותיות בלבד")
      .required("שדה חובה"),
    lastName: Yup.string()
      .matches(/^[a-zA-Zא-ת-]+$/, "שם המשפחה יכול להכיל אותיות בלבד")
      .required("שדה חובה"),
    username: Yup.string()
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+=-]+$/,
        "שם המשתמש חייב להכיל רק אותיות באנגלית ותווים מיוחדים"
      )
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
    city: Yup.string().required("שדה חובה"),
    street: Yup.string()
      .matches(/^[\u0590-\u05fe]+$/, "הרחוב חייב להיות בעברית בלבד")
      .required("שדה חובה"),
    number: Yup.number()
      .min(0, "מספר הבית לא יכול להיות שלילי")
      .typeError("המספר חייב להיות ערך נומרי")
      .required("שדה חובה"),
    profilePicture: Yup.mixed()
      .nullable()
      .test("fileType", "הקובץ חייב להיות jpg או jpeg", (value) => {
        return !value || ["image/jpeg", "image/jpg"].includes(value?.type);
      }),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      dateOfBirth: user?.dateOfBirth || "",
      city: user?.city || "",
      street: user?.street || "",
      number: user?.number || "",
      profilePicture: user?.profilePicture || null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onEdit({ ...values, id: user.id });
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("profilePicture", file);
    }
  };

  if (!user) {
    return (
      <p className="text-center mt-5">לא נמצא משתמש מחובר. אנא התחבר מחדש.</p>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">עריכת פרטי משתמש</h1>
      <form className="row g-3" onSubmit={formik.handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">שם פרטי:</label>
          <input
            type="text"
            name="firstName"
            className={`form-control ${
              formik.touched.firstName && formik.errors.firstName
                ? "is-invalid"
                : ""
            }`}
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
            className={`form-control ${
              formik.touched.lastName && formik.errors.lastName
                ? "is-invalid"
                : ""
            }`}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-danger">{formik.errors.lastName}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">שם משתמש:</label>
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
            <div className="text-danger">{formik.errors.username}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">תאריך לידה:</label>
          <input
            type="date"
            name="dateOfBirth"
            className={`form-control ${
              formik.touched.dateOfBirth && formik.errors.dateOfBirth
                ? "is-invalid"
                : ""
            }`}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <div className="text-danger">{formik.errors.dateOfBirth}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">עיר:</label>
          <input
            type="text"
            name="city"
            className={`form-control ${
              formik.touched.city && formik.errors.city ? "is-invalid" : ""
            }`}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city && (
            <div className="text-danger">{formik.errors.city}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">רחוב:</label>
          <input
            type="text"
            name="street"
            className={`form-control ${
              formik.touched.street && formik.errors.street ? "is-invalid" : ""
            }`}
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
            className={`form-control ${
              formik.touched.number && formik.errors.number ? "is-invalid" : ""
            }`}
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.number && formik.errors.number && (
            <div className="text-danger">{formik.errors.number}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">תמונת פרופיל:</label>
          <input
            type="file"
            className={`form-control ${
              formik.touched.profilePicture && formik.errors.profilePicture
                ? "is-invalid"
                : ""
            }`}
            accept="image/*"
            onChange={handleFileChange}
          />
          {formik.touched.profilePicture && formik.errors.profilePicture && (
            <div className="text-danger">{formik.errors.profilePicture}</div>
          )}
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-success px-5">
            <i className="fas fa-save"></i> שמור
          </button>
        </div>
      </form>
    </div>
  );
}

EditDetails.propTypes = {
  user: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
};
