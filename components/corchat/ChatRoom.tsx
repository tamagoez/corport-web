import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

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
  if (type === "double") barwidth = 46;
  return (
    <>
      <style jsx>{`
        .titlebar {
          width: ${barwidth}%;
          height: 40px;
          position: fixed;
          top: 0;
          background-color: #d8dbd9;
          z-index: 3000;
          display: flex;
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

function MainBox() {
  return (
    <>
      <style jsx>{``}</style>
      <div className="mainframe"></div>
    </>
  );
}
