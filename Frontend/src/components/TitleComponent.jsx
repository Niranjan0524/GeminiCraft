import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { ChatContext } from "../store/ChatContext";
import { useState } from "react";
import TimeParsing from "./TimeParsing";

const TitleComponent = ({ title,startTime }) => {

  
  return (
    <div className=" items-center justify-between w-full">
      <span className="truncate">{title}</span>
      <TimeParsing startTime={startTime} />
      </div>
  );
};

export default TitleComponent;
