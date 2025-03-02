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
