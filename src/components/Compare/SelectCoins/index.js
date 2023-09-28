import React, { useEffect, useState } from 'react'
import { get100Coins } from './../../../functions/get100Coins';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./styles.css"

const SelectCoins = ({crypto1, crypto2, handleCoinChange}) => {
    
    const [allCoins , setAllCoins] = useState([]);

    const styles = {
        height: "2.5rem",
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
        },
        "& .MuiSvgIcon-root": {
            color: "var(--white)",
        },
        "&:hover": {
            "&& fieldset": {
               borderColor: "#3a80e9",     
            },                
        },        
    }


    useEffect(() => {
      getData();
    }, [])


    async function getData(){
      const myCoins = await get100Coins();
      setAllCoins(myCoins);
    }

  return (
    <div className='coins-flex'>
      <p>Crypto 1</p>
      <Select
      sx={styles}
      value={crypto1}
      label="Crypto 1"
      onChange={(event) => handleCoinChange(event, false)}
    >
      {console.log(crypto1)}
      {console.log(allCoins)}
      {allCoins.filter((item) => item.id != crypto2).map((coin) => {
        return <MenuItem key={coin.id} value={coin.id}>{coin.name}</MenuItem>
      })}
    </Select>
    <p>Crypto 2</p>
      <Select
      sx={styles}
      value={crypto2}
      label="Crypto 2"
      onChange={(event) => handleCoinChange(event, true)}
    >
      {console.log(crypto1)}
      {console.log(allCoins)}
      {allCoins.filter((item) => item.id != crypto1).map((coin) => {        
        return <MenuItem key={coin.id} value={coin.id}>{coin.name}</MenuItem>
      })}
    </Select>
    </div>
  )
}

export default SelectCoins