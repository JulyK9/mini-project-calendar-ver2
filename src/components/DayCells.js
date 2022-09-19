import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns"
import { isSameMonth, isSameDay, addDays, parse, format } from "date-fns";
import styled from "styled-components";

export const ContainerCells = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* gap: 1rem; */
  align-items: space-around;
`;

export const Rows = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Cells = styled.div`
  flex: 1;
  display: flex;
  height: 5rem;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.4rem;
  margin: 0.2rem;
  padding-left: 0.5rem;
  border-radius: 5px;
  border: 0.1px solid rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;

  &.disabled {
    background-color: rgba(175, 158, 169, 0.5);
  }

  &.today {
    background-color: rgba(168, 187, 225, 0.5);
  }

  &.selected {
    transform: scale(1.02);
    border: 0.1px solid rgba(190, 166, 161, 0.7);
    background: rgba(190, 166, 161, 0.5);
    color: #6f5955;
    font-weight: 500;
  }
`;

export const NumbersInCell = styled.div`

`

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
        <Cells
          className={`col cell ${
            !isSameMonth(day, monthStart) // 생성한 날짜가 현재월이 아닌가?
              ? "disabled" // => 아니면 disabled 클래스네임 적용
              : isSameDay(day, new Date()) // 오늘 날짜이면?
              ? "today" // today 클레스네임 적용
              : isSameDay(day, selectedDate) // 오늘날짜 아니고, 생성한 날짜가 현재월이고 => 클릭한 일자이면(클릭한 날짜가 현재월이면)
              ? "selected" // => 클랙한 날짜가 현재월이면 selected 클래스네임 적용
              : format(currentMonth, "M") !== format(day, "M") // 시작일의 월과 선택일의 월이 같지 않은가?
              ? 'not-valid' // 같지 않으면 not-valid 클래스 네임 적용
              : 'valid' // 같으면 valid 클래스 네임 적용
              
            }`}
          key={day}
          // onClick={() => onDateClick(parse(cloneDay))} // parse 는 왜??? 전달인자 수도 부족해서 경고메시지 뜸
          onClick={() => onDateClick(cloneDay)} // 날짜셀을 클릭하면 클릭된 셀의 상태가 되는 핸들러인 onDateClick을 onClick 적용  // parse 없애니 일단 오류 안뜨고 정상 작동
        >
          <NumbersInCell
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''
            }>
            {formattedDate}
          </NumbersInCell>
        </Cells>
      );
      day = addDays(day, 1)
    }
    rows.push(
      <Rows className="row" key={day}>
        {days}
      </Rows>
    )
    days = [];
  }

  return (
    <ContainerCells className="body">{rows}</ContainerCells>
  )
}

export default DayCells