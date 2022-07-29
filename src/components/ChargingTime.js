import React, {useState} from "react"
import styled from "styled-components"

const ChargingTimeDiv = styled.div`
  text-align: center;
  padding-top: 3vh;
`

const ChargingTimeInput = styled.input`
  padding: 12px 10px;
  border-radius: 3px;
  border: 1px solid #83bd57;
  font-size: 16px;
  //margin: 10px;
`;

export default function ChargingTime() {
    const [percent, setPercent] = useState()
    const battery_kW = 75 // емкость батареи в кВт*ч
    const battary_voltage = 400 // напряжение батареи
    const battery_A = 1000 * (battery_kW / battary_voltage) // емкость батареи в А*ч
    const power = localStorage.getItem('power')
    const current = power / 500 * 1000

    function handleFormSubmit(e) {
        e.preventDefault()
    }

    const battery_A_balance = 1000 * ((percent * battery_kW / 100) / battary_voltage)
    const time_charge = 1.4 * (battery_A - battery_A_balance) / current

    const hours = parseInt(time_charge, 10)
    const min_fr = (time_charge % 1).toFixed(1)

    const min = min_fr * 60
    const fulltime = hours * 60 + min + ''
    localStorage.setItem('fulltime', fulltime)

    return (
        <>
            <ChargingTimeDiv>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <h3>3. Введите оставшийся заряд автомобиля в процентах: </h3>
                        <label htmlFor="name"/>
                        <ChargingTimeInput type="text" name="name" placeholder="100" value={percent}
                               onChange={e => setPercent(e.target.value)}/>
                    </div>
                </form>
                <div>
                    {(!isNaN(hours) && !isNaN(min)) && <p>Время для полной зарядки: {hours} ч {min} мин.</p>}
                </div>
            </ChargingTimeDiv>
        </>
    )
}