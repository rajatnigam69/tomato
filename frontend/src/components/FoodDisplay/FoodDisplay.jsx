import { food_list } from "../../assets/assets";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
import {  useState } from "react";

const FoodDisplay = ({ category }) => {
  const [query, setQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("Top dishes near you");
  const [filtered, setFiltered] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (!value) {
      setSearchMessage("Top dishes near you");
      setFiltered([]);
    } else {
      const filtered = food_list.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );

      if (filtered.length === 0) {
        setSearchMessage(`No Match Found`);
        setFiltered([]);
      } else {
        setSearchMessage(`${filtered.length} Search Results Found`);
        setFiltered(filtered);
      }
    }
  };

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-topbar">
        <h2
          style={{
            color: searchMessage === "Top dishes near you" ? "black" : "red",
          }}
        >
          {searchMessage}
        </h2>
        <div className="food-display-filter"></div>
        <form id="search-form" className="food-display-search">
          <input
            type="search"
            name="query"
            value={query}
            onChange={handleSearch}
            placeholder="Search Foods Here"
          />
        </form>
      </div>
      <div className="food-display-list">
        {filtered.length
          ? filtered.map((item, index) => {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  desc={item.desc}
                  image={item.image}
                  rating={item.rating}
                />
              );
            })
          : food_list.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    desc={item.description}
                    image={item.image}
                    rating={item.rating}
                  />
                );
              }
            })}
      </div>
    </div>
  );
};

export default FoodDisplay;
