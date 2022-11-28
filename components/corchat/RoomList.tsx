import { useUser } from "@supabase/auth-helpers-react";
import { getAllRoomsData } from "../../scripts/corchat/fetchroom";
import { useEffect, useState } from "react";

export default function RoomList() {
  return (
    <>
      <ListComponents />
    </>
  );
}

function ListComponents() {
  const user = useUser();
  const [listdata, setListdata] = useState<any>();
  useEffect(() => {
    if (user) {
      getAllRoomsData().then((data) => {
        setListdata(data);
        console.log(data);
      });
    }
  }, [user]);
  return (
    <>
      {!listdata ? (
        <p>Loading</p>
      ) : (
        listdata.map((x: any) => (
          <div key={x.id} className="roomlist">
            {x.roomname} - {x.lastchat}
          </div>
        ))
      )}
    </>
  );
}
