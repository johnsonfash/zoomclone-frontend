import {
  faChevronLeft,
  faLink,
  faMessage,
  faMicrophone,
  faMicrophoneSlash,
  faPhone,
  faSatelliteDish,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
// import image from "../../assets/profile.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "../../components/slider";
import "./index.css";
import { useState } from "react";
import ChatScreen from "../../components/chatScreen";
import {
  getID,
  getImage,
  getName,
  getUser,
  isRegistered,
} from "../../services/auth";
import { copy, error, ToastContainer } from "../../components/copyText";
import { mediaStream } from "../../helper/rtc/utils";
import { useRef } from "react";
import { Spinner } from "reactstrap";

var timer;
var socket = io("https://zuum-backend.herokuapp.com");
var myID = getID();
var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "zuum-backend.herokuapp.com",
  secure: true,
  port: "",
});
var list = [];

function RTC() {
  const url = useParams().id;
  let mainVideo = useRef();
  let chatScreen = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [myPeerID, setMyPeerID] = useState("");
  const [stream, setStream] = useState({});
  const [mute, setMute] = useState(false);
  const [isStreaming, setIsStreaming] = useState(true);
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  const [chatTab, setChatTab] = useState(false);
  const [typing, setTyping] = useState(false);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (!isRegistered() || !url.match(/[\d\w]{4}-[\d\w]{4}-[\d\w]{4}/)) {
      navigate("/");
      return;
    }

    peer.on("error", (err) => {
      error(err.type);
    });

    peer.on("open", (peerID) => {
      socket.emit("join-room", url, peerID, getID(), getName(), getImage());
      setMyPeerID(peerID);
      startVideo();
    });

    socket.on("newMessage", (data) => {
      console.log(list);
      setChats((prev) => {
        const userImage = list.find((p) => p.id === data.id);
        if (userImage) {
          data.image = userImage.image;
        }
        return [...prev, data];
      });
      setTimeout(() => {
        chatScreen.current.scrollTop = chatScreen.current.scrollHeight;
      }, 300);
    });

    socket.on("newTyper", (data) => {
      setTyping(data);
    });

    // edited
    socket.on("hangUp", (id, peerID) => {
      if (id === myID) {
        window.location.href = "/";
      } else {
        //edited
        for (let conns in peer.connections) {
          peer.connections[conns].forEach((conn, i) => {
            if (conn.peer === peerID) {
              conn.peerConnection.close();
              conn.close && conn.close();
            }
          });
        }
        //edited
        setPeople((prev) => {
          return prev.map((v) => v.id !== id);
        });
      }
    });
  }, []);

  const startVideo = () => {
    mediaStream((stream) => {
      setStream(stream);
      setLoading(false);
      mainVideo.current.srcObject = stream;
      peer.on("call", (call) => {
        call.answer(stream);
        let id;
        call.on("stream", (userVideoStream) => {
          if (id !== userVideoStream.id) {
            addVideoStream(
              userVideoStream,
              call.metadata.peerID,
              call.metadata.userID,
              call.metadata.userName,
              call.metadata.image
            );
            id = userVideoStream.id;
          }
        });
      });
      socket.on("userConnected", ({ peerID, userID, userName, userImage }) => {
        connectToNewUser(peerID, stream, userID, userName, userImage);
      });
    });
  };

  // ref: (e) => (otherVideos.current[prev.length] = e)
  const addVideoStream = (stream, peerID, userID, userName, userImage) => {
    list.push({ id: userID, image: userImage });
    console.log({ id: userID, image: userImage });
    setPeople((prev) => {
      return [
        ...prev,
        {
          id: userID,
          stream,
          peer: peerID,
          name: userName,
          image: userImage,
        },
      ];
    });
  };

  const connectToNewUser = (peerID, stream, userID, userName, userImage) => {
    const call = peer.call(peerID, stream, {
      metadata: {
        peerID: myPeerID,
        userID: getID(),
        userName: getName(),
        userImage: getImage(),
      },
    });
    let id;
    call.on("stream", (remoteStream) => {
      if (id !== remoteStream.id) {
        addVideoStream(remoteStream, peerID, userID, userName, userImage);
        id = remoteStream.id;
      }
    });
  };

  const muteVideo = () => {
    const enabled = stream.getAudioTracks()[0].enabled;
    if (enabled) {
      stream.getAudioTracks()[0].enabled = false;
      setMute(true);
    } else {
      stream.getAudioTracks()[0].enabled = true;
      setMute(false);
    }
  };

  const pauseStream = () => {
    const enabled = stream.getVideoTracks()[0].enabled;
    if (enabled) {
      stream.getVideoTracks()[0].enabled = false;
      setIsStreaming(false);
    } else {
      stream.getVideoTracks()[0].enabled = true;
      setIsStreaming(true);
    }
  };

  const hangUp = () => {
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    socket.emit("hangup", myID, peer.id);
    // edited
    peer.destroy();
  };

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit("typing", true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      socket.emit("typing", false);
    }, 2000);
  };

  const sendText = (e) => {
    e.preventDefault();
    socket.emit("message", { ...getUser(), image: "none", message: text });
    socket.emit("typing", false);
    setText("");
  };

  const openChatTab = () => setChatTab(!chatTab);

  return (
    <div className="mainContainer">
      <ToastContainer />
      <div className="header head">
        <div className="one fx fx-align">
          <Link to="/" className="back pointer mr-2" onClick={"onClose"}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
          <div className="link">
            {url}
            <span
              onClick={() => copy(`${url}`)}
              // onClick={() => copy(`https://webrtc-johnfash.heroku.com/${url}`)}
              title="click to copy"
              className="pointer"
            >
              <FontAwesomeIcon icon={faLink} />
            </span>
          </div>
        </div>

        <div className="live">
          <span className="lvIcon">
            <FontAwesomeIcon icon={faSatelliteDish} />
          </span>
          <span className="dot">•</span>
          {1 + people.length}
        </div>
        <div className="chat pointer" onClick={openChatTab}>
          <FontAwesomeIcon icon={faMessage} />
        </div>
      </div>
      <div className="mainVideo">
        {loading ? (
          <div className="loader">
            <Spinner size="lg" color="primary" />
          </div>
        ) : (
          <video
            className="video"
            autoPlay={true}
            playsInline={true}
            controls={false}
            ref={mainVideo}
            muted={false}
          />
        )}
      </div>
      <div className="videoList">
        <Slider
          className="className"
          nameClass="nameClass"
          imageClass="imageClass"
          imageStructureClass="imageStructureClass"
          imageContainerClass="imageContainerClass"
          item={people}
        />
      </div>
      <div
        className="controlButtons"
        style={{ display: chatTab ? "none" : "flex" }}
      >
        <span className="item pointer" onClick={hangUp}>
          <FontAwesomeIcon icon={faPhone} />
        </span>
        <span className="item pointer" onClick={pauseStream}>
          {isStreaming ? (
            <span>
              <FontAwesomeIcon icon={faVideo} />
            </span>
          ) : (
            <span>
              <FontAwesomeIcon icon={faVideoSlash} />
            </span>
          )}
        </span>
        <span className="item pointer" onClick={muteVideo}>
          {mute ? (
            <span>
              <FontAwesomeIcon icon={faMicrophoneSlash} />
            </span>
          ) : (
            <span>
              <FontAwesomeIcon icon={faMicrophone} />
            </span>
          )}
        </span>
      </div>

      <ChatScreen
        value={text}
        onChange={handleChange}
        chats={chats}
        onClick={sendText}
        typing={typing}
        chatRef={chatScreen}
        userID={myID}
        people={people && people.length}
        onClose={openChatTab}
        openTab={chatTab}
      />
    </div>
  );
}

export default RTC;
