import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useState } from "react";

export default async function RoomLists() {
  const supabase = useSupabaseClient();
  const user = useUser();
  type DataLists = [
    {
      roomid: string;
      username: string;
      lastchat: string;
    }
  ];
  const [lists, setLists] = useState<DataLists>([
    { roomid: "", username: "", lastchat: "" },
  ]);
  try {
    const { data, error } = await supabase.functions.invoke(
      "getcorchatrooms",
      {}
    );
    console.dir(data);
    if (error) throw error;
    setLists(data);
  } catch (error: any) {
    console.error(error.message);
  }
  function ListComponent({roomid, username, lastchat}: {roomid: string, username: string, lastchat: string}) {
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
        <div className="userlist">
          <Link href={`/snapchat/personal/${roomid}`}>
            <div className="userlistbox">
              <div>
                <img src="https://pedpmlptqookenixzvqt.supabase.co/storage/v1/object/public/avatars/guest.svg" />
              </div>
              <div>
                <h3>{username}</h3>
                <p className="smallstatus">オフライン</p>
                <p>{lastchat}</p>
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  }

  return lists.map((x) => (
    <ListComponent
      key={x.roomid}
      roomid={x.roomid}
      username={x.username}
      lastchat={x.lastchat}
    />
  ));
}
