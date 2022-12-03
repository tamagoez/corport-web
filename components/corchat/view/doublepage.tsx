import ChatRoom from "../ChatRoom";
import RoomList from "../RoomList";
export default function DoublePage({
  roomslist,
  roomid1,
  roomid2,
}: {
  roomslist: {
    id: string;
    roomname: string;
    permit: boolean;
    type: string;
    lastchat: string;
  }[];
  roomid1: string;
  roomid2: string;
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
          {roomid1 === "list" ? (
            <RoomList roomslist={roomslist} row={1} />
          ) : (
            <ChatRoom
              roomid={roomid1}
              roomsdata={roomslist}
              type="double"
              row={1}
            />
          )}
        </div>
        <div className="chatframe">
          {roomid2 === "list" ? (
            <RoomList roomslist={roomslist} row={2} />
          ) : (
            <ChatRoom
              roomid={roomid2}
              roomsdata={roomslist}
              type="double"
              row={2}
            />
          )}
        </div>
      </div>
    </>
  );
}
