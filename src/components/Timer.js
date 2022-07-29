import React, {useState, useEffect} from "react"
import styled from "styled-components"

const TimerDiv = styled.div`
  text-align: center;
  padding-top: 3vh;
`

const TimerButton = styled.button`
  background-color: #83bd57;
  color: white;
  border: 0;
  padding: 15px 20px;
  min-width: 150px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 200ms ease-out;
  box-shadow: 10px 5px 5px #caf28d;
  margin: 10px;
`;

const TimerStartButton = styled.button`
  background-color: green;
  color: white;
  border: 0;
  padding: 15px 20px;
  min-width: 150px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 200ms ease-out;
  box-shadow: 10px 5px 5px #caf28d;
  margin: 10px;
`;

const TimerStopButton = styled.button`
  background-color: red;
  color: white;
  border: 0;
  padding: 15px 20px;
  min-width: 150px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 200ms ease-out;
  box-shadow: 10px 5px 5px #caf28d;
  margin: 10px;
`;

export default function Timer() {
    const fulltime = localStorage.getItem('fulltime')
    const fulltimeInt = Number.parseInt(fulltime)
    const [timekeeper, setTimekeeper] = useState(fulltimeInt)
    const [startstop, setStartstop] = useState(false)

    useEffect(() => {
        if (startstop) {
            const timerId = setTimeout(() => {
                setTimekeeper(prev => prev - 1)
            }, 1000)
            return () => {
                clearTimeout(timerId)
            }
        }
    })

    function rules() {
        setStartstop(prev => !prev)
        function z() {
            setTimekeeper(fulltimeInt)
            setStartstop(false)
        }
        setTimeout(z, 100)
    }

    function handleToggleClick() {
        setStartstop(prev => !prev)
        console.log('start')
    }

    function handleStopClick() {
        setTimekeeper(fulltimeInt)
        setStartstop(false)
        console.log('stop')
    }

    if (timekeeper === 0) {
        setTimekeeper(fulltimeInt)
        setStartstop(false)
    }

    return (
        <>
            <TimerDiv>
                <h3>4. Начните парковку:</h3>
                {!isNaN(timekeeper) && <h3>До полной зарядки осталось: {timekeeper} мин</h3>}
                <p>Для начала зарядки нажмите 2 раза кнопку "Заряжаем безопасно"</p>
                <div>
                    <p>Нажимая эту кнопку вы подтверждаете, что ознакомились с правилами безопасной зарядки. Подробную
                        инструкцию вы можете найти на нашем <a href="https://t.mos.ru/electro/instrukcii">сайте</a></p>
                    <TimerButton onClick={rules}>Заряжаем безопасно</TimerButton>
                </div>
                <div>
                    <TimerStartButton onClick={handleToggleClick}>Начать парковку / Пауза</TimerStartButton>
                </div>
                <div>
                    <TimerStopButton onClick={handleStopClick}>Завершить парковку</TimerStopButton>
                </div>

            </TimerDiv>
        </>
    )
}