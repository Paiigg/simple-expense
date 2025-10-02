import { RegisterForm } from "@/components/register-from";
import { ThemeToggle } from "@/components/toggle-theme";
import React from "react";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-background md:p-10">
      <div className="flex flex-col w-full max-w-sm gap-6">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
