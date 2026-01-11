import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Components
import Input from "../../components/input/Input";
import AuthLayout from "../../components/layout/AuthLayout";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";

// Utils
import axiosInst from "../../utils/axios";
import { API_ENDPOINT } from "../../utils/api";
import { uploadImage } from "../../utils/image";
import { validateEmail } from "../../utils/helper";

// Context API's
import { UserContext } from "../../context/userContext";

const SignUpPage = ({ setProgress }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { updateUser, loading, setLoading } = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    let profileImageUrl = "";

    if (!name) {
      setProgress(100);
      setLoading(false);
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setProgress(100);
      setLoading(false);
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setProgress(100);
      setLoading(false);
      setError("Please enter the password");
      return;
    }

    if (!confirmPassword || confirmPassword != password) {
      setProgress(100);
      setLoading(false);
      setError("Please verify the password");
      return;
    }

    setError("");
    setProgress(30);

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInst.post(API_ENDPOINT.AUTH.SIGNUP, {
        name,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
      });

      setProgress(50);
      const { token, role } = response.data;
      setProgress(80);

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
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
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
              label="Name"
              placeholder="John"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />
            <Input
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              label="Confirm Password"
              placeholder="Password"
              type="password"
            />

            <div className="col-span-2">
              <Input
                value={adminInviteToken}
                onChange={({ target }) => setAdminInviteToken(target.value)}
                label="Admin Token"
                placeholder="Token"
                type="text"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button disabled={loading} type="submit" className="btn-primary">
            SignUp
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signin">
              SignIn
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
