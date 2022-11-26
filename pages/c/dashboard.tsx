import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <style jsx>{`
        h1 {
          text-align: center;
        }
        ul {
          width: 100%;
          padding: 0;
          text-align: center;
          list-style: none;
        }
      `}</style>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <Link href="/corchat">CorChat</Link>
        </li>
      </ul>
    </>
  );
}
