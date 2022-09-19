import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Days from './components/Days';
import DayCells from './components/DayCells';

function App() {

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  // 날짜를 클릭하면 선택된 날짜로 상태를 변경하는 핸들러
  const onDateClick = (day) => {
    setSelectedDate(day)
  }

  return (
    <div className="calendar">
      <div>
        <Header currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      </div>
      <div>
        <Days />
      </div>
      <div>
        <DayCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
        />
      </div>
    </div>
  );
}

export default App;
