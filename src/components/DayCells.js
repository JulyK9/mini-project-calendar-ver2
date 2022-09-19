import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns"
import { isSameMonth, isSameDay, addDays, parse, format } from "date-fns";

const DayCells = ({ currentMonth, selectedDate, onDateClick }) => {

  const monthStart = startOfMonth(currentMonth) // 현재월의 첫 시작일
  const monthEnd = endOfMonth(monthStart) // 그 달의 마지막일
  // const monthEnd2 = endOfMonth(currentMonth); // 이렇게 해도 위와 같음
  const startDate = startOfWeek(monthStart) // 현재월이 시작하는 주의 첫 날짜
  const endDate = endOfWeek(monthEnd) // 현재월이 끝나는 주의 마지막 날짜

  // console.log(monthStart);
  // console.log("monthStart: ", monthEnd);
  // console.log("currentMonth: ", monthEnd2);
  // console.log(startDate)
  // console.log(endDate)

  const rows = [];  // (일 ~ 토) 한주 * 4주 또는 5주
  let days = [];  // (일 ~ 토) 한주
  let day = startDate;
  let formattedDate = '';
  // console.log(format(currentMonth, "M"));
  // console.log(format(day, "M"));

  // 현재월의 박스를 만드는 시작일자가 박스의 끝을 만드는 마지막 일자가 될때까지 반복되고 커지면 종료됨
  while (day <= endDate) {
    // 7번씩 반복하면서 한 주를 만듦 => day를 1씩 올려주며 날짜를 추가
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd'); // 1 ~ 31
      // console.log(formattedDate); // 그 달에 있는 달력 박스의 날짜가 모두 출력됨 (9월달력의) (8.)28 ~ (10.)1 
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart) // 시작일이 현재월이 아닌가?
              ? "disabled" // => 아니면 disabled 클래스네임 적용
              : isSameDay(day, selectedDate) // 시작일이 현재월이면 => 시작일이 선택된 일자와 같은가?
              ? "selected" // => selected 클래스네임 적용
              : format(currentMonth, "M") !== format(day, "M") // 시작일의 월과 선택일의 월이 같지 않은가?
              ? 'not-valid' // 같지 않으면 not-valid 클래스 네임 적용
              : 'valid' // 같으면 valid 클래스 네임 적용
            }`}
          key={day}
          // onClick={() => onDateClick(parse(cloneDay))} // parse 는 왜??? 전달인자 수도 부족해서 경고메시지 뜸
          onClick={() => onDateClick(cloneDay)} // parse 없애니 일단 오류 안뜨고 정상 작동
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''
            }>
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1)
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    )
    days = [];
  }

  return (
    <div className="body">{rows}</div>
  )
}

export default DayCells