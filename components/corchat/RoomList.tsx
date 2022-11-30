import { useUser } from "@supabase/auth-helpers-react";
import { getAllRoomsId, getRoomData } from "../../scripts/corchat/fetchroom";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
  const [listdata, setListdata] = useState([]);
  async function setData() {
    const getdata = await getAllRoomsId();
    setListdata(getdata);
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
  const [roomdata, setRoomdata] = useState();
  async function setData() {
    const getdata = await getRoomData(roomid);
    setRoomdata(getdata);
  }
  useEffect(() => {
    setData();
  }, []);
  return (
    <>
      {!roomdata ? (
        <p>Loading</p>
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
