import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";

interface ResizableProps {
  direction: "vertical" | "horizontal";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [width, setWidth] = useState<number>(window.innerWidth * 0.7);

  let resizableBoxProps: ResizableBoxProps;

  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = global.setTimeout(() => {
        setInnerWidth(window.innerWidth);

        if (width > window.innerWidth * 0.7) {
          setWidth(window.innerWidth * 0.7);
        }
      }, 100);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  if (direction === "horizontal") {
    resizableBoxProps = {
      width: width,
      height: Infinity,
      resizeHandles: ["e"],
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.8, Infinity],
      className: "resize-horizontal",
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableBoxProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
      minConstraints: [Infinity, 60],
      maxConstraints: [Infinity, 550],
    };
  }

  return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
