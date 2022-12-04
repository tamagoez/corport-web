import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { getSomeChat } from "../../scripts/corchat/chatread";

export default function ChatRoom({
  roomid,
  roomsdata,
  type,
  row,
}: {
  roomid: string;
  roomsdata: {
    id: string;
    roomname: string;
    permit: boolean;
    type: string;
    lastchat: string;
  }[];
  type: string;
  row: number;
}) {
  console.log(roomid);
  console.log(roomsdata);
  const roomdataarray = roomsdata.filter((item) => item.id == roomid);
  const roomdata = roomdataarray[0];
  console.log(roomdata);
  return (
    <>
      <TitleBar roomname={roomdata?.roomname} type={type} row={row} />
      <MainBox roomid={roomdata?.id} />
    </>
  );
}

function TitleBar({
  roomname,
  type,
  row,
}: {
  roomname: string;
  type: string;
  row: number;
}) {
  function redirectURL() {
    let viewurl = "/corchat/list-list";
    if (typeof window !== "undefined")
      viewurl = window.location.pathname.slice(9) as string;
    let viewsplit = viewurl.split("-");
    viewsplit[row - 1] = "list";
    let view1 = viewsplit[0];
    let view2 = viewsplit[1];
    return `/corchat/${view1}-${view2}`;
  }
  let barwidth = 92;
  if (type === "double") barwidth = 45.8;
  return (
    <>
      <style jsx>{`
        .titlebar {
          width: ${barwidth}%;
          height: 45px;
          position: fixed;
          top: 0;
          background-color: #d8dbd9;
          z-index: 3000;
          display: flex;
          border-radius: 10px;
          margin: 0;
          /* drop-shadow */
          box-shadow: 0px 1px 5px gray;
        }
      `}</style>
      <div className="titlebar">
        <Link href={redirectURL()}>
          <p>
            <IoIosArrowBack />
          </p>
        </Link>
        <p>{roomname}</p>
      </div>
    </>
  );
}

interface ChatObject {
  id: string;
  userid: string;
  text: string;
  type: string;
  created_at: string;
}

function MainBox({ roomid }: { roomid: string }) {
  const [messages, setMessages] = useState<any>([]);
  async function fetchMessages() {
    const getdata = await getSomeChat(roomid);
    if (getdata !== undefined) setMessages(getdata);
  }
  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <>
      <style jsx>{`
        .mainframe {
          padding-top: 45px;
        }
      `}</style>
      <div className="mainframe">
        {messages.map((x: ChatObject) => (
          <p key={x.id}>{x.text}</p>
        ))}
      </div>
    </>
  );
}
