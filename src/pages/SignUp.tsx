import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ForgotPassword } from "../components/Auth/ForgotPassword";
import useAuth from "../hooks/use-auth";
import { SwitchLogin } from "../components/Auth/SwitchLogin";

const SignUp = () => {
  const {
    handleChange,
    handlePassword,
    handleSubmit,
    name,
    email,
    password,
    showPassword,
    inputClassName,
    submitClassName,
    pswIconClassName,
  } = useAuth();

  return (
    <section>
      <h1 className="text-3xl font-bold text-center mt-6">Sign Up</h1>
      <div className="flex justify-center items-center mt-6 flex-wrap px-6 py-12 max-w-6xl mx-auto">
        <div className="  mb-12 md:mb-6  md:w-[67%] lg:w-[50%]">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-12">
          <form onSubmit={handleSubmit}>
            <input
              className={inputClassName}
              type="name"
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <input
              className={inputClassName}
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Email address"
            />
            <div className="relative mb-6">
              <input
                className={inputClassName}
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className={pswIconClassName}
                  onClick={handlePassword}
                />
              ) : (
                <AiFillEye
                  className={pswIconClassName}
                  onClick={handlePassword}
                />
              )}
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <SwitchLogin
                to="/sign-in"
                question="Already have an account?"
                text="Sign in instead"
              />
              <ForgotPassword />
            </div>

            <button className={submitClassName} type="submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
