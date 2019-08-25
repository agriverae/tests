import React from "react";
import ReactDOM from "react-dom";
import data from "./data";
import {
  intersectionOfArrays,
  unionOfArrays,
  initObj,
  appendToKey,
  pipe,
  accumToKey
} from "./utils";

const splitMinMax = (array, splitSize) => {
  const arraySize = array.length;
  const priceRangeArray = [];
  let temp;

  for (let i = 0; i < arraySize; i++) {
    if (i % splitSize === 0) {
      temp = {
        ids: []
      };
      temp.min = array[i].price;
      temp.ids.push(array[i].id);
    } else if ((i + 1) % splitSize === 0 || i === arraySize - 1) {
      temp.max = array[i].price;
      temp.ids.push(array[i].id);
      priceRangeArray.push(temp);
    } else {
      temp.ids.push(array[i].id);
    }
  }
  return priceRangeArray;
};

const Filtros = () => {
  const filtrosInit = initObj([
    "starsRating",
    "tripadvisorRating",
    "hotelType",
    "cheaperRoomMealplan",
    "discount"
  ]);

  const filtros = data.reduce((obj, hotel) => {
    return pipe(
      appendToKey("starsRating", hotel.starsRating, hotel.id),
      appendToKey(
        "tripadvisorRating",
        hotel.tripadvisorRating.rating,
        hotel.id
      ),
      appendToKey("hotelType", hotel.hotelType, hotel.id),
      appendToKey("cheaperRoomMealplan", hotel.cheaperRoomMealplan, hotel.id),
      appendToKey(
        "discount",
        hotel.discountPercent !== 0 ? "discount" : "no discount",
        hotel.id
      ),
      accumToKey("price", {
        price: hotel.cheaperRoom[0].pricePerNight,
        id: hotel.id
      })
    )(obj);
  }, filtrosInit);

  console.log(filtros);

  const priceOrder = filtros.price.sort((a, b) => a.price - b.price);
  filtros.price = splitMinMax(priceOrder, 10);

  const unionComidas = unionOfArrays(
    filtros.cheaperRoomMealplan["Solo Hospedaje"],
    filtros.cheaperRoomMealplan["Desayuno buffet"]
  );
  const unionStars = unionOfArrays(
    filtros.starsRating["4"],
    filtros.starsRating["5"]
  );
  const unionTripadvisor = unionOfArrays(filtros.tripadvisorRating["4"]);
  const final = intersectionOfArrays(
    unionComidas,
    unionStars,
    unionTripadvisor
  );

  console.log(final);

  return <div>Hola</div>;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Filtros />, rootElement);
