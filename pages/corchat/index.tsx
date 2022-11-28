import AddRoom from "../../components/corchat/AddRoom";
import RoomList from "../../components/corchat/RoomList";

export default function Index() {
  return (
    <>
      <AddRoom />
      <p>時間がなくて、バグが残っているかもしれません。</p>
      <RoomList />
    </>
  );
}
