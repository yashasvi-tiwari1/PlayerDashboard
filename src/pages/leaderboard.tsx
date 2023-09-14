import { ReactElement, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "play/components/layout";
import { NextPageWithLayout } from "play/pages/_app";
import { BASEURL } from "play/pages/api/api";
import { toast } from "react-toastify";
import { api } from "play/helpers/api";

interface Statistics {
  id: string;
  experience_point: number;
  games_played: number;
  games_won: number;
}

interface player {
  id: string;
  name: string;
  email: string;
  statistics: Statistics;
  rank: number;
}

const Leaderboard: NextPageWithLayout = () => {
  const [leaderboards, setLeaderboards] = useState<player[]>([]);
  const fetchLeaderboard = useCallback(() => {
    api
      .get(`/player/leaderboard`)
      .then((response) => {
        setLeaderboards(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [BASEURL]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const router = useRouter();

  return (
    <>
      <div className="bg-dashboard  py-8 px-16 rounded-lg">
        <div className="text-2xl font-semibold px-32 py-4 text-center">
          Leaderboard
        </div>
        <div className="px-4 flex justify-center mx-auto container mt-10">
          <table className="border-2 table-auto ">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border px-4 py-2">Player Name</th>
                <th className="border px-4 py-2">Games Played</th>
                <th className="border px-4 py-2">XP</th>
                <th className="border px-4 py-2">Rank</th>
                <th className="border px-4 py-2">Games Won</th>
              </tr>
            </thead>
            <tbody>
              {leaderboards.map((player) => (
                <tr key={player.id}>
                  <td className="border px-4 py-2 text-center">
                    {" "}
                    {player.name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {player.statistics.games_played}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {player.statistics.experience_point}{" "}
                  </td>
                  <td className="border px-4 py-2  text-center">
                    {" "}
                    {player.rank}{" "}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {" "}
                    {player.statistics.games_won}{" "}
                  </td>
                </tr>
              ))}
            </tbody>
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
