import { motion } from "motion/react";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

export default function ChatRoom() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(async (doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate?.() || new Date(),
        };
      });
      Promise.all(messages).then(setMessages);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        senderID: user.id,
        senderName: user.username || "user",
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("send error:", error);
    }
  };

  return (
    <>
      <div className="container-fluid chatRoom">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at top center, rgba(0, 255, 0, 0.15), transparent 70%)",
            zIndex: 1,
          }}
        />

        <div className="msgs-container">
          {messages.map((msg) => (
            <Message key={msg.id} msg={msg} currentuserId={user?.id} />
          ))}
          <div ref={messagesEndRef} />
          <button className="HomeBtn">
            <Link to={"/"}>
              <IoChevronBack />
            </Link>
          </button>
        </div>
        <div className="msgs-input">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="اتكلم بأدب ياولد..."
            style={{
              resize: "none",
              minHeight: "40px",
              maxHeight: "120px",
              overflowY: "auto",
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          ></textarea>
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="sendMsgBtn"
          >
            <IoIosSend />
          </button>
        </div>
      </div>
    </>
  );
}

function Message({ msg, currentuserId }) {
  return (
    <div className="message">
      <div
        className={`msg-content ${
          msg.senderID === currentuserId ? "sent" : ""
        } `}
      >
        <div className="msg-meta">
          <strong>{msg.senderName}</strong>
          <span>
            {msg.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
      </div>
    </div>
  );
}
