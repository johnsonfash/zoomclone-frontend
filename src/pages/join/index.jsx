import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import BottomPanel from "../../components/bottomPanel";
import { copy, ToastContainer } from "../../components/copyText";
import FixedFooter from "../../components/fixedFooter";
import imageToString from "../../helper/fileReader";
import moment from "../../helper/timeago";
import uuid from "../../helper/uuid";
import PullToRefresh from "react-simple-pull-to-refresh";
import {
  addLink,
  getImage,
  getLinks,
  getName,
  getUser,
  isRegistered,
  logOut,
  register,
} from "../../services/auth";
import "./index.css";

function Join() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(false);
  const [imS, setImS] = useState("");
  const [inputLink, setInputLink] = useState("");
  const [name, setName] = useState("");
  const [bP, setbP] = useState(false);
  const [modal, setModal] = useState(false);
  const [link, setLink] = useState("");
  const [allLinks, setAllLinks] = useState([]);

  useEffect(() => {
    if (isRegistered()) {
      setAllLinks(getLinks());
      setImS(getImage());
      copy("Click image to LOG OUT", true);
    } else {
      setModal(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      name: name,
      image: imS,
      id: uuid(),
    });
    toggle();
  };

  const readImage = (e) => {
    imageToString(e, (str) => {
      setImS(str);
    });
  };

  const toggle = () => {
    setModal(!modal);
  };

  const showTab = (type) => {
    type !== undefined && setbP(type);
    if (type === true && tab === false) {
      let newL = uuid();
      let obj = {
        link: newL,
        date: moment.now(),
      };
      setLink(newL);
      addLink(obj);
      setAllLinks([obj, ...allLinks].slice(0, 5));
    }
    setTab(!tab);
  };

  const copyText = () => {
    copy(`https://zuum.herokuapp.com/${link}`);
    showTab();
  };

  const handleLink = (e) => {
    e.preventDefault();
    window.location.href = "/" + inputLink;
    // navigate(`/${inputLink}`);
  };

  return (
    <div className="mainContainer">
      <ToastContainer />
      <div className="header">
        <div className="one"></div>
        <div className="two">webRTC - John Fash</div>
        <div className="three">
          <div
            title="LOG OUT"
            className="profContn pointer"
            onClick={() => logOut()}
          >
            <img src={imS} alt="" />
          </div>
        </div>
      </div>
      <>
        <PullToRefresh onRefresh={() => window.location.reload()}>
          <div className="meetingButtons">
            <div className="button" onClick={() => showTab(true)}>
              Create a room
            </div>
            <div className="button" onClick={() => showTab(false)}>
              Use a code
            </div>
          </div>
          <div className="mLinks">
            <div className="title">Previous Links</div>
            <div className="itemsContainer">
              {allLinks.map((data, idx) => (
                <a key={idx} href={data.link} className="items">
                  <div className="no">{idx + 1}</div>
                  <div className="linkC">
                    <div className="link">{data.link}</div>
                    <div className="date">
                      {moment.setDate(data.date).moment()}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </PullToRefresh>
      </>
      <FixedFooter>
        <BottomPanel openTab={tab} onClick={showTab}>
          <div className="linkCopy">
            {bP ? (
              <div className="linkC">
                <span className="link">
                  {`https://zuum.herokuapp.com/${link}`}
                </span>
                <span className="copyButton pointer" onClick={copyText}>
                  <FontAwesomeIcon icon={faCopy} />
                </span>
              </div>
            ) : (
              <div className="inputC">
                <Form onSubmit={handleLink}>
                  <Input
                    placeholder="Enter link (xxxx-xxxx-xxxx)"
                    type="text"
                    valid={inputLink}
                    onChange={(e) => setInputLink(e.target.value)}
                    required={true}
                    block
                    maxLength={14}
                    pattern="[\d\w]{4}-[\d\w]{4}-[\d\w]{4}"
                    minLength={14}
                  />
                  <Button type="submit" block color="primary">
                    Join
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </BottomPanel>
      </FixedFooter>

      <Modal isOpen={modal} toggle={toggle} style={{ marginTop: "10rem" }}>
        <ModalHeader style={{ background: "var(--blue)" }} toggle={toggle}>
          REGISTER
        </ModalHeader>
        <ModalBody style={{ background: "var(--dark)" }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm="12">
                <Label>Profile Image</Label>
                <Input
                  onChange={readImage}
                  accept="image/*"
                  className="pointer"
                  required={true}
                  type="file"
                  block
                />
                <br />
              </Col>
              <Col sm="12">
                <Label>Your Name</Label>
                <Input
                  required={true}
                  placeholder="Full Name"
                  autoComplete={true}
                  autoFocus={true}
                  autoCapitalize={true}
                  onChange={(e) => setName(e.target.value)}
                  block
                  minLength={4}
                  value={name}
                />
                <br />
                <Button type="submit" block color="primary">
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Join;
