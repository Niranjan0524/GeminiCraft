import TimeParsing from "./TimeParsing";

const TitleComponent = ({ title,startTime }) => {

  
  return (
    <div className=" items-center justify-between w-full max-w-[15rem]">
      <div className="truncate max-w-[12rem]">{title}</div>
      <TimeParsing startTime={startTime} />
    </div>
  );
};

export default TitleComponent;
