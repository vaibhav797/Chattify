import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { app } from "../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/authSlice";
import { Oval } from "react-loader-spinner";

const auth = getAuth(app);

const Login = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState(false);

  if (user) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      setErr(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setErr(true);
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center bg-indigo-200 w-full h-screen">
      <div className="flex flex-col bg-white max-[640px]:h-full px-6 min-[900px]:px-8 min-[1060px]:px-12 py-4 w-full sm:w-2/3 md:w-3/6 lg:w-4/12 rounded-md gap-6 shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px]">
        <span className=" text-4xl text-indigo-900 text-center font-bold">
          Chattify
        </span>
        <span className="text-xl text-center font-normal">
          Login to Your Account
        </span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            className="rounded-sm p-3 border-b-2 border-gray-300 outline-1 outline-indigo-600"
            name="email"
            id="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-sm p-3 border-b-2 border-gray-300 outline-1 outline-indigo-600"
            name="pass"
            id="pass"
          />
          {error && (
            <p className="text-md text-center text-red-500">
              Wrong Credentials!
            </p>
          )}
          <button className="rounded-md bg-indigo-600 text-white flex justify-center items-center font-semibold py-3 px-1">
            {loading ? (
              <Oval
                height={24}
                width={24}
                color="white"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="white"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : (
              "Log In"
            )}
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            <span className="underline decoration-solid decoration-indigo-600 text-indigo-600 ">
              Signup
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
