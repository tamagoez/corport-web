import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import DoublePage from "../../components/corchat/view/doublepage";
import SinglePage from "../../components/corchat/view/singlepage";

export default function ChatRoom() {
  // 変数設定だぜ
  const router = useRouter();
  let viewurl = "/corchat/list-list";
  if (typeof window !== "undefined")
    viewurl = window.location.pathname.slice(9) as string;
  console.log(`[ChatRoom] viewurl: ${viewurl}`);
  const originalviewtype = viewurl.indexOf("-") != -1 ? "double" : "single";
  const [viewtype, setViewtype] = useState(originalviewtype);
  const viewsplit = viewurl.split("-");
  const view1 = viewsplit[0];
  const view2 = viewsplit[1];
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  // サイズ変更
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 800) {
          setViewtype("single");
        } else {
          setViewtype(originalviewtype);
        }
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

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
      {viewtype === "single" ? (
        <SinglePage roomid={view1} />
      ) : (
        <DoublePage roomid1={view1} roomid2={view2} />
      )}
    </>
  );
}
