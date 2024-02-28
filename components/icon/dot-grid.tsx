// source: https://gist.github.com/fabe/d0a38b7a5df64f20b2f899aeb5722054
import React from "react";

const DotGrid = ({
  width = 10,
  height = 10,
  space = 10,
  radius = 1.5,
  fill = "currentColor",
  className = "",
}) => {
  const viewWidth = width * radius * 2 + (width - 1) * (space - radius * 2);
  const viewHeight = height * radius * 2 + (height - 1) * (space - radius * 2);
  let dots = [];

  for (let indexWidth = 0; indexWidth < width; indexWidth++) {
    for (let indexHeight = 0; indexHeight < height; indexHeight++) {
      dots.push(
        <circle
          key={`${indexWidth}-${indexHeight}`}
          cx={radius + indexWidth * space}
          cy={radius + indexHeight * space}
          r={radius}
        />
      );
    }
  }

  return (
    <svg
      width={"100%"}
      height={"100%"}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      version='1.1'
      className={className}
    >
      <g fill={fill}>{dots}</g>
    </svg>
  );
};

export default DotGrid;
