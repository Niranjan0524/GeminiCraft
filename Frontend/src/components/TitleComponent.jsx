import TimeParsing from "./TimeParsing";
import ReactMarkdown from 'react-markdown';

const TitleComponent = ({ title,startTime }) => {

  
  return (
    <div className=" items-center justify-between w-full max-w-[15rem]">
      <div className="truncate max-w-[12rem]">
        <ReactMarkdown>
          {title}
        </ReactMarkdown>
      </div>
      <TimeParsing startTime={startTime} />
    </div>
  );
};

export default TitleComponent;
