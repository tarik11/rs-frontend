import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Group, Line } from "react-konva";
import In from "../components/In";
import And from "../components/And";
import Or from "../components/Or";
import ToolBar from "../components/ToolBar";
import { set } from "mongoose";
import { Button, Container, Row, Col } from "reactstrap";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

//funkcija za postavljanja komponente
export default function Comp(props) {
  var arrayIn = [];
  var arrayAnd = [];
  var arrayLine = [];
  var arrayOr = [];
  if (props.update === true) {
    arrayIn = props.arryIn;
    arrayAnd = props.arryAnd;
    arrayLine = props.arryLine;
    arrayOr = props.arryOr;
  }
  //niz and or in objekata
  const [arryIn, setArryIn] = useState(arrayIn);
  const [arryAnd, setArryAnd] = useState(arrayAnd);
  const [arryOr, setArryOr] = useState(arrayOr);
  const [projectName, setProjectName] = useState("");
  const history = useHistory();
  //niz linija
  const [line, setLine] = useState(arrayLine);

  const [point1, setPoint1] = useState(null);

  const changeName = (e) => {
    setProjectName(e.target.value);
  };

  //dodavanje linije ako su razlicite boje krugovi
  const onChangePoints = (x, y, color) => {
    if (!point1) {
      setPoint1({ x: x, y: y, color: color });
    } else {
      if (point1.color === color) {
        setPoint1(null);
      } else {
        const newElement = {
          x0: point1.x,
          y0: point1.y,
          x1: x,
          y1: y,
        };
        console.log(newElement);
        setLine((line) => [...line, newElement]);
        setPoint1(null);
      }
    }
  };

  //dodavanje u svaku od nizova respektivno
  const addToArry = (x, y) => {
    const newElement = { x: x, y: y };
    setArryIn((arryIn) => [...arryIn, newElement]);
  };

  const addToArryAnd = (x, y) => {
    const newElement = { x: x, y: y };
    setArryAnd((arryAnd) => [...arryAnd, newElement]);
    console.log(arryAnd);
  };

  const addToArryOr = (x, y) => {
    const newElement = { x: x, y: y };
    setArryOr((arryOr) => [...arryOr, newElement]);
  };

  //provjeravamo jesmoli kliknuli u krug
  const isInCircle = (circle_x, circle_y, rad, x, y) => {
    if (
      (x - circle_x) * (x - circle_x) + (y - circle_y) * (y - circle_y) <=
      rad * rad
    )
      return true;
    else return false;
  };

  //updajtam liniju prilikom pomjeranja
  const changeLine = (circle1, circle2) => {
    const newElement = {
      x0: circle1.x,
      y0: circle1.y,
      x1: circle2.x,
      y1: circle2.y,
    };
    setLine([...line, newElement]);

    const newLines = line;
    var number = 0;
    var number2 = 0;
    newLines.forEach((line) => {
      if (isInCircle(circle1.x, circle1.y, circle1.radius, line.x0, line.y0)) {
        line.x0 = circle1.x;
        line.y0 = circle1.y;
      }

      if (isInCircle(circle1.x, circle1.y, circle1.radius, line.x1, line.y1)) {
        line.x1 = circle1.x;
        line.y1 = circle1.y;
      }
      if (isInCircle(circle2.x, circle2.y, circle1.radius, line.x0, line.y0)) {
        line.x0 = circle2.x;
        line.y0 = circle2.y;
        number2++;
      }
      if (isInCircle(circle2.x, circle2.y, circle1.radius, line.x1, line.y1)) {
        line.x1 = circle2.x;
        line.y1 = circle2.y;
      }
    });
    setLine(newLines);
  };

  //brisanje linije kada se klikne na nju
  const deleteLineHandler = (e) => {
    const arrayPoints = e.target.attrs.points;
    const element = {
      x0: arrayPoints[0],
      y0: arrayPoints[1],
      x1: arrayPoints[2],
      y1: arrayPoints[3],
    };
    setLine(line.filter((e) => e.x0 !== element.x0 && e.y0 !== element.y0));
  };

  const deleteAll = (e) => {
    setArryIn([]);
    setArryOr([]);
    setArryAnd([]);
    setLine([]);
  };

  //spasavanje u bazu kada se klikne dugme
  const saveToDB = (e) => {
    e.preventDefault();

    var dbArryIn = [];
    var dbArryAnd = [];
    var dbArryLine = [];
    var dbArryOr = [];

    arryIn.forEach((e) => {
      dbArryIn.push(e.x);
      dbArryIn.push(e.y);
    });
    arryAnd.forEach((e) => {
      dbArryAnd.push(e.x);
      dbArryAnd.push(e.y);
    });
    line.forEach((e) => {
      dbArryLine.push(e.x0);
      dbArryLine.push(e.y0);
      dbArryLine.push(e.x1);
      dbArryLine.push(e.y1);
    });
    arryOr.forEach((e) => {
      dbArryOr.push(e.x);
      dbArryOr.push(e.y);
    });
    console.log(dbArryIn);
    const userId = localStorage.getItem("userId").toString();
    var requestBody = {
      query: `
            mutation{
                createProject(projectInput: {_id: "${userId}", name: "${projectName}",arryIn:${JSON.stringify(
        dbArryIn
      )}, arryOr:${JSON.stringify(dbArryOr)}, arryAnd:${JSON.stringify(
        dbArryAnd
      )}, arryNot:[5], arryLine:${JSON.stringify(dbArryLine)}}){
                 name
            }
      }
      `,
    };

    if (props.update) {
      var requestBody = {
        query: `
              mutation{
                  updateProject(projectInput: {_id: "${userId}", name: "${projectName}",arryIn:${JSON.stringify(
          dbArryIn
        )}, arryOr:${JSON.stringify(dbArryOr)}, arryAnd:${JSON.stringify(
          dbArryAnd
        )}, arryNot:[5], arryLine:${JSON.stringify(dbArryLine)}}, id: "${
          props._id
        }"){
                   name
              }
        }
        `,
      };
    }
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
    let path = `/projects`;
    history.push(path);
  };

  return (
    <React.Fragment>
      <Container>
        <form>
          <Row xs="3">
            <Col>
              {!props.update && (
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    onChange={changeName}
                    required
                  />
                </label>
              )}
            </Col>
            <Col>
              {!props.show && (
                <Button color="primary" type="submit" onClick={saveToDB}>
                  Save
                </Button>
              )}
            </Col>
            <Col>
              {!props.show && (
                <Button color="secondary" onClick={deleteAll}>
                  Delete
                </Button>
              )}
            </Col>
          </Row>
        </form>
      </Container>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        {!props.show && (
          <ToolBar
            onChange={addToArry}
            onChangeAnd={addToArryAnd}
            onChangeOr={addToArryOr}
          />
        )}

        <Layer>
          {arryIn.map((Ins) => (
            <In
              show={props.show}
              x={Ins.x}
              y={Ins.y}
              onChange={(x, y) => {
                Ins.x = x;
                Ins.y = y;
              }}
              onCircleClick={onChangePoints}
              changeLine={changeLine}
            />
          ))}

          {arryAnd.map((Ins) => (
            <And
              show={props.show}
              x={Ins.x}
              y={Ins.y}
              onChange={(x, y) => {
                Ins.x = x;
                Ins.y = y;
              }}
              onCircleClick={onChangePoints}
              changeLine={changeLine}
            />
          ))}

          {arryOr.map((Ins) => (
            <Or
              show={props.show}
              x={Ins.x}
              y={Ins.y}
              onChange={(x, y) => {
                Ins.x = x;
                Ins.y = y;
              }}
              onCircleClick={onChangePoints}
              changeLine={changeLine}
            />
          ))}

          {line.map((lines) => (
            <Line
              points={[lines.x0, lines.y0, lines.x1, lines.y1]}
              stroke="blue"
              strokeWidth={5}
              onClick={deleteLineHandler}
            />
          ))}
        </Layer>
      </Stage>
    </React.Fragment>
  );
}
