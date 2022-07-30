import React, {useLayoutEffect, useState} from "react"
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import parking_info from '../json_files/parking_info.json'
import styled from "styled-components"

const MapBox = styled.div`
  text-align: center;
  padding-top: 3vh;
`

const MapBoxSelect = styled.select`
  border: 0;
  padding: 15px 20px;
  min-width: 150px;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 200ms ease-out;
  box-shadow: 10px 5px 5px #83bd57;
  margin: 10px;
`

export default function useMapbox() {
    const [marker, setMarker] = useState()
    const [street, setStreet] = useState()
    const [power, setPower] = useState()

    // mapboxgl.accessToken = process.env.REACT_APP_API_KEY
    mapboxgl.accessToken = 'pk.eyJ1Ijoic29sb2tob3ZpciIsImEiOiJjbDVjb3Z1ZXYwMnkxM2NtcGJsa2J0anU3In0.kqn_ZMvi8CkRSTYz5lWFSQ'

    useLayoutEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: "mapbox://styles/mapbox/streets-v11",
            center: [37.61192, 55.76199],
            zoom: 10
        });
        const marker = new mapboxgl.Marker()
            .setLngLat([37.617589, 55.755919])
            .addTo(map);
        setMarker(marker);
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            })
        );
    }, []);


    const parking_zones = parking_info

    function handleSelect(event) {
        marker.setLngLat(parking_zones[event.target.value].coordinates)
        setStreet(parking_zones[event.target.value].street_name)
        setPower(parking_zones[event.target.value].power)
    }

    localStorage.setItem('power', power)

    return (
        <>
            <MapBox>
                <h3>1. Выберите парковку: </h3>
                <MapBoxSelect type="select" name="streets" onChange={handleSelect}>
                    <option value="zero">Выберите парковку: </option>
                    <option value="povarskaya_31">Поварская, 31</option>
                    <option value="gazetnyi_1">Газетный переулок, 1</option>
                    <option value="goncharnyi_20">Гончарная улица, 20с1</option>
                    <option value="chayanova_7">Чаянова, 7</option>
                    <option value="bol_pereyaslavskaya_17">Большая Переяславская, 17</option>
                    <option value="avyamotornaya_4">Авиамоторная, 4</option>
                    <option value="michurinskyi_21">Мичуринский проспект, 21к3</option>
                    <option value="shosse_ent_53">Шоссе Энтузиастов, 53</option>
                    <option value="alt_shosse_84">Алтуфьевское Шоссе, 84</option>
                </MapBoxSelect>
                <p>Выбранное место: {street}</p>
                <p>Мощность зарядной станции: {power} кВт</p>
            </MapBox>
        </>
    )
}