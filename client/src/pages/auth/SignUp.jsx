import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { signUpUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  function onSubmit(event) {
    event.preventDefault();
    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. Please re-enter them.");
      return;
    }
    // Proceed with dispatch if passwords match
    dispatch(signUpUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Success",
          description: data?.payload?.message || "User Created Successfully",
        });
        navigate("/auth/login");
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
            Create new Account
          </h1>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
        <p className="mt-2 text-center">
          Already have an account?{" "}
          <Link
            className="font-medium text-primary hover:underline"
            to={"/auth/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignUp;
