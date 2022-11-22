import { useUser } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const user = useUser();
  return (
    <>
      <style jsx>{`
        h1 {
          text-align: center;
        }
        .centeraligned {
          text-align: center;
        }
        .LinkButton {
          border-bottom: solid 1px orange;
        }
        .LinkButton:hover {
          background: linear-gradient(transparent 0, orange 50%);
          color: white;
        }
      `}</style>
      <Head>
        <title>CorPort</title>
        <meta
          name="description"
          content="Your port for corporate with community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>CorPort</h1>
      <div className="centeraligned">
        <Link href="/common/auth">
          <span className="LinkButton">
            {!user ? "ログイン / 新規登録" : "Dashboardに行く"}
          </span>
        </Link>
      </div>
    </>
  );
}
