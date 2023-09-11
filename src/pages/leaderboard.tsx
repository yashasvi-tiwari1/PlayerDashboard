import { ReactElement, useEffect, useState } from "react";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Layout from "play/components/layout";
import { NextPageWithLayout } from "play/pages/_app";
import { BASEURL } from "play/pages/api/api";
import axios from "axios";

interface Statistics {
  id: string;
  xp: number;
  games_played: number;
  games_won: number;
}

interface player {
  id: string;
  name: string;
  email: string;
  statistics: Statistics;
  rank: string;
}

const Leaderboard: NextPageWithLayout = () => {
  const [leaderboards, setLeaderboards] = useState<player[]>([]);
  useEffect(() => {
    axios
      .get(`${BASEURL}/leaderboard`)
      .then((response) => {
        setLeaderboards(response.data);
      })
      .catch((error) => {
        alert(error.response.message);
      });
  }, [BASEURL]);

  const router = useRouter();
  const handleEdit = (userId: string) => {
    router.push("/signup");
  };
  const handleDelete = (userId: string) => {
    console.log(`delete user ${userId}`);
  };

  return (
    <>
      <div className="bg-dashboard  p-4 rounded-lg">
        <div className="flex justify-between  items-center px-4  ">
          <div className="flex items-center gap-6">
            <span>Total Players: 500 </span>
            <div className="flex items-center space-x-4 mb-2 sm:mb-0"></div>
          </div>
          <div className="relative user-search">
            <input
              type="search"
              placeholder="Search services ..."
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
                <th className="border px-4 py-2">Player Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Games Played</th>
                <th className="border px-4 py-2">XP</th>
                <th className="border px-4 py-2">Rank</th>
                <th className="border px-4 py-2">Games Own</th>
                <th className="border px-4 py-2">Edit</th>
                <th className="border px-4 py-2">Delete</th>
              </tr>
            </thead>
            {leaderboards.length > 0 && (
              <tbody>
                {leaderboards.map((player) => (
                  <tr key={player.id}>
                    <td className="border px-4 py-2"> {player.id} </td>
                    <td className="border px-4 py-2"> {player.name}</td>
                    <td className="border px-4 py-2"> {player.email}</td>
                    <td className="border px-4 py-2"> {player.rank}</td>

                    <td className="border px-4 py-2">
                      {player.statistics.games_played}{" "}
                    </td>
                    <td className="border px-4 py-2">
                      {" "}
                      {player.statistics.xp}{" "}
                    </td>
                    <td className="border px-4 py-2">
                      {" "}
                      {player.statistics.games_won}{" "}
                    </td>
                    <td className="border px-4 py-2">
                      <IconEdit
                        onClick={() => handleEdit(player.id)}
                        className="w-5 h-5 text-green-600 mx-auto cursor-pointer"
                      />
                    </td>
                    <td className="border px-4 py-2 ">
                      <IconTrash
                        onClick={() => handleDelete(player.id)}
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
Leaderboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Leaderboard;
