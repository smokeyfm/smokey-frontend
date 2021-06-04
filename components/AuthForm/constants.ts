import * as Yup from "yup";
import { createAccount, login } from "../../hooks/useAuth";

export enum AuthFormType {
  login = "login",
  signup = "signup",
  forgot_password = "forgot_password",
  update_password = "update_password", // not implemented
  update_email = "update_email" // not implemented
}

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short").required("Required"),
  password_confirmation: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value: string | undefined) {
      return this.parent.password === value;
    }
  )
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short").required("Required")
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required")
});

export const loginForm = {
  title: "LOGIN",
  fields: {
    email: "",
    password: ""
  },
  validate: LoginSchema,
  onSubmit: login
};

export const signupForm = {
  title: "SIGN UP",
  fields: {
    email: "",
    password: "",
    password_confirmation: ""
  },
  validate: SignupSchema,
  onSubmit: createAccount
};

export const forgotPasswordForm = {
  title: "RESET PASSWORD",
  fields: {
    email: ""
  },
  validate: ForgotPasswordSchema,
  onSubmit: async (values: { email: string }) => {}
};

export const updatePasswordForm = {
  title: "RESET PASSWORD",
  fields: {
    email: ""
  },
  validate: ForgotPasswordSchema,
  onSubmit: async () => {}
};

export const updateEmailForm = {
  title: "RESET PASSWORD",
  fields: {
    email: ""
  },
  validate: ForgotPasswordSchema,
  onSubmit: async () => {}
};
