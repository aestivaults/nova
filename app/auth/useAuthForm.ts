"use client";
import { useAuth } from "@/app/context/AuthContext";
import { isValidEmail } from "@/app/utils/validations";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSetParams } from "../hooks/useSetParams";
import { useNotifications } from "../context/NotificationProvider";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  name: string;
};

type FormErrors = Partial<{
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: string;
  general: string;
  name: string;
}>;

export function UseAuthForm() {
  const { login, register } = useAuth();
  const { toast } = useNotifications();
  const { navigate, searchParams } = useSetParams();
  const from = searchParams.get("from") || "/dashboard";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const validateForm = (type: "login" | "register" = "login"): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (type === "register") {
      if (!formData.username) {
        newErrors.username = "Username is required";
      } else if (formData.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "You must agree to the terms";
      }
    }

    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const data = await login(formData);
      if (data.error) setErrors({ general: data.error });

      if (data.data) {
        toast(
          "success",
          "system",
          "Login Successful!",
          `Welcome back ${data.data.name}`,
          4000
        );
        navigate(from);
      }
    } catch (error) {
      const ErrMessage =
        error instanceof Error ? error.message : "unknown error";
      setErrors({
        general: ErrMessage || "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm("register");
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const data = await register(formData);
      if (data.error) setErrors({ general: data.error });
      if (data.data) navigate("/onboarding", { state: { from } });
    } catch (error) {
      const ErrMessage =
        error instanceof Error ? error.message : "unknown error";
      setErrors({
        general: ErrMessage || "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    errors,
    isLoading,
    handleLogin,
    handleRegister,
  };
}
