import useWebSocket from "react-use-websocket";

import "./App.css";
import { useState } from "react";

const WS_URL = "ws://127.0.0.1:8000/wsairplane";

type AiplaneType = {
  id: string;
  type: string;
  status: string;
  refined_id: string;
  created_at: string;
  image: string
};

function App() {
  const [airplaneInfos, setAirplaneInfos] = useState<AiplaneType>();
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onMessage(e) {
      setAirplaneInfos(JSON.parse(e.data));
      console.log(e.data);
    },
  });

  return (
    <div className="bg-white border border-gray-200 flex flex-col rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg bg-cover self-center"
        src={airplaneInfos?.image}
        alt=""
      />

      <div className="p-5 flex flex-col items-center ">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {airplaneInfos?.id}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {airplaneInfos?.type}
        </p>
        <div className="mb-3 flex w-full justify-center gap-2 items-center font-normal text-gray-700 dark:text-gray-400">
          {airplaneInfos?.status}
          <p
            className={`w-3 h-3 rounded-full ${
              airplaneInfos?.status == "PENDING" ? "bg-yellow-400" : "hidden"
            }`}
          ></p>
          <p
            className={`w-3 h-3 rounded-full ${
              airplaneInfos?.status == "BROKEN" ? "bg-red-400" : "hidden"
            }`}
          ></p>
          <p
            className={`w-3 h-3 rounded-full ${
              airplaneInfos?.status == "GOOD" ? "bg-green-400" : "hidden"
            }`}
          ></p>
        </div>
      </div>
    </div>
  );
}

export default App;
