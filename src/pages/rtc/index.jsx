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
import PullToRefresh from "react-simple-pull-to-refresh";

var timer;
var activity = [];
const socket = io("https://zuum-backend.onrender.com");
const myID = getID();
const peer = new Peer(undefined, {
  path: "/peerjs",
  host: "zuum-backend.herokuapp.com",
  secure: true,
  port: "",
});
const list = [];

function RTC() {
  const url = useParams().id;
  let mainVideo = useRef();
  let chatScreen = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [myPeerID, setMyPeerID] = useState("");
  const [mainVid, setMainVid] = useState({
    id: myID,
    stream: {},
    peer: "",
    name: getName(),
    image: getImage(),
  });
  const [stream, setStream] = useState({});
  const [mute, setMute] = useState(false);
  const [actv, setActv] = useState([]);
  const [calling, setCalling] = useState(false);
  const [isStreaming, setIsStreaming] = useState(true);
  const [text, setText] = useState("");
  const [autoFocus, setAutoFocus] = useState(false);
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
      setMainVid((prev) => {
        prev.peer = peerID;
        return prev;
      });
      socket.emit("join-room", url, peerID, getID(), getName(), getImage());
      setMyPeerID(peerID);
      startVideo();
    });

    socket.on("disconnect", () => {
      socket.connect();
    });

    socket.on("newMessage", (data) => {
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

    socket.on("muted-video", (id, value) => {
      console.log(id, value);
      const found = activity.find((all) => all.id === id);
      activity = [
        ...activity.filter((e) => e.id !== id),
        { id, video: value, audio: found.audio },
      ];
      setActv(activity);
      console.log(activity);
    });

    socket.on("muted-audio", (id, value) => {
      console.log(id, value);
      const found = activity.find((all) => all.id === id);
      activity = [
        ...activity.filter((e) => e.id !== id),
        { id, audio: value, video: found.video },
      ];
      setActv(activity);
      console.log(activity);
    });

    // edited
    socket.on("hangUp", (id, peerID) => {
      if (id === myID) {
        window.location.href = "/";
      } else {
        //edited
        setPeople((prev) => {
          return prev.filter((v) => v.id !== id);
        });
        //edited
        for (let conns in peer.connections) {
          peer.connections[conns].forEach((conn, i) => {
            if (conn.peer === peerID) {
              conn.peerConnection.close();
              conn.close && conn.close();
            }
          });
        }
      }
    });

    return () => {
      hangUp();
    };
  }, []);

  const startVideo = () => {
    mediaStream((stream) => {
      setStream(stream);
      setLoading(false);
      setMainVid((prev) => {
        prev.stream = stream;
        return prev;
      });
      mainVideo.current.srcObject = stream;
      //when initiators call you with there metadata attached
      peer.on("call", (call) => {
        setCalling(true);
        call.answer(stream);
        let id;
        call.on("stream", (userVideoStream) => {
          if (id !== userVideoStream.id) {
            addVideoStream(
              userVideoStream,
              call.metadata.peerID,
              call.metadata.userID,
              call.metadata.userName,
              call.metadata.userImage
            );
            id = userVideoStream.id;
          }
        });
      });
      //sent out signal from newly connected user for initiators to call him/her
      socket.on("userConnected", ({ peerID, userID, userName, userImage }) => {
        connectToNewUser(peerID, stream, userID, userName, userImage);
      });
    });
  };

  // adding video stream to circles sliders
  // ref: (e) => (otherVideos.current[prev.length] = e)
  const addVideoStream = (stream, peerID, userID, userName, userImage) => {
    list.push({ id: userID, image: userImage });
    setCalling(false);
    if (activity.find((e) => e.id === userID)) {
      setPeople((prev) => {
        return prev.filter((e) => e.id !== userID);
      });
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
    } else {
      activity.push({ id: userID, video: true, audio: true });
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
    }
  };

  // initiators calling new user with his metadata
  const connectToNewUser = (peerID, stream, userID, userName, userImage) => {
    setCalling(true);
    const call = peer.call(peerID, stream, {
      metadata: {
        peerID: myPeerID,
        userID: getID(),
        userName: getName(),
        userImage: getImage(),
      },
    });
    let id;
    // initiators getting stream from new user
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
      socket.emit("mute-audio", myID, false);
      stream.getAudioTracks()[0].enabled = false;
      setMute(true);
    } else {
      socket.emit("mute-audio", myID, true);
      stream.getAudioTracks()[0].enabled = true;
      setMute(false);
    }
  };

  const pauseStream = () => {
    const enabled = stream.getVideoTracks()[0].enabled;
    if (enabled) {
      socket.emit("mute-video", myID, false);
      stream.getVideoTracks()[0].enabled = false;
      setIsStreaming(false);
    } else {
      socket.emit("mute-video", myID, true);
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

  const openChatTab = () => {
    setAutoFocus(true);
    setChatTab(!chatTab);
  };

  const clickedImage = (obj) => {
    setPeople((prev) => {
      return [mainVid, ...prev.filter((e) => e.id !== obj.id)];
    });
    setMainVid(obj);
    mainVideo.current.srcObject = obj.stream;
  };

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
              onClick={() => copy(`https://zuum.onrender.com/${url}`)}
              title="click to copy"
              className="pointer"
            >
              <FontAwesomeIcon icon={faLink} />
            </span>
          </div>
        </div>

        <div className="live mr-2">
          <span className="lvIcon">
            <FontAwesomeIcon icon={faSatelliteDish} />
          </span>
          <span className="dot">•</span>
          {1 + people.length}
        </div>
      </div>

      <>
        <PullToRefresh onRefresh={() => window.location.reload()}>
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
            {calling ? (
              <div className="className fx fx-center">
                <Spinner size="lg" color="primary" />
              </div>
            ) : (
              <Slider
                className="className"
                nameClass="nameClass"
                imageClass="imageClass"
                actv={actv}
                clickedImage={clickedImage}
                imageStructureClass="imageStructureClass"
                imageContainerClass="imageContainerClass"
                item={people}
              />
            )}
          </div>
          <div
            className="controlButtons"
            style={{ display: chatTab ? "none" : "flex" }}
          >
            <div className="fx fx-align">
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
            <div>
              <span className="item pointer" onClick={openChatTab}>
                <span>
                  <FontAwesomeIcon icon={faMessage} />
                </span>
              </span>
            </div>
          </div>
        </PullToRefresh>
      </>
      <ChatScreen
        value={text}
        onChange={handleChange}
        chats={chats}
        onClick={sendText}
        typing={typing}
        chatRef={chatScreen}
        userID={myID}
        autoFocus={autoFocus}
        people={people && people.length}
        onClose={openChatTab}
        openTab={chatTab}
      />
    </div>
  );
}

export default RTC;
