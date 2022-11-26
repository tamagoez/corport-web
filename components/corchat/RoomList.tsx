import { useEffect, useState } from "react";
import { getOnline, getRoomList } from "../../scripts/edge";
import { useSession } from "@supabase/auth-helpers-react";
import { getUsername } from "../../scripts/user";
import { getAllRoomsData } from "../../scripts/corchat/fetchroom";

export default function RoomList() {
  const session = useSession();
  const [roomlist, setRoomlist] = useState([]);
  return (
    <>
    <p>まだ作ってない</p>
    </>
  );
}

function ListComponent({ roomid }: { roomid: string }) {
  return (
    <>
      <style jsx>{`
        .userlistbox {
          border-radius: 10px 10px 10px 10px;
          background-color: #f5f3f2;
          border-color: #000000;
          cursor: pointer;
          padding-left: 6px;
          border: solid 0.5px;
          display: flex;
          align-items: center;
        }
        .userlistbox:hover {
          background-color: #f5f3f2;
          filter: drop-shadow(5px 5px 4px #d8dbd9);
          filter: brightness(95%);
          z-index: 1;
        }
        .userlistbox img {
          width: 50px;
          height: 50px;
          background-color: #ffffff;
          border: solid 0px #000000;
          border-radius: 50%;
          margin-right: 20px;
          margin-left: 10px;
        }
        .userlistbox h3 {
          margin-top: 20px;
          margin-bottom: 0px;
        }
        .userlistbox .smallstatus {
          margin: 0;
          font-size: 12px;
        }
        .userlistbox p {
          margin-top: 5px;
          margin-bottom: 20px;
        }
      `}</style>
      <div className="userlistbox">
        <div>
          <img src="https://pedpmlptqookenixzvqt.supabase.co/storage/v1/object/public/avatars/guest.svg" />
        </div>
        <div>
          <h3>{roomid}</h3>
          <p className="smallstatus">オンラインかどうか</p>
          <p>最後のチャット</p>
        </div>
      </div>
    </>
  );
}
