import { useUser } from "@supabase/auth-helpers-react";
import { getAllRoomsId, getRoomData } from "../../scripts/corchat/fetchroom";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HashLoader } from "react-spinners";

export default function RoomList() {
  return (
    <>
      <Lists />
    </>
  );
}

function Lists() {
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
          <ListsComponent key={x.roomid} roomid={x.roomid} />
        ))
      )}
    </div>
  );
}

function ListsComponent({ roomid }: { roomid: string }) {
  interface RoomInterface {
    id: string;
    roomname: string;
    permit: boolean;
    type: string;
    lastchat: string;
  }
  const [roomdata, setRoomdata] = useState<RoomInterface>();
  async function setData() {
    const getdata = await getRoomData(roomid);
    setRoomdata(getdata);
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
        <Link href={`/corchat/${roomdata.id}`}>
          <div className="roomlist">
            <p>{roomdata.roomname}</p>
          </div>
        </Link>
      )}
    </>
  );
}
