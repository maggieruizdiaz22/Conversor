import { Autocomplete, Grid, Skeleton, TextField } from '@mui/material'
import React from 'react'
import UseAxios from './hooks/UseAxios'
import Loader from './Loader'

const SelectCountry = (props) => {
    const {value,setValue, label} = props 
    const [data,loaded,error] = UseAxios("https://www.dolarsi.com/api/api.php?type=valoresprincipales"); 

    if(loaded) {
    return(
        <Grid item xs={12} md={3}>
            <Skeleton  variant="rouded" height={60}/>
            </Grid>
            )}

   const dataFilter = data.filter((item) => "casa" in item && item.casa.nombre.indexOf("Dolar") !== -1);
   const dolars = dataFilter.map((item) => {
     return item.casa.nombre;
   });
   
  return (
    <Grid item xs={12} md={3}>
        <Autocomplete
        disableClearable
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          
        }}
        options={dolars} 
        renderInput={(params) => <TextField {...params}
        label={label}
        />}
        />
    </Grid>
  )
}

export default SelectCountry
