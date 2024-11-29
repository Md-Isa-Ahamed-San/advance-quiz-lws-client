import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";

import avater from "../../../assets/avater.webp";
import useQuizResult from "../../../hooks/useQuizResult.js";
import Header from "../../Common/Header/Header.jsx";
const Leaderboard = ({ leaderboard, title, quizSetId }) => {
  const { auth } = useAuth();

  return (
    <>
     
      <div>
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="mb-6">{title}</p>
        <ul className="space-y-4">
          {/* eslint-disable-next-line react/prop-types */}
          {leaderboard?.map((user, index) => {
            const isCurrentUser = user.id === auth?.user?.id;
            const rank = index + 1;
            const rankText =
              rank === 1
                ? "1st"
                : rank === 2
                ? "2nd"
                : rank === 3
                ? "3rd"
                : `${rank}th`;

            return (
              <li
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-md ${
                  isCurrentUser
                    ? "bg-yellow-100 border-2 border-yellow-500"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center">
                  <img
                    src={avater}
                    alt={user.username}
                    className="object-cover w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h3
                      className={`font-semibold ${
                        isCurrentUser ? "text-yellow-800" : ""
                      }`}
                    >
                      {user.username}
                    </h3>
                    <p className="text-sm text-gray-500">{rankText}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-lg text-gray-800">
                    {user.marks}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Leaderboard;
