import React, { useEffect, useState } from "react";
import { coinObject } from "./../functions/convertObject";
import Header from "./../components/Common/Header/index";
import Loader from "./../components/Common/Loader/index";
import List from "../components/Dashboard/List";
import { useParams } from "react-router-dom";
import axios from "axios";
import CoinInfo from "./../components/Coin/CoinInfo/index";
import { getCoinData } from './../functions/getCoinData';
import { getCoinPrices } from './../functions/getCoinPrices';
import { convertDate } from './../functions/convertDate';
import LineChart from "./../components/Coin/LineChart/lineChart";
import SelectDays from './../components/Coin/SelectDays/index';
import { settingChartData } from './../functions/settingChartData';
import PriceType from './../components/Coin/PriceType/index';

const CoinPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState(true);
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState('prices');

  useEffect(() => {
    
    if (id) {
      getData();
    }
  }, [id]);


  async function getData() {
    const data = await getCoinData(id);
    if(data){
      coinObject(setCoinData, data);
      const prices = await getCoinPrices(id, days, priceType);
      if(prices.length > 0){
        settingChartData(setChartData, prices)
        setIsLoading(false);
      }
    }
  }



  const handleDaysChange = async(event) => {
    setIsLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, priceType);
      if(prices.length > 0){
        settingChartData(setChartData, prices)
        setIsLoading(false);
      }
    
  };



  const handlePriceTypeChange = async(event, newType) => {
    setPriceType(newType);
    setIsLoading(true);
    const prices = await getCoinPrices(id, days, newType);
      if(prices.length > 0){
        settingChartData(setChartData, prices)
        setIsLoading(false);
      }
  };

  

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper" style={{padding: "0rem 1rem"}}>
            <List coin={coinData} />
          </div>
          <div className="grey-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange}/>
            <PriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
            <LineChart chartData={chartData} priceType={priceType}/>
          </div>
          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  );
};

export default CoinPage;
