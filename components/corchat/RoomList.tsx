import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HashLoader } from "react-spinners";

export default function RoomList({
  roomslist,
  row,
}: {
  roomslist: object[];
  row: number;
}) {
  const user = useUser();
  const router = useRouter();
  console.log(`[RoomList]`);
  console.dir(roomslist);
  return (
    <div>
      {roomslist.length === 0 ? (
        <p>Loading</p>
      ) : (
        roomslist.map((x: any) => (
          <ListsComponent key={x.roomid} roomprop={x} row={row} />
        ))
      )}
    </div>
  );
}

interface RoomInterface {
  id: string;
  roomname: string;
  permit: boolean;
  type: string;
  lastchat: string;
}
function ListsComponent({
  roomprop,
  row,
}: {
  roomprop: RoomInterface;
  row: number;
}) {
  console.log(`[ListsComponent] roomでーた: `);
  console.dir(roomprop);
  const router = useRouter();

  let viewurl = "/corchat/list-list";
  if (typeof window !== "undefined")
    viewurl = window.location.pathname.slice(9) as string;
  const [rurl, setRurl] = useState<string>(viewurl);
  const roomdata = roomprop;

  function redirectURL() {
    let viewsplit = viewurl.split("-");
    viewsplit[row - 1] = roomdata!.id;
    let view1 = viewsplit[0];
    let view2 = viewsplit[1];
    router.push(`/corchat/${view1}-${view2}`);
  }

  return (
    <>
      {!roomdata ? (
        <HashLoader color="#36d7b7" speedMultiplier={1.7} />
      ) : (
        <div className="roomlist" onClick={() => redirectURL()}>
          <p>{roomdata.roomname}</p>
        </div>
      )}
    </>
  );
}
