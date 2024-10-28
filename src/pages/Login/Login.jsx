import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import bg from "./../../assets/logPattern.webp";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import GoogleSignInBtn from "../../components/Global/GoogleSignInBtn.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Login() {
  const theme = useTheme();
  const iconColor = theme.palette.icon.primary;
  const loginBgColor = theme.palette.color.login;
  const textColor = theme.palette.text.primary;
  const fieldColor = theme.palette.background.default;
  const borderColor = theme.palette.border;

  const [showPassword, setShowPassword] = useState(false);
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const from = location.pathname?.state || "/";

    if (isAuth) {
      navigate(from);
    }
  }, [isAuth, location, navigate]);

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover opacity-10"
          src={bg}
          alt="Background"
        />
      </div>

      {/* Login Form Section */}
      <section
        className="relative px-9 py-10 mx-6 w-[22rem] rounded-lg max-w-sm shrink-0"
        style={{
          backgroundColor: loginBgColor,
          color: textColor,
          border: `1px solid ${borderColor.primary}88`,
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {() => (
            <Form>
              {/* Email Field */}
              <div className="mb-4 group">
                <div
                  style={{
                    backgroundColor: fieldColor,
                    border: `1px solid ${borderColor.primary}`,
                  }}
                  className="flex items-center rounded-md px-3 py-2 group-focus-within:ring-1 focus-within:ring-blue-500"
                >
                  <Email
                    sx={{ color: iconColor }}
                    className="mr-2 opacity-65 group-focus-within:opacity-100 group-focus-within:text-blue-600"
                  />
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full border-none focus:ring-0 outline-none bg-transparent"
                    style={{ color: textColor }}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div className="mb-6 group">
                <div
                  style={{
                    backgroundColor: fieldColor,
                    border: `1px solid ${borderColor.primary}`,
                  }}
                  className="flex items-center rounded-md px-3 py-2 group-focus-within:ring-1 focus-within:ring-blue-500"
                >
                  <Lock
                    sx={{ color: iconColor }}
                    className="mr-2 opacity-65 group-focus-within:opacity-100 group-focus-within:text-blue-600"
                  />
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full border-none focus:ring-0 outline-none bg-transparent"
                    style={{ color: textColor }}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="focus:outline-none ml-2 opacity-60"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: iconColor }} />
                    ) : (
                      <Visibility sx={{ color: iconColor }} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  background: "#0858F7",
                  textTransform: "unset",
                  fontWeight: "bold",
                  fontSize: "19px",
                  borderRadius: 2,
                  boxShadow: "none",
                  padding: 1,
                }}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>

        {/* forgot password */}
        <button
          className="w-full text-center mt-7 font-semibold text-[.97rem] opacity-60 
        hover:text-blue-600 hover:opacity-90  transition-all duration-300"
        >
          FORGOT PASSWORD
        </button>

        {/* divider */}
        <div className="my-6 mx-6 flex items-center justify-center">
          <div
            className="w-full h-[.1rem] opacity-30 "
            style={{ backgroundColor: borderColor.secondary }}
          ></div>
          <div
            className="rounded-full h-10 w-10 flex items-center justify-center
            text-center font-bold text-lg  opacity-65 shrink-0"
            style={{
              color: textColor,
              border: `2px solid ${borderColor.secondary}50`,
            }}
          >
            or
          </div>
          <div
            className="w-full h-[.1rem] opacity-30"
            style={{ backgroundColor: borderColor.secondary }}
          ></div>
        </div>

        {/* google login section */}
        <GoogleSignInBtn />
      </section>
    </div>
  );
}

// Validation Schema
export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
