import { useUser } from "@supabase/auth-helpers-react";
import { getAllRoomsId, getRoomData } from "../../scripts/corchat/fetchroom";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HashLoader } from "react-spinners";

export default function RoomList({ row }: { row: number }) {
  const user = useUser();
  const router = useRouter();
  const [listdata, setListdata] = useState<object[]>([]);
  async function setData() {
    const getdata = await getAllRoomsId();
    if (getdata !== undefined) setListdata(getdata);
  }
  useEffect(() => {
    setData();
  }, [router]);
  return (
    <div>
      {!listdata ? (
        <p>Loading</p>
      ) : (
        listdata.map((x: any) => (
          <ListsComponent key={x.roomid} roomid={x.roomid} row={row} />
        ))
      )}
    </div>
  );
}

function ListsComponent({ roomid, row }: { roomid: string; row: number }) {
  interface RoomInterface {
    id: string;
    roomname: string;
    permit: boolean;
    type: string;
    lastchat: string;
  }

  let viewurl = "/corchat/list-list";
  if (typeof window !== "undefined")
    viewurl = window.location.pathname.slice(9) as string;
  const [rurl, setRurl] = useState<string>(viewurl);

  const [roomdata, setRoomdata] = useState<RoomInterface>();
  async function setData() {
    const getdata = await getRoomData(roomid);
    setRoomdata(getdata);
    let viewsplit = viewurl.split("-");
    viewsplit[row - 1] = getdata?.id;
    let view1 = viewsplit[0];
    let view2 = viewsplit[1];
    setRurl(`/corchat/${view1}-${view2}`);
  }
  useEffect(() => {
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!roomdata ? (
        <HashLoader color="#36d7b7" speedMultiplier={1.7} />
      ) : (
        <Link href={rurl}>
          <div className="roomlist">
            <p>{roomdata.roomname}</p>
          </div>
        </Link>
      )}
    </>
  );
}
