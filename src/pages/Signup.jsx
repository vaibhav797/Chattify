import React, { useState } from "react";
import add from "../images/add.jpg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { selectUser } from "../redux/Auth/authSlice";
import { useSelector } from "react-redux";

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const Signup = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState(false);

  if (user) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }



  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file).then(()=>{
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName: name,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName: name,
            photoURL: downloadURL,
            email,
          });

          await setDoc(doc(db,"userChats", res.user.uid),{});
          setLoading(false);
          setErr(false);
          navigate('/');
        });
      })
      
      
    } catch (err) {
      setLoading(false);
      setErr(true);
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center bg-indigo-200 w-full h-screen">
      <div className="flex flex-col bg-white px-6 min-[920px]:px-10 min-[1060px]:px-16 py-4 w-1/3 rounded-md gap-6">
        <span className=" text-4xl text-indigo-900 text-center font-bold">
          Chattify
        </span>
        <span className="text-xl text-center font-normal">
          Register Your Account
        </span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            required
            placeholder="Full Name"
            className="rounded-sm p-3 border-b-2 border-gray-300 outline-1 outline-indigo-600"
            name="fullname"
          />
          <input
            type="email"
            required
            placeholder="Email"
            className="rounded-sm p-3 border-b-2 border-gray-300 outline-1 outline-indigo-600"
            name="email"
            id="email"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="rounded-sm p-3 border-b-2 border-gray-300 outline-1 outline-indigo-600"
            name="pass"
            id="pass"
          />
          <input
            type="file"
            name="photo"
            id="photo"
            className="hidden"
            required
          />
          <label htmlFor="photo" className="flex gap-3 text-md items-center">
            <img src={add} className="object-cover h-8 w-8 rounded-md" alt="" />
            <span>Add an avatar</span>
          </label>
          {error && (
            <p className="text-md text-center text-red-500">
              Something Wrong!
            </p>
          )}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 text-white flex justify-center items-center font-semibold py-3 px-1"
          >
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
              "Sign Up"
            )}
          </button>
        </form>
        <p className="text-center">Already have an account? <Link to={'/login'}><span className='underline decoration-solid decoration-indigo-600 text-indigo-600 '>Login</span></Link></p>
      </div>
    </div>
  );
};

export default Signup;
