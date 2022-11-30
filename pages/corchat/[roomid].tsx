import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { getSomeChat } from "../../scripts/corchat/chatread";
import { sendMessage } from "../../scripts/corchat/chatsend";
import { getRoomData } from "../../scripts/corchat/fetchroom";

export default function ChatRoom() {
  // 変数設定だぜ
  const router = useRouter();
  const roomid = router.query.roomid as string;
  const [loading, setLoading] = useState(true);
  interface RoomInterface {
    id: string;
    roomname: string;
    permit: boolean;
    type: string;
    lastchat: string;
  }
  const [roomdata, setRoomdata] = useState<RoomInterface>();

  // ルーム設定を取得する
  async function setData() {
    const getdata = await getRoomData(roomid);
    setRoomdata(getdata);
    console.dir(getdata);
  }
  useEffect(() => {
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomid]);

  // チャットをfetch
  const [chats, setChats] = useState<any[]>([]);
  async function fetchMessage() {
    const chatdata = await getSomeChat(roomid);
    console.dir(chatdata);
    if (chatdata) setChats(chatdata);
    setLoading(false);
  }
  useEffect(() => {
    if (roomid) fetchMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // レンダーコンポーネントをreturn
  return (
    <>
      <style jsx>{`
        .topbar {
          z-index: 9000;
          position: fixed;
          top: 0;
          display: flex;
          height: 40px;
          width: 100%;
          background-color: #f5f3f2;
          gap: 10px;
          align-items: center;
        }
      `}</style>
      <BarLoader
        color="#36d7b7"
        height={4}
        speedMultiplier={1}
        width={"100%"}
        loading={loading}
        cssOverride={{ zIndex: 9999 }}
      />
      <div className="topbar">
        <button onClick={() => router.back()}>戻る</button>
        <p>●</p>
        <p>{roomdata?.roomname || "Loading"}</p>
      </div>
      <div style={{ paddingTop: "20px" }} />
      <ChatComponent chat={chats} />
      <InputComponent roomid={roomid} />
    </>
  );
}

function ChatComponent({ chat }: { chat: any }) {
  return (
    <>
      <style jsx>{`
        .chatframe {
          background: linear-gradient(-135deg, #e4a972, #9941d8);
          width: 100%;
          min-height: 100%;
        }
      `}</style>
      <div className="chatframe">
        {chat.map((x: any) => (
          <p key={x.id}>{x.text}</p>
        ))}
      </div>
    </>
  );
}

function InputComponent({ roomid }: { roomid: string }) {
  function getvalue() {
    return (document.getElementById("chatinput") as HTMLInputElement).value;
  }
  async function sendChat() {
    sendMessage(roomid, getvalue());
    (document.getElementById("chatinput") as HTMLInputElement).value = "";
    document.getElementById("chatinput")!.focus;
    setTimeout(() => {
      (document.getElementById("chatinput") as HTMLInputElement).value = "";
    }, 20);
  }
  const keyDown = (event: any) => {
    // Watch for enter key
    if (!event.shiftKey && event.key === "Enter") {
      console.log(`Enter`);
      sendChat();
    }
  };
  return (
    <>
      <style jsx>{`
        .inputnav {
          width: 100%;
          position: fixed;
          bottom: 0;
          z-index: 8000;
        }
        .chatinput {
          position: fixed;
          bottom: 0;
          width: 90%;
          font-size: 16px;
        }
      `}</style>
      <div className="inputnav">
        <textarea
          id="chatinput"
          className="chatinput"
          onKeyDown={(e) => keyDown(e)}
          placeholder="Enterで送信 / Shift + Enterで改行"
        />
      </div>
    </>
  );
}

function playSound() {
  const notifysound = document.getElementById(
    "notifysound"
  ) as HTMLAudioElement;
  notifysound.currentTime = 0;
  notifysound.play();
}
