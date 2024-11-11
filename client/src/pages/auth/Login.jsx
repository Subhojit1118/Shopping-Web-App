import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { toast } = useToast();
  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Success",
          description: data?.payload?.message || "Login Successfully",
        });
      } else {
        toast({
          title: "Error",
          description: data?.payload?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    });
  }
  return (
    <>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Login Your Account
          </h1>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
        <p className="mt-2 text-center">
          Don't have an account?{" "}
          <Link
            className="font-medium text-primary hover:underline"
            to={"/auth/signup"}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
