import React, {useState, useEffect} from "react";
import uuid from "react-uuid";
import styled from "styled-components";

const CarList = styled.div`
  text-align: center;
  padding-top: 3vh;
`

const DelButton = styled.button`
  background-color: white;
  color: black;
  border: 1px solid var(--light-gray);
  padding: 5px 20px;
  min-width: 50px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 200ms ease-out;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
  margin-left: 10px;

  &:active {
    box-shadow: 0 0px rgba(0, 0, 0, 0.2);
    transform: translateY(1px);
  }

  &:hover {
    opacity: 0.8;
  }

  //&:disabled {
  //  opacity: 0.4;
  //  cursor: disabled;
  //}
`;

const CarButton = styled.input`
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

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.4;
    cursor: disabled;
  }

  &:active {
    box-shadow: 0 0px rgba(0, 0, 0, 0.2);
    transform: translateY(1px);
  }
`;

const CarLabel = styled.label`
  display: none;
`;

const CarInput = styled.input`
  padding: 12px 10px;
  border-radius: 3px;
  border: 1px solid #83bd57;
  font-size: 16px;
  margin: 10px;
`;

export default function Car() {
    const id = uuid()
    const [cars, setCars] = useState(() => {
        const value = localStorage.getItem("cars")
        if (!value) {
            return []
        }
        return JSON.parse(value)
    })
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [validation, setValidation] = useState(true)

    useEffect(() => {
        localStorage.setItem("cars", JSON.stringify(cars))
    }, [cars])

    function handleFormSubmit(event) {
        if (name.length === 0 || number.length === 0) {
            setValidation(false)
            event.preventDefault()
            return
        }
        setCars([{id, name, number}, ...cars])
        setName("")
        setNumber("")
        setValidation(true)
        event.preventDefault()
    }

    function handleDeleteItem() {
        setCars(cars.slice(0, cars.length - 1))
    }

    const car_added = (
        <>
            <CarList>
                {cars.map((car) => (
                    <div key={uuid}>
                        <div className="item">
                            <div className="item-info">
                                <h3>Мой автомобиль</h3>
                                <p className="item-title">{car.name}</p>
                                <p className="item-desc">{car.number}</p>
                            </div>
                        </div>
                        <DelButton className="item-button" onClick={handleDeleteItem}>
                            Удалить
                        </DelButton>
                    </div>
                ))}
            </CarList>
        </>
    )

    const no_car = (
        <>
            <CarList>
                <h3>2. Введите данные о своем автомобиле: </h3>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <CarLabel htmlFor="name">Марка автомобиля: </CarLabel>
                        <CarInput
                            type="text"
                            placeholder="Tesla Model 3"
                            className="ui-textfield"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <CarLabel htmlFor="desc">Номер автомобиля: </CarLabel>
                        <CarInput
                            type="text"
                            placeholder="А111АА777"
                            className="ui-textfield"
                            name="desc"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div className="validation">
                        {validation ? "" : <p className="error">Заполните все поля</p>}
                    </div>
                    <div className="form-footer">
                        <CarButton type="submit" className="ui-button" value="Добавить"/>
                    </div>
                </form>
            </CarList>
        </>
    )

    if (cars.length > 0) {
        return car_added
    } else {
        return no_car
    }
}
