import React, { useState, useContext } from "react";
import { ListGroup, ListGroupItem, Container, Button } from "reactstrap";
import Component from "../pages/Comp";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";

import AuthContext from "../context/auth-contex";

export default function MyProjects() {
  //posavljanje konteksta kako bi se uzeo userID
  const [context, setContext] = useContext(AuthContext);
  var requestBody = gql`
  {
    projectsById(userId: "${context.userId}") {
      _id
      userId
      name
      ArrayIn
      ArrayOr
      ArrayAnd
      ArrayNot
      ArrayLine
    }
  }
`;

  const [objectArray, setObjectArray] = useState([]);
  const { loading, data } = useQuery(requestBody);
  const [buttonClick, setButtonClick] = useState(false);
  const history = useHistory();

  const toArray = (arry) => {
    var brojac = 0;
    var newArry = [];
    var newElment = {
      x: 0,
      y: 0,
    };
    for (var i = 0; i < arry.length; i++) {
      if (brojac === 2) {
        newArry.push(newElment);
        brojac = 0;
      } else if (brojac === 0) {
        newElment.x = arry[i];
        brojac = 1;
      } else {
        newElment.y = arry[i];
        brojac = 2;
      }
    }
    if (brojac === 2) {
      newArry.push(newElment);
      brojac = 0;
    }
    return newArry;
  };

  const toLineArray = (arry) => {
    var brojac = 0;
    var newArry = [];
    var newElment = {
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
    };

    for (var i = 0; i < arry.length; i++) {
      if (brojac === 4) {
        newArry.push(newElment);
        brojac = 0;
      } else if (brojac === 3) {
        newElment.y1 = arry[i];
        brojac = 4;
      } else if (brojac === 2) {
        newElment.x1 = arry[i];
        brojac = 3;
      } else if (brojac === 0) {
        newElment.x0 = arry[i];
        brojac = 1;
      } else {
        newElment.y0 = arry[i];
        brojac = 2;
      }
    }
    if (brojac === 4) {
      newArry.push(newElment);
      brojac = 0;
    }
    return newArry;
  };

  const onClick = () => {
    setButtonClick(!buttonClick);
    var newArry = [];
    var object = [];
    for (var i = 0; i < data.projectsById.length; i++) {
      newArry.push({ key: data.projectsById[i]._id, click: false });
      var newElment = {
        name: data.projectsById[i].name,
        _id: data.projectsById[i]._id,
        ArrayAnd: toArray(data.projectsById[i].ArrayAnd),
        ArrayIn: toArray(data.projectsById[i].ArrayIn),
        ArrayOr: toArray(data.projectsById[i].ArrayOr),
        ArrayLine: toLineArray(data.projectsById[i].ArrayLine),
      };
      object.push(newElment);
    }
    setObjectArray(object);
  };

  const postProject = (index) => {};

  return (
    <React.Fragment>
      {loading ? (
        "loading"
      ) : (
        <Container>
          <ListGroup>
            {data.projectsById.map((elemnt, index) => (
              <React.Fragment>
                <ListGroup>
                  <ListGroupItem color="primary">{elemnt.name}</ListGroupItem>
                  <ListGroupItem className="ml-5 ml-lg-0" color="primary">
                    <Button color="secondary" onClick={onClick}>
                      Edit
                    </Button>
                    {buttonClick && (
                      <Button
                        color="secondary"
                        onClick={() => {
                          const requestBody = {
                            query: `
                        mutation{
                          postProject(post:true, id: "${elemnt._id}"){
                            name
                          }
                        }
                        `,
                          };

                          fetch("http://localhost:8000/graphql", {
                            method: "POST",
                            body: JSON.stringify(requestBody),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          })
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => {
                              throw err;
                            });
                        }}
                      >
                        Post
                      </Button>
                    )}
                    {buttonClick && (
                      <Button
                        color="secondary"
                        onClick={() => {
                          const requestBody = {
                            query: `
                      mutation{
                        deleteProject(id: "${elemnt._id}"){
                          name
                        }
                      }
                      `,
                          };

                          fetch("http://localhost:8000/graphql", {
                            method: "POST",
                            body: JSON.stringify(requestBody),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          })
                            .then((res) => {
                              console.log(res);
                            })
                            .catch((err) => {
                              throw err;
                            });
                          window.location.reload(true);
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </ListGroupItem>
                  <br />
                </ListGroup>
                {buttonClick && (
                  <Component
                    update={true}
                    arryIn={objectArray[index].ArrayIn}
                    arryAnd={objectArray[index].ArrayAnd}
                    arryLine={objectArray[index].ArrayLine}
                    arryOr={objectArray[index].ArrayOr}
                    name={objectArray[index].name}
                    _id={objectArray[index]._id}
                  />
                )}
              </React.Fragment>
            ))}
          </ListGroup>
        </Container>
      )}
    </React.Fragment>
  );
}
