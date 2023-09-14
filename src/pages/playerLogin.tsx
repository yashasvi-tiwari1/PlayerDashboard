"use client";
import Image from "next/image";
import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { api, saveTokens } from "play/helpers/api";

interface FormData {
  email: string;
  password: string;
}

const validationSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "password must be at least 6 characters " })
    .max(20),
});

const PlayerLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });
  const navigate = useRouter();
  const setLoginData = (data: {
    accessToken: string;
    refreshToken: string;
    name: string;
    id: string;
  }) => {
    localStorage.setItem("playerInfo", JSON.stringify(data));
    navigate.push({
      pathname: "/playerPage",
      query: {
        id: data.id,
      },
    });
    toast.success(`Welcome ${data.name}`);
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const formSubmit = async (formData: FormData, e: any) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await api.post(`/player`, userData, {});
      setLoginData(response.data);
      const { accessToken, refreshToken } = response.data;
      saveTokens(accessToken, refreshToken);
      navigate.push("/playerPage");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="bg-gray-300 flex justify-center h-screen">
      <div className="py-10 px-20 w-[600px] justify-center drop-shadow-xl ">
        <div className="bg-teal-500 p-3 text-white text-center font-bold text-xl rounded-t-lg">
          <span>PLAYER LOGIN</span>
        </div>
        <div className="bg-white px-6 py-10 rounded-b-lg">
          <div className="flex justify-center mb-8">
            <Image
              src="/assets/signin.png"
              alt="user png file "
              height={200}
              width={200}
              className="w-20 h-16 bg-teal-100 rounded-full py-2 "
            />
          </div>
          <p className="text-teal-800 font-semibold mb-5 text-lg">
            Sign in to Yarsa Play
          </p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-5">
              <input
                type="text"
                id="email"
                placeholder="Email Address"
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full"
                {...register("email")}
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  className="border p-3 focus:ring focus:ring-teal-200 focus:outline-none focus:opacity-50 rounded w-full"
                  {...register("password")}
                  value={data.password}
                  onChange={handleChange}
                />
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
            <div className="flex justify-between mb-7 gap-10">
              <div>
                <input type="checkbox" />
                <span className="ml-2">Remember Me</span>
              </div>
              <div>
                <span className="text-teal-500">
                  <u>Forgot Password ?</u>
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-6 rounded"
              >
                {" "}
                Sign In
              </button>
            </div>
          </form>
          <div className="inline-flex items-center justify-center w-full gap-3 ">
            <hr className=" w-1/2 h-0.5 my-8 bg-gray-500 border-0 rounded " />
            <span className="font-semibold "> or </span>
            <hr className=" w-1/2 h-0.5 my-8 bg-gray-500 border-0 rounded " />
          </div>
          <div className="-mt-5  py-1 px-2 flex gap-2  text-right  float-right text-gray-700 ">
            <span> Not a member?</span>
            <Link href="/signup" className="font-semibold ">
              <u>Sign Up Now</u>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerLogin;
