import RoomList from "../RoomList";
export default function SinglePage({ roomid }: { roomid: string }) {
  return <>{roomid === "list" ? <RoomList row={1} /> : null}</>;
}
