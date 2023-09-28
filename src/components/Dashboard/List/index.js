import React, { useState, useEffect } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Tooltip } from "@mui/material";
import "./styles.css";
import { convertNumbers } from "./../../../functions/convertNumbers";
import { Link } from "react-router-dom";

const List = ({ coin }) => {
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
      {console.log("cin in list", coin)}
      <tr className="list-row">
        <Tooltip title="Coin image">
          <td className="td-image">
            <img src={coin.image} className="coin-logo" />
          </td>
        </Tooltip>
        <Tooltip title="coin symbol">
          <td>
            <div className="name-col">
              <p className="coin-symbol">{coin.symbol}</p>
              <p className="coin-name">{coin.name}</p>
            </div>
          </td>
        </Tooltip>
        <div onClick={handleClick}>
          {!coinList.includes(coin.id) ? (
            <StarBorderRoundedIcon />
          ) : (
            <StarRateRoundedIcon />
          )}
        </div>
        <Tooltip title="Price change">
          {coin.price_change_percentage_24h > 0 ? (
            <td className="chip-flex">
              <div className="price-chip">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="icon-chip td-icon">
                <TrendingUpRoundedIcon />
              </div>
            </td>
          ) : (
            <td className="chip-flex">
              <div className="price-chip chip-red">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="icon-chip chip-red td-icon">
                <TrendingDownRoundedIcon />
              </div>
            </td>
          )}
        </Tooltip>
        <Tooltip title="Price change">
          <td>
            <h3
              className="coin-price td-center-align"
              style={{
                color:
                  coin.price_change_percentage_24h < 0
                    ? "var(--red)"
                    : "var(--green)",
              }}
            >
              ${coin.current_price.toLocaleString()}
            </h3>
          </td>
        </Tooltip>
        <Tooltip title="Total volume">
          <td>
            <p className="total-volume td-right-align td-total-volume">
              {coin.total_volume.toLocaleString()}
            </p>
          </td>
        </Tooltip>
        <Tooltip title="Market Cap">
          <td className="desktop-td-mkt">
            <p className="total-volume td-right-align">
              ${coin.market_cap.toLocaleString()}
            </p>
          </td>
        </Tooltip>
        <Tooltip title="Market Cap">
          <td className="mobile-td-mkt">
            <p className="total-volume td-right-align">
              ${convertNumbers(coin.market_cap)}
            </p>
          </td>
        </Tooltip>
      </tr>
    </Link>
  );
};

export default List;
