import React, { useState } from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./styles.css"
export default function PriceType({priceType, handlePriceTypeChange}) {


  return (
    <div className='toggle-prices'>
    <ToggleButtonGroup
      value={priceType}
      exclusive
      onChange={handlePriceTypeChange}
      sx={{
        
        "&.Mui-Selected": {
            color: "var(--blue) !important",
        },
        borderColor: "var(--blue)",
        border: "unset !important",
        "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid !important",
            borderColor: "unset",
            color: "var(--blue)"
        },
        "& .MuiToggleButton-standard": {
            color: "var(--blue)",
        }     
    }}
      aria-label="text alignment"
    >
      <ToggleButton value="prices" className='toggle-btn'>
        Price
      </ToggleButton>
      <ToggleButton value="market_caps"  className='toggle-btn'>
        Market Cap
      </ToggleButton>
      <ToggleButton value="total_volumes" className='toggle-btn' >
        Total Volumes
      </ToggleButton>
    </ToggleButtonGroup>
    </div>
  );
}