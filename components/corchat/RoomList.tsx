import { useUser } from "@supabase/auth-helpers-react";
import { getAllRoomsData } from "../../scripts/corchat/fetchroom";
import { useEffect, useMemo, useState } from "react";

export default function RoomList() {
  return (
    <>
      <ListComponents />
    </>
  );
}

function ListComponents() {
  const user = useUser();
  // const [listdata, setListdata] = useState<any>();
  const listdata = useMemo<any>(async () => await getAllRoomsData(), []);
  return (
    <>
      {!listdata ? (
        <p>Loading</p>
      ) : Array.isArray(listdata) ? (
        listdata.map((x: any) => (
          <div key={x.id} className="roomlist">
            {x.roomname} - {x.lastchat}
          </div>
        ))
      ) : null}
    </>
  );
}
