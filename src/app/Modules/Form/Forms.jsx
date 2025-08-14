"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { BiShow } from "react-icons/bi";
import {
  auth,
  onAuthStateChanged,
  provider,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "../../../Auth/Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Forms = ({ data }) => {
  const router = useRouter();
  let num = 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      if (userCredentials) {
        toast.success("Login Successfully");
        router.push("/home");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };


  const GoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Login Successfully");
        router.push("/home"); 
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

 
  const showPass = () => {
    const passField = document.getElementById("pass");
    if (passField.type === "password") {
      passField.type = "text";
    } else {
      passField.type = "password";
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User already logged in:", user.email);
     
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="bg-[#6358DC] flex">
        <div className="w-1/2 flex justify-center items-center h-screen">
          <img
            src="./Illustration.png"
            className="w-[500px] object-contain"
            alt=""
          />
        </div>
        <div className="w-1/2 border border-x-white flex flex-col items-center justify-center gap-4">
          <div>
            <h1 className="text-5xl font-extrabold">
              Welcome To <br />
              <span className="text-5xl text-white">SHOP.CO</span>
            </h1>
          </div>

        
          <div className="flex flex-col gap-6">
            <button
              className="flex justify-center items-center w-96 text-2xl font-light border gap-2 border-black rounded-lg transition-transform hover:scale-105 duration-200"
              onClick={GoogleAuth}
            >
              {data?.login || data?.signup} With Google
              <FcGoogle />
            </button>
          </div>

          <p className="text-2xl font-light text-center">or</p>


          <div>
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="w-96 h-12 text-xl font-light pl-4"
                type="email"
                placeholder="Enter Email"
                {...register("email", { required: true })}
              />

              <div className="flex">
                <input
                  id="pass"
                  className="w-96 h-12 text-xl font-light pl-4"
                  type="password"
                  placeholder="Enter Password"
                  {...register("password", { required: true })}
                />
                <BiShow
                  className="relative right-10 top-3 text-2xl cursor-pointer"
                  onClick={showPass}
                />
              </div>

              <input
                className="w-96 h-12 text-2xl font-light text-center text-white bg-black transition-transform hover:scale-105 duration-200 cursor-pointer"
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Forms;
