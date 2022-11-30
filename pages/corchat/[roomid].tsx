import { useRouter } from "next/router";

export default function ChatRoom() {
  const router = useRouter();
  const roomid = router.query.roomid as string;
  return (
    <>
      <p>roomid: {roomid}</p>
    </>
  );
}
