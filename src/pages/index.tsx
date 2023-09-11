import Layout from "../components/layout";
import { ReactElement } from "react";
import {
  IconSquareLetterF,
  IconSquareLetterM,
  IconUserSquare,
} from "@tabler/icons-react";
import { NextPageWithLayout } from "play/pages/_app";

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      <div className="">
        <div className="w-[980px] bg-dashboard p-6 rounded-xl">
          <span className="text-xl font-semibold "> Summary </span>
          <div className="flex justify-between mt-10 ">
            <div className="bg-orange-200 p-6 w-52 text-center rounded-lg">
              <div className="flex justify-center">
                <IconUserSquare className="w-9 h-9 text-orange-600 " />
              </div>
              <div className="font-semibold text-lg">3</div>
              <div className="font-semibold text-lg text-gray-600">
                Total Players
              </div>
            </div>
            <div className="bg-green-200 flex flex-col justify-center w-52 text-center p-6 rounded-lg">
              <div className="flex justify-center">
                <IconSquareLetterF className="w-9 h-9 text-green-600" />
              </div>
              <div className="font-semibold text-lg">350</div>
              <div className="font-semibold text-lg text-gray-600">
                Total Feedback
              </div>
            </div>
            <div className="bg-purple-200 p-6 rounded-lg text-center w-52 ">
              <div className="flex justify-center">
                <IconSquareLetterM className="w-9 h-9 text-purple-600" />
              </div>
              <div className="font-semibold text-lg">100</div>
              <div className="font-semibold text-lg text-gray-600">
                Total Messages
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Dashboard;
