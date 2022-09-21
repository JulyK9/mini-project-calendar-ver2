import { addMonths, format, subMonths } from 'date-fns';
import React from 'react'
import { ImCircleLeft, ImCircleRight } from "react-icons/im";


const Header = ({ currentMonth, setCurrentMonth }) => {

  const handlePreMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  console.log(currentMonth);
  // console.log(format(currentMonth, 'M')) // 현재월 포맷으로 빼내기
  // console.log(format(currentMonth, "yyyy"));

  return (
    <div className="header row">
      <div className="col col-start">
        {/* 오늘이 속한 월 */}
        <div className="header-month">{format(currentMonth, "M")}월</div>
        {/* 오늘이 속한 년도 */}
        <div className="header-year">{format(currentMonth, "y")}</div>
      </div>
      <div className="col col-end">
        <div>
          <ImCircleLeft size={20} cursor="pointer" onClick={handlePreMonth} />
        </div>
        <div>
          <ImCircleRight size={20} cursor="pointer" onClick={handleNextMonth} />
        </div>
      </div>
    </div>
  );
};

export default Header