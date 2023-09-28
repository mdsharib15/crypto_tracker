import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from 'axios';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from './../functions/get100Coins';


const WatchList = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
//   const [paginatedCoins, setPaginatedCoins] = useState([]);
//   const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
//   const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    getData();

  }, [])


  const getData = async() => {
    setIsLoading(true);
    const myCoins = await get100Coins();
    if(myCoins){
    setCoins(myCoins);
    console.log("coins from watchlist", myCoins)
    // setPaginatedCoins(myCoins.slice(0, 10))
    filterHandler(myCoins);
    setIsLoading(false);
    }
  }

  


    const filterHandler = async(myCoins) => {
        const coinListString = JSON.parse(localStorage.getItem('coinList'));
        if(coinListString){
            console.log("coins", myCoins)
            const fCoins = myCoins.filter((coin) => coinListString.includes(coin.id));
    console.log("filtered coins", fCoins)
  setFilteredCoins(fCoins);

        }else {
            alert("no items found");
        }
    }
  


//   const handleLikeItem = (coinId) => {
//     if (!coinList.includes(coinId)) {
//       const updatedCoinList = [...coinList, coinId];
//       localStorage.setItem('coinList', JSON.stringify(updatedCoinList));
//       setCoinList(updatedCoinList);
//     } else {
//       alert('Coin ID already exists in the list.');
//     }
//   }




 

//   filter out from local storage
// const filterFromLocalStorage = () => {
//   const fCoins = coins.filter((coin) => coinList.includes(coin.id));
//     console.log("filtered coins", fCoins)
//   setFilteredCoins(fCoins);

// }

//   const [page, setPage] = useState(1);
//   const handlePageChange = (event, value) => {
//     setPage(value);
//     var previoudIndex = (value -1) *10;
//     setPaginatedCoins(coins.slice(previoudIndex, previoudIndex + 10))
//   };

//   const onSearchChange = (e) => {
//     setSearch(e.target.value)
//     console.log(e.target.value)
//   }

//   var filteredCoins = coins.filter((item) => 
//     item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase())
//   )

//   {console.log(filteredCoins)}
//   {console.log("api ", coins)}


 

  return (
    <>
    <Header />
    {isLoading ? <Loader /> 
    : <div>
        <TabsComponent coins={filteredCoins}/>        
    </div>
    }
    </>
    
  )
}

export default WatchList;