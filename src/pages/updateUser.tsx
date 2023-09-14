import { ReactElement, useEffect, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPageWithLayout } from "play/pages/_app";
import Layout from "play/components/layout";
import { toast } from "react-toastify";
import { api } from "play/helpers/api";
import { useRouter } from "next/router";

interface FormData {
  name: string;
  email: string;
  role: string;
}

const UpdateUser: NextPageWithLayout = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const validationSchema = z.object({
    name: z.string().min(1, { message: "Full name is required" }).max(60),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(1, { message: "Email is required" }),
    role: z.string(),
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
  const navigate = useRouter();
  const { id } = navigate.query;
  useEffect(() => {
    api
      .get(`/user/` + id)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        toast.error(error.response.message);
      });
  }, []);
  console.log(data);
  const formSumbit = (formData: FormData, e: any) => {
    e.preventDefault();
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    api
      .put(`/user/${id}`, userData)
      .then((response) => {
        navigate.push("/user");
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.message);
      });
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex justify-center ">
      <div className=" p-20 w-[600px] drop-shadow-xl">
        <div className=" p-2 text-center  font-bold text-lg tracking-wider  rounded-tl-xl bg-teal-400 text-white cursor-pointer">
          <span className="text-2xl">User Update Form </span>
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
              <select
                className="border p-3 focus:ring focus:outline-none focus:ring-teal-200 focus:opacity-50 rounded w-full cursor-pointer"
                {...register("role")}
                value={data.role}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Select Role
                </option>
                <option value="admin" className="cursor-pointer">
                  Admin
                </option>
                <option value="staff" className="cursor-pointer">
                  Staff
                </option>
              </select>
              {errors.role && <span>{errors.role.message}</span>}
            </div>
            <div className="mb-2">
              <button
                type="submit"
                className="bg-teal-500 w-full hover:bg-teal-700 text-white py-2 px-6 rounded font-semibold tracking-wider"
              >
                {" "}
                UPDATE USER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
UpdateUser.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default UpdateUser;
