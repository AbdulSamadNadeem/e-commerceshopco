"use client"
import React, { useEffect } from "react";
import Forms from "../../Modules/Form/Forms";
import { auth, onAuthStateChanged } from "../../../Auth/Firebase";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/home");
      }
    });
  });
  return (
    <>
      <Forms data={{ login: "Login" }} />
    </>
  );
};

export default page;
