import React, { useState, useContext } from "react";
import { Container, Col, Button, Row, Jumbotron } from "reactstrap";
import { useHistory } from "react-router-dom";
import createBtn from "../assets/creatBtn.png";
import myProjectsBtn from "../assets/myprojectsBtn.png";
import allProjectsBtn from "../assets/allprojectsBtn.png";
import aboutBtn from "../assets/aboutBtn.png";
import myProfileBtn from "../assets/myprofileBtn.png";
import authContex from "../context/auth-contex";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import useModal from "react-hooks-use-modal";

var requestBody = gql`
  {
    users {
      name
    }
  }
`;

export default function HomePage() {
  //koritimo kako bi napravili pop up postoji ugradjena u react hooks
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
  });
  const history = useHistory();
  const { loading, data } = useQuery(requestBody);

  return (
    <React.Fragment>
      {!loading && (
        <Container>
          <Col></Col>
          <Jumbotron style={{ marginTop: "100px" }}>
            <Row>
              <Col>
                <Button
                  color={"#f5f5f5"}
                  onClick={() => {
                    let path = "/components";
                    history.push(path);
                  }}
                >
                  {" "}
                  <img src={createBtn} width={100} height={100}></img>
                </Button>
              </Col>

              <Col>
                <Button
                  color={"#f5f5f5"}
                  onClick={() => {
                    let path = "/projects";
                    history.push(path);
                  }}
                >
                  {" "}
                  <img src={myProjectsBtn} width={100} height={100}></img>
                </Button>
              </Col>

              <Col>
                <Button
                  color={"#f5f5f5"}
                  onClick={() => {
                    let path = "/allprojects";
                    history.push(path);
                  }}
                >
                  {" "}
                  <img src={allProjectsBtn} width={100} height={100}></img>
                </Button>
              </Col>
              <Col>
                <Button onClick={open} color={"#f5f5f5"}>
                  {" "}
                  <img src={aboutBtn} width={100} height={100}></img>
                </Button>
              </Col>

              <Col>
                <Button
                  color={"#f5f5f5"}
                  onClick={() => {
                    let path = "/myprofile";
                    history.push(path);
                  }}
                >
                  {" "}
                  <img src={myProfileBtn} width={100} height={100}></img>
                </Button>
                <Modal>
                  <div
                    style={{
                      background: "#f5f5f5",
                      borderRadius: "5px",
                      padding: "10px",
                      height: "50%",
                    }}
                  >
                    <Button
                      onClick={close}
                      style={{ float: "right" }}
                      color="danger"
                    >
                      Close
                    </Button>
                    <h1>Rs-simulator</h1>
                    <i>We are a none profite organization</i>
                    <p></p>
                    <p>There is no update aveliable.</p>
                    <i>Update-version</i>
                    <p>2.0</p>
                    <i>Number of users</i>
                    <p>{data.users.length}</p>
                    <i>Founder</i>
                    <p>Tarik Selimovic</p>
                  </div>
                </Modal>
              </Col>
            </Row>
          </Jumbotron>
          <Col></Col>
        </Container>
      )}
    </React.Fragment>
  );
}
