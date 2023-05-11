import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material"
import UseAxios from "./hooks/UseAxios";
import Loader from "./Loader";

const Universal = (props) => {
  const { value1, setValue1, label1 } = props;
  const [data, loaded, error] = UseAxios("https://restcountries.com/v3.1/all");

  if(loaded) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={60}/>
      </Grid>
    )
  }

  const includedCurrencies = ["AUD", "BGN", "BRL", "CAD", "CHF", "USD"];
  const dataFilter = data && data.filter((item) => {
    const currencies = Object.keys(item?.currencies || {});
    return includedCurrencies.some((currency) => currencies.includes(currency));
  });

  const dataCountries = dataFilter?.map((item) => {
    return `${item.flag} ${Object.keys(item.currencies)[0]} - ${item.name.common}`;
  }) || [];

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value1}
        disableClearable
        onChange={(event, newValue) => {
          setValue1(newValue);
        }}
        options={dataCountries}
        renderInput={(params) => <TextField {...params} label={label1} />}
      />
    </Grid>
  )
}

export default Universal
