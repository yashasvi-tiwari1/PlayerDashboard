import { ReactElement, useCallback, useEffect, useState } from "react";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import Layout from "play/components/layout";
import { NextPageWithLayout } from "play/pages/_app";
import { BASEURL } from "play/pages/api/api";
import axios from "axios";
import Pagination from "play/components/pagination";
import { toast } from "react-toastify";
import { api } from "play/helpers/api";

export interface Statistics {
  experience_point: number;
  games_played: number;
  games_won: number;
  coins: number;
}

export interface player {
  id: string;
  name: string;
  statistics: Statistics;
}

const Player: NextPageWithLayout = () => {
  const [players, setPlayers] = useState<player[]>([]);
  const [search, setSearch] = useState<player[]>(players);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const fetchPlayer = useCallback(() => {
    api
      .get(`/player`)
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [BASEURL]);

  useEffect(() => {
    fetchPlayer();
  }, []);

  useEffect(() => {
    setSearch(players);
  }, [players]);

  const router = useRouter();
  const handleDelete = (id: string) => {
    api
      .delete(`/player/${id}`)
      .then((response) => {
        fetchPlayer();
        toast.success(response.data.message, { position: "bottom-center" });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleSearch = (e: any) => {
    setSearch(
      players.filter((list) =>
        e.target.value !== ""
          ? list.name.toLowerCase().startsWith(e.target.value)
          : list
      )
    );
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = search.slice(firstPostIndex, lastPostIndex);
  const [userDetails, setUserDetails] = useState<string | null>("");
  useEffect(() => {
    setUserDetails(localStorage.getItem("userInfo"));
  }, []);
  if (userDetails) {
    try {
      const showDetails = JSON.parse(userDetails);
      return (
        <>
          <div className="bg-dashboard  p-4 rounded-lg">
            <div className="flex justify-between  items-center px-4  ">
              <div className="flex items-center gap-6">
                <span className="font-semibold text-lg">
                  Total Players: {players.length}
                </span>
                <div className="flex items-center space-x-4 mb-2 sm:mb-0"></div>
              </div>
              <div className="relative user-search">
                <input
                  type="search"
                  placeholder="Search Player ..."
                  className="p-2 border rounded-lg px-12 "
                  onChange={handleSearch}
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
                    <th className="border px-4 py-2">Games Played</th>
                    <th className="border px-4 py-2">Experience Point</th>
                    <th className="border px-4 py-2">Games Own</th>
                    {showDetails.role === "admin" && (
                      <th className="border px-4 py-2">Delete</th>
                    )}
                  </tr>
                </thead>
                {search.length > 0 && (
                  <tbody>
                    {currentPosts.map((player) => (
                      <tr key={player.id}>
                        <td className="border px-4 py-2 text-center">
                          {" "}
                          {player.id}{" "}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {" "}
                          {player.name}
                        </td>

                        <td className="border px-4 py-2 text-center">
                          {player.statistics.games_played}{" "}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {" "}
                          {player.statistics.experience_point}{" "}
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {" "}
                          {player.statistics.games_won}{" "}
                        </td>
                        {showDetails.role === "admin" && (
                          <td className="border px-4 py-2 text-center ">
                            <IconTrash
                              onClick={() => handleDelete(player.id)}
                              className="w-5 h-5 text-red-700 mx-auto cursor-pointer"
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
            <div className="p-6 ">
              <Pagination
                totalPosts={search.length}
                postPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </>
      );
    } catch (e) {
      return <div className="text-2xl"> Loading... </div>;
    }
  }
};
Player.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Player;
