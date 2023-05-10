import { Grid, InputAdornment, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { CurrencyContext } from './context/CurrencyContext'

const InoutAmount = () => {
  const {firstAmount, setFirstAmount} = useContext(CurrencyContext); //Esto viene de CurrencyContext
  return (
    <Grid item xs={12} md>
        <TextField
        value={firstAmount}
        onChange={e=>setFirstAmount(e.target.value)}
        label= "Monto en USD"
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