import React, { useState, useContext } from "react";
import { ListGroup, ListGroupItem, Container, Button } from "reactstrap";
import Component from "../pages/Comp";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";

// upit da dobije sve projet koji su objavljeni
var requestBody = gql`
  {
    projectsByPost {
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
export default function MyProjects() {
  const [objectArray, setObjectArray] = useState([]);
  //upit iz baze
  const { loading, data } = useQuery(requestBody);
  const [buttonClick, setButtonClick] = useState(false);
  const history = useHistory();

  //funkcije potrebne za pretvaranje objekata dobivenih iz baze
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
  //------------

  // transformisanje objekata kad se klikne Edit
  const onClick = () => {
    setButtonClick(!buttonClick);
    var newArry = [];
    var object = [];
    for (var i = 0; i < data.projectsByPost.length; i++) {
      newArry.push({ key: data.projectsByPost[i]._id, click: false });
      var newElment = {
        name: data.projectsByPost[i].name,
        _id: data.projectsByPost[i]._id,
        ArrayAnd: toArray(data.projectsByPost[i].ArrayAnd),
        ArrayIn: toArray(data.projectsByPost[i].ArrayIn),
        ArrayOr: toArray(data.projectsByPost[i].ArrayOr),
        ArrayLine: toLineArray(data.projectsByPost[i].ArrayLine),
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
            {data.projectsByPost.map((elemnt, index) => (
              <React.Fragment>
                <ListGroup>
                  <ListGroupItem color="primary">{elemnt.name}</ListGroupItem>
                  <ListGroupItem className="ml-5 ml-lg-0" color="primary">
                    <Button color="secondary" onClick={onClick}>
                      Show
                    </Button>
                  </ListGroupItem>
                  <br />
                </ListGroup>
                {buttonClick && (
                  <Component
                    update={true}
                    show={true}
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
