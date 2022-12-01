import { useRouter } from "next/router";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import AddRoom from "../../components/corchat/AddRoom";
import RoomList from "../../components/corchat/RoomList";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/corchat/list-list")
  }, [router])
  return (
    <>
      <BarLoader
        color="#36d7b7"
        height={4}
        speedMultiplier={1}
        width={"100%"}
        loading={true}
        cssOverride={{ zIndex: 9999 }}
      />
    </>
  );
}
