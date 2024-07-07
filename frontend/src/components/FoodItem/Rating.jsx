import React from "react";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

const Rating = (props) => {
  let full = Math.min(Math.floor(props.rating), 5);
  let half = props.rating - full > 0 ? 1 : 0;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (full) {
      full--;
      return <FaStar key={index} />;
    } else if (half) {
      half--;
      return <FaRegStarHalfStroke key={index} />;
    } else {
      return <FaRegStar key={index} />;
    }
  });

  return <div>{stars}</div>;
};

export default Rating;
