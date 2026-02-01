import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Utils
import axiosInst from "../../utils/axios";
import { API_ENDPOINT } from "../../utils/api";
import { validateEmail } from "../../utils/helper";

// Components
import Input from "../../components/input/Input";
import AuthLayout from "../../components/layout/AuthLayout";

// Context API's
import { UserContext } from "../../context/userContext";

const SignInPage = ({ setProgress }) => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // User Context
  const { loading, setLoading, updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    if (!validateEmail(email)) {
      setProgress(100);
      setLoading(false);
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setProgress(100);
      setLoading(false);
      setError("Please enter the password.");
      return;
    }

    setError("");
    setProgress(30);

    try {
      const response = await axiosInst.post(API_ENDPOINT.AUTH.SIGNIN, {
        email,
        password,
      });

      setProgress(50);
      const { token, role } = response.data;
      setProgress(80);

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong, try again");
      }
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to sign in
        </p>

        <form onSubmit={handleSignIn}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button disabled={loading} type="submit" className="btn-primary">
            Sign In
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?,{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
