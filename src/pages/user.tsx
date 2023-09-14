import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Layout from "play/components/layout";
import { NextPageWithLayout } from "play/pages/_app";
import { BASEURL } from "play/pages/api/api";
import { toast } from "react-toastify";
import { api } from "play/helpers/api";

interface user {
  id: string;
  name: string;
  email: string;
  contact: string;
  role: string;
}

const User: NextPageWithLayout = () => {
  const [users, setUsers] = useState<user[]>([]);

  const fetchUser = useCallback(() => {
    api
      .get(`/user`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [BASEURL]);

  useEffect(() => {
    fetchUser();
  }, []);
  const router = useRouter();
  const handleEdit = (id: string) => {
    router.push({ pathname: "/updateUser", query: { id: id } });
  };
  const handleDelete = (id: string) => {
    api
      .delete(`/user/${id}`)
      .then((response) => {
        fetchUser();
        toast.success(response.data.message, { position: "bottom-center" });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <div className="bg-dashboard  p-4 rounded-lg">
        <div className="flex justify-between  items-center px-4  ">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-lg">
              Total Users: {users.length}{" "}
            </span>
            <div
              className=" py-2 px-4 rounded-lg space-x-4 mb-2 bg-teal-500 cursor-pointer"
              onClick={() => router.push("/createUser")}
            >
              Add Users
            </div>
          </div>
          <div className="relative user-search">
            <input
              type="search"
              placeholder="Search user ..."
              className="p-2 border rounded-lg px-12 "
            />
            <IconSearch className="absolute -mt-8  ml-3 text-gray-500" />
          </div>
        </div>
        <div className="px-4 flex justify-center mx-auto container mt-10">
          <table className="border-2 table-auto ">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Edit</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            {users.length > 0 && (
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2"> {user.id} </td>
                    <td className="border px-4 py-2"> {user.name}</td>
                    <td className="border px-4 py-2"> {user.email}</td>
                    <td className="border px-4 py-2"> {user.role}</td>
                    <td className="border px-4 py-2">
                      <IconEdit
                        onClick={() => handleEdit(user.id)}
                        className="w-5 h-5 text-green-600 mx-auto cursor-pointer"
                      />
                    </td>
                    <td className="border px-4 py-2 ">
                      <IconTrash
                        onClick={() => handleDelete(user.id)}
                        className="w-5 h-5 text-red-700 mx-auto cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};
User.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default User;
