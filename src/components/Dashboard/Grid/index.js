import React, { useEffect, useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Link } from "react-router-dom";

const Grid = ({ coin }) => {
  const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    const coinListString = localStorage.getItem("coinList");
    if (coinListString) {
      setCoinList(JSON.parse(coinListString));
    }
  }, []);

  const handleLikeItem = (coinId) => {
    console.log("coinId from like", coinId);

    const coinListString = localStorage.getItem("coinList");
    console.log("ls coin list", coinListString);
    if (coinListString) {
      const newData = JSON.parse(coinListString);
      newData.push(coinId);
      localStorage.setItem("coinList", JSON.stringify(newData));
      setCoinList(newData);
    } else {
      const arr = [];
      arr.push(coinId);
      localStorage.setItem("coinList", JSON.stringify(arr));
      setCoinList(arr);
    }
  };

  const handleRemoveItem = (coinId) => {
    console.log("coinId from unlike", coinId);

    const coinListString = localStorage.getItem("coinList");
    console.log("ls coin list", coinListString);
    if (coinListString) {
      const newData = JSON.parse(coinListString);
      const filteredData = newData.filter((coin) => coin !== coinId);
      localStorage.setItem("coinList", JSON.stringify(filteredData));
      setCoinList(filteredData);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!coinList.includes(coin.id)) {
      handleLikeItem(coin.id);
    } else {
      handleRemoveItem(coin.id);
    }
  };

  return (
    <Link to={`/coin/${coin.id}`}>
      <div
        className={`grid-container ${
          coin.price_change_percentage_24h < 0 && "grid-container-red"
        }`}
      >
        <div className="info-flex">
          <img src={coin.image} className="coin-logo" />
          <div className="name-col">
            <p className="coin-symbol">{coin.symbol}</p>
            <p className="coin-name">{coin.name}</p>
          </div>
          <div onClick={handleClick}>
            {!coinList.includes(coin.id) ? (
              <StarBorderRoundedIcon />
            ) : (
              <StarRateRoundedIcon />
            )}
          </div>
        </div>
        {coin.price_change_percentage_24h > 0 ? (
          <div className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip">
              <TrendingUpRoundedIcon />
            </div>
          </div>
        ) : (
          <div className="chip-flex">
            <div className="price-chip chip-red">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip chip-red">
              <TrendingDownRoundedIcon />
            </div>
          </div>
        )}
        <div className="info-container">
          <h3
            className="coin-price"
            style={{
              color:
                coin.price_change_percentage_24h < 0
                  ? "var(--red)"
                  : "var(--green)",
            }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
          <p className="total-volume">
            Total Volume : {coin.total_volume.toLocaleString()}
          </p>
          <p className="total-volume">
            Market Cap : ${coin.market_cap.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Grid;
