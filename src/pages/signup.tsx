import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { BASEURL } from "play/pages/api/api";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const validationSchema = z
    .object({
      name: z.string().min(1, { message: "Full name is required" }).max(60),
      email: z
        .string()
        .email({ message: "Invalid email format" })
        .min(1, { message: "Email is required" }),
      password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(6, { message: "password must be at least 6 characters " })
        .max(20),
      confirmPassword: z
        .string()
        .min(1, "Confirm password is required")
        .min(6, { message: "Password must be at least 6 characters " })
        .max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword", "password"],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });
  const handleChange = (e: any) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  const formSumbit = (formData: FormData, e: any) => {
    e.preventDefault();
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    axios
      .post(`${BASEURL}/player`, userData)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error.response.message);
      });
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex justify-center bg-gray-300 ">
      <div className=" p-20 w-[600px] drop-shadow-xl">
        <div className=" p-2 text-center  font-bold text-lg tracking-wider cursor-pointer rounded-tl-xl bg-teal-400 text-white">
          <span className="text-2xl">Player Form </span>
        </div>
        <div className="bg-white p-10 rounded-b-xl">
          <p className="font-bold text-2xl text-center text-gray-900 mb-10">
            Welcome to Yarsa Play!
          </p>
          <form onSubmit={handleSubmit(formSumbit)} className="user">
            <div className="mb-5 w-full">
              <input
                type="text"
                placeholder="Full Name"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full "
                {...register("name")}
                value={data.name}
                onChange={handleChange}
              />

              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="mb-5 w-full">
              <input
                type="text"
                placeholder="Email Address"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                {...register("email")}
                value={data.email}
                onChange={handleChange}
              />

              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="mb-5 w-full">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                  {...register("password")}
                  value={data.password}
                  onChange={handleChange}
                />
                {errors.password && <span>{errors.password.message}</span>}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                >
                  {showPassword ? (
                    <IconEye className="h-5 w-5 text-gray-500" />
                  ) : (
                    <IconEyeOff className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-5 w-full">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                >
                  {showPassword ? (
                    <IconEye className="h-5 w-5 text-gray-500" />
                  ) : (
                    <IconEyeOff className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-2">
              <button
                type="submit"
                className="bg-teal-500 w-full hover:bg-teal-700 text-white py-2 px-6 rounded font-semibold tracking-wider"
              >
                {" "}
                Create An Account
              </button>
            </div>
            <div className="text-center text-sm already">
              <span className="text-black">Already have an account? </span>
              <Link href={"/login"} className="font-bold text-blue-600">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
