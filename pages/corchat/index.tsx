import RoomList from "../../components/corchat/RoomList";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/router";
import { useState } from "react";
import { sendrequest } from "../../scripts/edge";

export default function Index() {
  return (
    <>
      <p>
        ほんとにごめんなさい。
        <br />
        時間がなくて、ルーム名、オンライン表記、最後のチャットを取得する機構をつけていません。
      </p>
      <RoomList />
    </>
  );
}

function AddUser() {
  const router = useRouter();
  const [adduserid, setAdduserid] = useState("");
  const [addrequest, setAddRequest] = useState("");
  return (
    <>
      <style jsx>{`
        .acu-parent {
          display: none;
          position: fixed;
          background-color: #f5f3f2;
          z-index: 1000;
          width: 360px;
          height: 500px;
          inset: 0;
          margin: auto;
          padding-left: 3px;
        }
        #add-chat-user {
          display: none;
        }
        #add-chat-user:checked ~ .acu-parent {
          animation: zoomIn 0.2s ease 1 forwards;
          display: block;
        }
        .acu-modal #userid {
          width: 350px;
        }
        .acu-modal label {
          font-size: 12px;
        }
        .acu-modal #requestlabel {
          line-height: 0px;
        }
        .acu-modal #request {
          width: 350px;
          height: 200px;
        }
        .acu-modal button {
          width: 350px;
        }
        @keyframes zoomIn {
          0% {
            transform: scale(0.8);
            opacity: 70%;
          }
          100% {
            transform: scale(1);
            opacity: 100%;
          }
        }
      `}</style>
      <input type="checkbox" id="add-chat-user" />
      <button
        className="acu-button"
        onClick={() =>
          ((
            document.getElementById("add-chat-user") as HTMLInputElement
          ).checked = true)
        }
      >
        <div>
          <span>+ 追加する</span>
        </div>
      </button>
      <div className="acu-parent">
        <div className="acu-modal">
          <label htmlFor="add-chat-user">
            <MdClose />
          </label>
          <div>
            <label htmlFor="userid">ユーザーIDを入力してください</label>
            <input
              id="userid"
              type="text"
              title="ユーザーIDを入力"
              placeholder="ユーザーIDを入力してください。@マークは不要です。"
              maxLength={30}
              onChange={(e) => setAdduserid(e.target.value)}
              value={adduserid}
            ></input>
          </div>
          <div>
            <label htmlFor="request" id="requestlabel">
              リクエスト内容を入力してください(300字以内)。
              <br />
              リクエスト先に送信されます。
            </label>
            <br />
            <textarea
              id="request"
              title="リクエストを入力"
              placeholder="リクエスト内容を入力してください(300字以内)。リクエスト先に送信されます。"
              maxLength={200}
              onChange={(e) => setAddRequest(e.target.value)}
              value={addrequest}
            ></textarea>
          </div>
          <button onClick={() => sendrequest(adduserid, addrequest)}>
            送信する
          </button>
        </div>
      </div>
    </>
  );
}
