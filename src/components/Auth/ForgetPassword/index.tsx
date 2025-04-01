import { Link } from "react-router";

export const ForgotPassword = () => {
  return (
    <p>
      <Link
        to="/forgot-password"
        className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out "
      >
        Forgot password?
      </Link>
    </p>
  );
};
