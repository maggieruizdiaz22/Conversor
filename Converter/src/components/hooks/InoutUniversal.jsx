import { Grid, InputAdornment, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { CurrencyContext } from '../context/CurrencyContext';
const InoutAmount = () => {
  const {firstAmount1, setFirstAmount1} = useContext(CurrencyContext); //Esto viene de CurrencyContext

  return (
    <Grid item xs={12} md>
        <TextField
        value={firstAmount1}
        onChange={e=>setFirstAmount1(e.target.value)}
        label= "Monto"
        fullWidth
        InputProps={{
            type: "number",
            startAdornment: <InputAdornment position="start">$</InputAdornment>
        }}
         />
    </Grid>
  )
}

export default InoutAmount