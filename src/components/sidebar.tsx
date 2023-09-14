import Image from "next/image";
import {
  IconChartBar,
  IconChartInfographic,
  IconLayoutDashboard,
  IconLogout,
  IconSettings,
  IconUserSquare,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { removeLoginInfo } from "play/helpers/api";

export default function Sidebar() {
  const [userDetails, setUserDetails] = useState<string | null>("");
  const navigate = useRouter();

  const handleLogOut = () => {
    removeLoginInfo();
    navigate.push("/login");
  };

  useEffect(() => {
    setUserDetails(localStorage.getItem("userInfo"));
  }, [userDetails]);
  if (userDetails) {
    try {
      const showUser = JSON.parse(userDetails);
      return (
        <div className="w-52 z-10 fixed inset-y-0 bg-dashboard">
          <div className="p-6">
            <div className=" gap-2 mb-12 -mt-5 items-center">
              <Image
                src="/assets/logo.png"
                alt="logo"
                height={220}
                width={220}
                className="h-28 w-28 cursor-pointer"
                onClick={() => navigate.push("/")}
              />
              <div className="-mt-4">
                <span className="font-semibold text-lg ml-4 ">Yarsa Play</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-6 mb-8 cursor-pointer">
                <Link href="/" className="dashboard_text gap-6 flex">
                  <IconLayoutDashboard className=" w-6 h-6" />
                  Dashboard
                </Link>
              </div>
              <div className="dashboard_item">
                <Link href="/leaderboard" className="dashboard_text flex gap-6">
                  <IconChartInfographic className=" w-6 h-6" />
                  Leaderboard
                </Link>
              </div>
              <div className="dashboard_item">
                <Link href="/player" className="dashboard_text flex gap-6">
                  <IconUserSquare className=" w-6 h-6" />
                  Players
                </Link>
              </div>
              {showUser.role === "admin" && (
                <div className="dashboard_item">
                  <Link href="/user" className="dashboard_text flex gap-6">
                    <IconChartBar className=" w-6 h-6" />
                    User
                  </Link>
                </div>
              )}
              <div className="dashboarcd_item">
                <button
                  className="dashboard_text flex gap-6"
                  onClick={handleLogOut}
                >
                  <IconLogout className=" w-6 h-6" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } catch (e) {
      return <div className="text-2xl"> Loading.... </div>;
    }
  }
}
