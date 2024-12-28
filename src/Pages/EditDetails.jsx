import { useFormik } from "formik";
import * as Yup from "yup";
import propTypes from "prop-types";

const validationSchema = Yup.object({
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
    email: user.email || "",  // assuming user is an object with user data
    username: user.username || "",
    password: "",  // don't pre-fill password for security
    passwordConfirm: "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    dateOfBirth: user.dateOfBirth || "",
    profilePicture: user.profilePicture || null,  // profile picture URL or file object
    city: user.city || "",
    street: user.street || "",
    number: user.number || "",
  },
  validationSchema,
  onSubmit: (values) => {
    onEditUser(values);
  },
});

return (
<form className="row g-3" onSubmit={formik.handleSubmit}>
  <div className="col-md-6">
    <label className="form-label">שם פרטי:</label>
    <input
      type="text"
      name="firstName"
      className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
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
      className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
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
      className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
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
      className={`form-control ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'is-invalid' : ''}`}
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
      className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
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
      className={`form-control ${formik.touched.street && formik.errors.street ? 'is-invalid' : ''}`}
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
      className={`form-control ${formik.touched.number && formik.errors.number ? 'is-invalid' : ''}`}
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
      className={`form-control ${formik.touched.profilePicture && formik.errors.profilePicture ? 'is-invalid' : ''}`}
      accept="image/*"
      onChange={handleFileChange}
    />
    {previewImage && (
      <div className="mt-3 text-center">
        <p>תצוגה מקדימה:</p>
        <img
          src={previewImage}
          alt="Profile Preview"
          className="img-thumbnail"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      </div>
    )}
    {formik.touched.profilePicture && formik.errors.profilePicture && (
      <div className="text-danger">{formik.errors.profilePicture}</div>
    )}
  </div>

  <div className="col-12 text-center">
    <button type="submit" className="btn btn-success px-5">
      שמור
    </button>
  </div>
</form>
);
