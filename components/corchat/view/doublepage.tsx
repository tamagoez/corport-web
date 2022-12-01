import RoomList from "../RoomList";
export default function DoublePage({
  roomid1,
  roomid2,
}: {
  roomid1: string;
  roomid2: string;
}) {
  return (
    <>
      <div>{roomid1 === "list" ? <RoomList row={1} /> : null}</div>
      <div>{roomid2 === "list" ? <RoomList row={2} /> : null}</div>
    </>
  );
}
