import React, { useState } from "react";
import { Rect, Circle, Group } from "react-konva";

export default function In(props) {
  const handleDragEnd = (e) => {
    const x = e.target.attrs.x;
    const y = e.target.attrs.y;
    props.onChange(x, y);
  };

  const onClickRed = (e) => {
    console.log(e);
    const mouseX = e.target.parent.attrs.x + e.target.attrs.x;
    const mouseY = e.target.parent.attrs.y + e.target.attrs.y;
    const color = e.target.attrs.fill;
    if (!props.show) {
      props.onCircleClick(mouseX, mouseY, color);
    }
  };

  const onclickYellow = (e) => {
    const mouseX = e.target.parent.attrs.x + e.target.attrs.x;
    const mouseY = e.target.parent.attrs.y + e.target.attrs.y;
    const color = e.target.attrs.fill;
    if (!props.show) {
      props.onCircleClick(mouseX, mouseY, color);
    }
  };

  const onHandleDragMove = (e) => {
    console.log(e);
    const circle1 = {
      x: e.target.attrs.x + e.target.children[1].attrs.x,
      y: e.target.attrs.y + e.target.children[1].attrs.y,
      radius: e.target.children[1].attrs.radius,
    };
    const circle2 = {
      x: e.target.attrs.x + e.target.children[2].attrs.x,
      y: e.target.attrs.y + e.target.children[2].attrs.y,
      radius: e.target.children[2].attrs.radius,
    };
    props.changeLine(circle1, circle2);
  };

  return (
    <React.Fragment>
      <Group
        x={props.x}
        y={props.y}
        draggable={!props.show}
        onDragEnd={handleDragEnd}
        onDragMove={onHandleDragMove}
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
          x={100}
          y={75}
          width={20}
          height={20}
          fill="yellow"
          shadowBlur={5}
          onClick={onclickYellow}
        />
        <Circle
          x={50}
          y={75}
          width={20}
          height={20}
          fill="red"
          shadowBlur={5}
          onClick={onClickRed}
        />
      </Group>
    </React.Fragment>
  );
}
