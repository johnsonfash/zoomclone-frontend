import {
  faChevronLeft,
  faEllipsis,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import image from "../assets/placeholder.jpg";
import { Button, Form, Input } from "reactstrap";
import { useState } from "react";

function ChatScreen({
  openTab,
  userID,
  onClose,
  chats,
  chatRef,
  autoFocus,
  people,
  typing,
  value,
  onChange,
  onClick,
}) {
  const [tab, setTab] = useState(openTab);
  const [peopleChat, setPeopleChat] = useState([]);
  const [focus, setFocus] = useState(autoFocus);
  const [participant, setParticipant] = useState(0);
  const [type, setType] = useState(false);
  useEffect(() => {
    setTab(openTab);
  }, [openTab]);

  useEffect(() => {
    setPeopleChat(chats);
  }, [chats]);

  useEffect(() => {
    setFocus(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    setParticipant(people ? people + 1 : 1);
  }, [people]);

  useEffect(() => {
    setType(typing);
  }, [typing]);

  return (
    <div
      className="mainContainer chatScreen"
      style={{ top: tab ? "0" : "-100vh" }}
    >
      <div className="chatContainer">
        <div className="header">
          <div className="back pointer" onClick={onClose}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="users">
            Participant
            <span className="dot">{participant ? "•" : ""}</span>
            <span className="num">{participant.toString()}</span>
          </div>
        </div>
        <div className="chatC">
          <div className="chats" ref={chatRef}>
            {peopleChat.map((chat, idx) => (
              <div key={idx} className={`item ${chat.id === userID && "you"}`}>
                {chat.id !== userID && (
                  <div className="imageContainer">
                    <img
                      src={chat.image === "none" ? image : chat.image}
                      alt=""
                    />
                  </div>
                )}
                <div className="chatBody">
                  <span className="text">{chat.message}</span>
                  <span className="arrow"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chatInput" style={{ display: tab ? "block" : "none" }}>
          {type && (
            <div className="typing">
              <span className="icon"></span>
              <em className="">Someone is typing</em>
            </div>
          )}
          <Form onSubmit={onClick} className="fx">
            <Input
              autoFocus={focus}
              value={value}
              required={true}
              onChange={onChange}
            />
            <Button type="submit">
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
