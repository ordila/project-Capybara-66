import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { AuthForm } from "../../components/index";

import { registerThunk } from "@/redux/auth/operations";
import { selectError, selectIsLoading } from "@/redux/auth/slice";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const [isRequested, setIsRequested] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();

  const formData = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSumbit = handleSubmit((data) => {
    dispatch(registerThunk(data));
    setIsRequested(true);
  });

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (isRequested && !isLoading) {
      setIsRequested(false);
      navigate("/login");
    }
  }, [isLoading, isRequested, navigate]);

  const navigation = {
    text: "Already have account?",
    textLink: "Sign In",
    route: "/login",
  };

  return (
    <div className={styles.wrapperMain}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Sign Up</h1>
        <p className={styles.description}>
          Step into a world of hassle-free expense{" "}
          <span className={styles.descriptionBreak}>
            management! Your journey towards financial mastery begins here.
          </span>
        </p>
        <AuthForm
          formData={formData}
          buttonText="Sign Up"
          onSumbit={onSumbit}
          register={register}
          errors={errors}
          navigation={navigation}
        />
      </div>
    </div>
  );
};
