import React from 'react'
import styled from 'styled-components';

export const ContainerDays = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  
`;

export const StyledDays = styled.div`
  flex: 1;
  text-align: left;
  /* height: 2rem; */
  padding: 0.2rem;
  padding-left: 0.5rem;
  margin: 0 1px;
  background-color: #f4e4e1;
  border-radius: 5px;
  font-size: 0.9rem;
`;

// 요일 div를 7개 만들 예정
// 그냥 div 7개 만들어서 해도 되었을거 같긴한데

const Days = () => {

  const days = [];
  const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // 7번 반복하면서 빈 배열안에 div 태그와 형태롤 만들어 넣어줌
  for (let i = 0; i < 7; i++) {
    days.push(
      <StyledDays className='col' key={i}>
        {date[i]}
      </StyledDays>
      // <div className='col' key={i}>{date[i]}</div>
    )
  }
  // console.log(days[0]) // 형태 확인

  return (
    <ContainerDays className='days row'>
      {days}
    </ContainerDays>
  )
}

export default Days