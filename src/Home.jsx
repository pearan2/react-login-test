import React, { useEffect, useState, useRef } from "react";
import WithAuth from "./Auth";
import io from "socket.io-client"; // socket.io-client 2.3.1 version 을 사용하기 위해서 킹쩔수없이 jsx 로 만든다.

// socket
let socket;

const Home = () => {
  //let socket: MutableRefObject<Socket | undefined> = useRef<Socket>();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    try {
      if (socket === undefined) {
        console.log("refreshed!");
        socket = io("http://10.13.8.3:4000/", { withCredentials: true });

        socket.on("connect", () => {
          console.log("connected!!");
        });
        socket.on("message", data => {
          setMessages(messages => {
            return messages.concat(data);
          });
        });
        socket.on("disconnect", () => {
          console.log("disconnected!");
        });
      }

      return () => {
        socket.close();
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onInputChange = e => {
    setMessage(e.target.value);
  };

  const onButtonClick = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      {messages.map((message, idx) => {
        return <div key={idx}>{message}</div>;
      })}
      <input value={message} onChange={onInputChange}></input>
      <button onClick={onButtonClick}>send</button>
    </div>
  );
};

export default WithAuth(Home);
