import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import DoublePage from "../../components/corchat/view/doublepage";
import SinglePage from "../../components/corchat/view/singlepage";
import {
  getAllRoomsData,
  getAllRoomsId,
  getRoomData,
} from "../../scripts/corchat/fetchroom";

export default function ChatRoom() {
  // 変数設定だぜ
  const router = useRouter();
  let viewurl = "/corchat/list-list";
  if (typeof window !== "undefined")
    viewurl = window.location.pathname.slice(9) as string;
  console.log(`[ChatRoom] viewurl: ${viewurl}`);
  const originalviewtype = viewurl.indexOf("-") != -1 ? "double" : "single";
  const [viewtype, setViewtype] = useState(originalviewtype);
  const viewsplit = viewurl.split("-");
  const view1 = viewsplit[0];
  const view2 = viewsplit[1];
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  interface RoomInterface {
    id: string;
    roomname: string;
    permit: boolean;
    type: string;
    lastchat: string;
  }
  const [roomlist, setRoomlist] = useState<RoomInterface[]>([]);
  async function fetchRoom() {
    const data = await getAllRoomsData();
    if (data) setRoomlist(data);
    console.log("[fetchroom] かんりょ～");
    console.dir(roomlist.length);
  }

  // ルーム取得
  // 取得された奴はprop投げられるぅ
  useEffect(() => {
    if (roomlist.length === 0) {
      fetchRoom();
    }
  }, []);

  // サイズ変更
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 800) {
          if (viewtype !== "single") setViewtype("single");
        } else {
          if (viewtype !== originalviewtype) setViewtype(originalviewtype);
        }
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [viewtype]);

  return (
    <>
      <BarLoader
        color="#36d7b7"
        height={4}
        speedMultiplier={1}
        width={"100%"}
        loading={true}
        cssOverride={{ zIndex: 9999 }}
      />
      {viewtype === "single" ? (
        <SinglePage roomslist={roomlist} roomid={view1} />
      ) : (
        <DoublePage roomslist={roomlist} roomid1={view1} roomid2={view2} />
      )}
    </>
  );
}
