import { MdClose } from "react-icons/md";
import {
  createGroupRoom,
  createPersonalRoom,
} from "../../scripts/corchat/createroom";

export default function AddRoom() {
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
        #add-group {
          display: none;
        }
        #add-chat-user:checked ~ .acu-parent {
          animation: zoomIn 0.2s ease 1 forwards;
          display: block;
        }
        .acu-modal #userid {
          width: 350px;
        }
        .acu-modal #groupname {
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
        #personaladd {
          display: block;
        }
        #groupadd {
          display: none;
        }
        #add-group:checked ~ #personaladd {
          display: none;
        }
        #add-group:checked ~ #groupadd {
          display: block;
        }
        .groupinput {
          height: 4em;
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
          <span>+ ルームを追加する</span>
        </div>
      </button>
      <div className="acu-parent">
        <div className="acu-modal">
          <label htmlFor="add-chat-user">
            <MdClose />
          </label>
          <input type="checkbox" id="add-group" />
          <div id="personaladd">
            <button
              onClick={() =>
                ((
                  document.getElementById("add-group") as HTMLInputElement
                ).checked = true)
              }
            >
              グループ作成に変更
            </button>
            <div>
              <label htmlFor="userid">ユーザーIDを入力してください</label>
              <input
                id="userid"
                type="text"
                title="ユーザーIDを入力"
                placeholder="ユーザーIDを入力してください。@マークは不要です。"
                maxLength={30}
              ></input>
            </div>
            <div>
              <label htmlFor="request" id="requestlabel">
                リクエスト内容を入力してください(200字以内)。
                <br />
                リクエスト先に送信されます。
              </label>
              <br />
              <textarea
                id="request"
                title="リクエストを入力"
                placeholder="リクエスト内容を入力してください(200字以内)。リクエスト先に送信されます。"
                maxLength={200}
              ></textarea>
            </div>
            <button
              onClick={() =>
                createPersonalRoom(
                  (document.getElementById("userid") as HTMLInputElement).value
                )
              }
            >
              個人チャットリクエストを送信する
            </button>
          </div>
          <div id="groupadd">
            <button
              onClick={() =>
                ((
                  document.getElementById("add-group") as HTMLInputElement
                ).checked = false)
              }
            >
              個人チャット作成に変更
            </button>
            <div>
              <label htmlFor="userid">ユーザーIDを入力してください</label>
              <input
                id="userid"
                type="text"
                title="ユーザーIDを入力(,でユーザーを区切る)"
                placeholder='","マークで区切り、複数ユーザーを追加できます。'
              ></input>
            </div>
            <div>
              <label htmlFor="groupname">グループ名を入力してください</label>
              <input
                id="groupname"
                type="text"
                title="グループ名を入力してください"
                placeholder="グループメンバー全員に表示されます。"
              ></input>
            </div>
            <div>
              <label htmlFor="request" id="requestlabel">
                リクエスト内容を入力してください(200字以内)。
                <br />
                リクエスト先に送信されます。
              </label>
              <br />
              <textarea
                id="request"
                title="リクエストを入力"
                placeholder="リクエスト内容を入力してください(200字以内)。リクエスト先に送信されます。"
                maxLength={200}
              ></textarea>
            </div>
            <button
              onClick={() =>
                createGroupRoom(
                  (document.getElementById("userid") as HTMLInputElement).value,
                  (document.getElementById("groupname") as HTMLInputElement)
                    .value
                )
              }
            >
              グループを作成する
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
