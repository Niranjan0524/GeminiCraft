import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { ChatContext } from "../store/chatContext";
import { useState } from "react";

const TitleComponent = ({ title }) => {

  
  return (
    <div className="flex items-center justify-between w-full">
      <span className="truncate">{title}</span>
      
    </div>
  );
};

export default TitleComponent;
