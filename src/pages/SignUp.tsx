import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import useAuth from "../components/Auth/hooks/use-auth";
import { submitClassName, submitClassNameDisabled } from "../ui/classes";
import { useUsersContext } from "../hooks/use-users";
import { ToastContainer } from "react-toastify";

const SignUp = () => {
  const { loading } = useUsersContext();
  const { formData, handleChange, handleSignup, showPassword, handlePassword } =
    useAuth();
  const { name, email, password } = formData;

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-50 px-6">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        <input
          id="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
          className="mb-4 w-full px-4 py-2 border rounded"
        />
        <input
          id="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="mb-4 w-full px-4 py-2 border rounded"
        />
        <div className="relative mb-4">
          <input
            id="password"
            value={password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
          />
          {showPassword ? (
            <AiFillEyeInvisible
              className="absolute right-3 top-2 cursor-pointer"
              onClick={handlePassword}
            />
          ) : (
            <AiFillEye
              className="absolute right-3 top-2 cursor-pointer"
              onClick={handlePassword}
            />
          )}
        </div>

        <button
          type="submit"
          className={loading ? submitClassNameDisabled : submitClassName}
        >
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default SignUp;
