import useWebSocket from "react-use-websocket";

export const useSockets = <T>(
  url: string,
  options: {
    onOpen?: (event: WebSocketEventMap["open"]) => void;
    onClose?: (event: WebSocketEventMap["close"]) => void;
    onError?: (event: WebSocketEventMap["error"]) => void;
    onMessage?: (event: WebSocketEventMap["message"]) => void;
  } = {
    onOpen: () => {},
    onClose: () => {},
    onError: () => {},
    onMessage: () => {},
  }
) => {
  const { onOpen, onClose, onError, onMessage } = options;

  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket<T>(
    url,
    {
      onOpen,
      onClose,
      onError,
      onMessage,
      shouldReconnect: () => true,
    }
  );

  return { lastJsonMessage, sendJsonMessage, readyState };
};
