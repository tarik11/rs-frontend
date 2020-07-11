import React, { useState, useRef } from "react";
import { Stage, Layer, Rect, Circle, Group, Text, Image } from "react-konva";
import and from "../images/and.png";
import or from "../images/or.png";
import { set } from "mongoose";
import useImage from "use-image";

export default function In(props) {
  const refIn = useRef(null);
  const refGroup = useRef(null);
  const refGroupAnd = useRef(null);
  const refGroupOr = useRef(null);

  const [image] = useImage(and);
  const [imageOr] = useImage(or);

  const [koordinates, setKoordinates] = useState({ x: 50, y: 50 });
  const [koordinatesAnd, setKoordinatesAnd] = useState({ x: 50, y: 150 });
  const [koordinatesOr, setKoordinatesOr] = useState({ x: 50, y: 250 });

  const handleDragEnd = (e) => {
    const x = e.target.attrs.x;
    const y = e.target.attrs.y;

    refGroup.current.position({ x: 50, y: 50 });
    refIn.current.draw();
    props.onChange(x, y);
  };

  const handleDragEndAnd = (e) => {
    const x = e.target.attrs.x;
    const y = e.target.attrs.y;

    refGroupAnd.current.position({ x: 50, y: 150 });
    refIn.current.draw();
    props.onChangeAnd(x, y);
  };

  const handleDragEndOr = (e) => {
    const x = e.target.attrs.x;
    const y = e.target.attrs.y;

    refGroupOr.current.position({ x: 50, y: 250 });
    refIn.current.draw();
    props.onChangeOr(x, y);
  };

  return (
    <React.Fragment>
      <Layer ref={refIn}>
        <Group x={50} y={50}>
          <Rect
            x={50}
            y={50}
            width={50}
            height={50}
            fill="black"
            shadowBlur={5}
          ></Rect>
          <Circle
            x={50}
            y={75}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Circle
            x={100}
            y={75}
            width={20}
            height={20}
            fill="yellow"
            shadowBlur={5}
          />
          <Text
            fontSize={20}
            text="In"
            wrap="char"
            align="center"
            x={70}
            y={110}
          />
        </Group>
        <Group
          ref={refGroup}
          x={koordinates.x}
          y={koordinates.y}
          draggable
          onDragEnd={handleDragEnd}
        >
          <Rect
            x={50}
            y={50}
            width={50}
            height={50}
            fill="black"
            shadowBlur={5}
          ></Rect>
          <Circle
            x={50}
            y={75}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Circle
            x={100}
            y={75}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
        </Group>

        <Group x={50} y={150}>
          <Rect
            x={50}
            y={50}
            width={50}
            height={50}
            fill="yellow"
            shadowBlur={5}
          ></Rect>
          <Circle
            x={50}
            y={65}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Circle
            x={50}
            y={85}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Circle
            x={100}
            y={75}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Image image={image} x={50} y={55} width={50} height={40}></Image>
          <Text
            fontSize={20}
            text="And"
            wrap="char"
            align="center"
            x={60}
            y={110}
          />
        </Group>
        <Group
          ref={refGroupAnd}
          x={koordinatesAnd.x}
          y={koordinatesAnd.y}
          draggable
          onDragEnd={handleDragEndAnd}
        >
          <Rect
            x={50}
            y={50}
            width={50}
            height={50}
            fill="yellow"
            shadowBlur={5}
          ></Rect>
          <Circle
            x={50}
            y={85}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Circle
            x={50}
            y={65}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Circle
            x={100}
            y={75}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />

          <Image image={image} x={50} y={55} width={50} height={40}></Image>
        </Group>
        <Group x={50} y={250}>
          <Rect
            x={50}
            y={50}
            width={50}
            height={50}
            fill="yellow"
            shadowBlur={5}
          ></Rect>
          <Circle
            x={50}
            y={65}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Circle
            x={50}
            y={85}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Circle
            x={100}
            y={75}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Image image={imageOr} x={50} y={55} width={50} height={40}></Image>
          <Text
            fontSize={20}
            text="Or"
            wrap="char"
            align="center"
            x={65}
            y={110}
          />
        </Group>
        <Group
          ref={refGroupOr}
          x={koordinatesOr.x}
          y={koordinatesOr.y}
          draggable
          onDragEnd={handleDragEndOr}
        >
          <Rect
            x={50}
            y={50}
            width={50}
            height={50}
            fill="yellow"
            shadowBlur={5}
          ></Rect>
          <Circle
            x={50}
            y={85}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Circle
            x={50}
            y={65}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />
          <Circle
            x={100}
            y={75}
            width={20}
            height={20}
            fill="red"
            shadowBlur={5}
          />

          <Image image={imageOr} x={50} y={55} width={50} height={40}></Image>
        </Group>
      </Layer>
    </React.Fragment>
  );
}
