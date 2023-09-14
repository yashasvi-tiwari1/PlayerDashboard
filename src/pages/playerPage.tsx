import React, { useCallback, useEffect, useState } from "react";
import { api } from "play/helpers/api";
import { toast } from "react-toastify";
import { player } from "play/pages/player";
import Image from "next/image";
import Leaderboard from "play/pages/leaderboard";

const PlayerPage = () => {
  const [showData, setShowData] = useState<player | null>({
    id: "",
    name: "",
    statistics: {
      experience_point: 0,
      games_played: 0,
      games_won: 0,
      coins: 0,
    },
  });

  const playGame = useCallback(() => {
    const player = localStorage.getItem("playerInfo");
    if (player) {
      const playerData = JSON.parse(player);
      api
        .get(`/player/${playerData.id}`)
        .then((response) => {
          console.log(response.data);
          setShowData(response.data);
        })
        .catch((error) => {
          toast.error(error.response.message);
        });
    }
  }, []);

  useEffect(() => {
    playGame();
  }, [playGame]);

  if (!showData) {
    return <div>Loading...</div>;
  }

  const handlePlay = () => {
    api
      .get(`/player/play/${showData.id}`)
      .then((response) => {
        playGame();
        toast.success(response.data);
      })
      .catch((error) => {
        toast.error(error.response.message);
      });
  };

  return (
    <>
      <div className="">
        <div className="bg-teal-600 text-white px-32  py-6  flex justify-between">
          <p className="text-2xl font-semibold"> {showData.name} </p>
          <button
            className="text-xl bg-orange-600 px-4 py-2 rounded-xl hover:bg-orange-200 hover:text-black font-semibold"
            onClick={handlePlay}
          >
            Play Game
          </button>
        </div>
        <div className="flex px-32 py-8 gap-10">
          <div className="bg-gray-300 rounded-b-xl">
            <Image
              src="/assets/player.jpg"
              alt="this is profile"
              height={300}
              width={300}
              className="pt-6"
            />
          </div>
          <div className="bg-gray-300  px-16 space-y-5 pt-10">
            <div className="flex gap-10 w-full justify-between">
              <div>ID</div>
              <div>{showData.id}</div>
            </div>
            <div className="flex gap-10 w-full justify-between">
              <div>Name</div>
              <div>{showData.name}</div>
            </div>
            <div className="flex gap-10 w-full justify-between">
              <div>Experience Point</div>
              <div>{showData?.statistics?.experience_point}</div>
            </div>
            <div className="flex gap-10 w-full justify-between">
              <div>Games Played</div>
              <div>{showData?.statistics?.games_played}</div>
            </div>
            <div className="flex gap-10 w-full justify-between">
              <div>Games Won</div>
              <div>{showData?.statistics?.games_won}</div>
            </div>
            <div className="flex w-full justify-between">
              <div>Coins</div>
              <div>{showData?.statistics?.coins}</div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <Leaderboard />
    </>
  );
};
export default PlayerPage;
