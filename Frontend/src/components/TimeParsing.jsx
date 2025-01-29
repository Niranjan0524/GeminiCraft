const TimeParsing = ({ startTime }) => { 

  const date = new Date(startTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const day = date.toLocaleString('default', { weekday: 'long' });
  const dayNumber = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();

  return (
    <div>
      <p className="text-blue-300 font-sans text-sm">{day}, {dayNumber}/{month}/{year}</p>
    </div>
  );
}

export default TimeParsing;