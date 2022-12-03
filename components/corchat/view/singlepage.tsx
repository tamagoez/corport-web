import ChatRoom from "../ChatRoom";
import RoomList from "../RoomList";
export default function SinglePage({
  roomslist,
  roomid,
}: {
  roomslist: {
    id: string;
    roomname: string;
    permit: boolean;
    type: string;
    lastchat: string;
  }[];
  roomid: string;
}) {
  console.log(`[DoublePage] ${roomslist}`);
  return (
    <>
      <style jsx>{`
        .chatflex {
          display: flex;
        }
        .coremenu {
          height: 100%;
          width: 8%;
        }
        .chatframe {
          height: 100%;
          width: 46%;
        }
      `}</style>
      <div className="chatflex">
        <div className="coremenu"></div>
        <div className="chatframe">
          {roomid === "list" ? (
            <RoomList roomslist={roomslist} row={1} />
          ) : (
            <ChatRoom
              roomid={roomid}
              roomsdata={roomslist}
              type="single"
              row={1}
            />
          )}
        </div>
      </div>
    </>
  );
}
