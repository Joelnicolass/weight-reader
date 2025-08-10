import useWebSocket from "react-use-websocket";
import "./App.css";

const SOCKET_URL = "ws://127.0.0.1:8765";

const App = () => {
  const { lastJsonMessage } = useWebSocket(SOCKET_URL, {});

  return <div></div>;
};

export default App;
