import { Box, Container, Grid, Tab, Typography, Tabs, useMediaQuery, useTheme } from '@mui/material'
import InoutAmount from './components/InoutAmount'
import SelectCountry from './components/SelectCountry'
import { useContext,useEffect } from 'react'
import { CurrencyContext } from './components/context/CurrencyContext'
import {useState} from 'react'
import axios from 'axios'
import Universal from './components/Universal'
import SwitchCurrency from './components/SwitchCurrency'
import InoutUniversal from './components/hooks/InoutUniversal'

function App() {
const {
  divisa,
  setDivisa,
  firstAmount,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  firstAmount1 , 
} = useContext(CurrencyContext)
  const [conversionRate, setConversionRate] = useState(null); 
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);
  const [buyingRate, setBuyingRate] = useState(null);
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
        );
        const data = response.data;
        const dataFilter = data.filter(
          (item) => "casa" in item && item.casa.compra
        ); // Obtengo solo los datos con precio de compra
        const conversionRates = dataFilter.reduce((acc, item) => {
          acc[item.casa.nombre] = {
            venta: item.casa.venta,
            compra: item.casa.compra,
          }; 
          return acc;
        }, {});
        setConversionRate(conversionRates); 
        setBuyingRate(conversionRates)
        setError(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if(firstAmount1) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: "H9v7MBlHJvS4xwjyAIFgnuaA1Z1lCQgBZ37SIKrM",
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(response => setResultCurrency(response.data.data[codeToCurrency]))
        .catch(error => console.log(error))
    }
  }, [firstAmount1, fromCurrency, toCurrency])


let result2 = null;
if (firstAmount && divisa && conversionRate) {
  const rate = parseFloat(conversionRate[divisa].compra.replace(",", "."));
  const amount = parseFloat(firstAmount);
  result2 = (amount * rate).toFixed(2);
}

  let result = null;
  if (firstAmount && divisa && conversionRate) {
    const rate = parseFloat(conversionRate[divisa].venta.replace(",", "."));
    const amount = parseFloat(firstAmount);
    result = (amount * rate).toFixed(2);
  }


  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
  };


  const styles = {
    tab: {
      padding: '10px 15px',
      minWidth: '120px',
      fontSize: '1rem',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      color: '#555',
      borderRadius: '4px 4px 0 0',
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: '#f2f2f2',
      },
    },
    selectedTab: {
      backgroundColor: '#f2f2f2',
    },
    indicator: {
      backgroundColor: '#0084ff',
      height: '4px',
      borderRadius: '4px',
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms, left 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  };
  
  return (
    <Container maxWidth="md" sx={boxStyles} >
 <Box sx={{ width: '100%', borderBottom: '1px solid #ddd', marginTop:"-3rem" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Custom tabs"
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={true}
        sx={{
          '& .MuiTabs-indicator': styles.indicator,
        }}
      >
        <Tab
          label="Convetir"
          sx={{
            ...styles.tab,
            ...(value === 0 && styles.selectedTab),
            maxWidth: isMobile ? "100%" : "none",
          }}
        />
        <Tab
          label="Conversor Universal"
          sx={{
            ...styles.tab,
            ...(value === 1 && styles.selectedTab),
            maxWidth: isMobile ? "100%" : "none",
          }}
         
        />
      </Tabs>
      
    </Box>
    {value === 0 && (
        <div>
          <Typography variant='h5' sx={{ marginBottom: "2rem", marginTop: "2rem", fontFamily: "Courier New, monospace"}}>
           Conversor Peso-Dolar
           </Typography>
          <Grid container spacing={2} sx={{ marginBottom:"20px",}} >
            <InoutAmount />
            <SelectCountry label="Divisa" value={divisa} setValue={setDivisa} />
          </Grid>
          {result !== null && (
    <Box sx={{ textAlign: "left", marginTop: "1rem", backgroundColor: "#f8f8f8", padding: "1.5rem", borderRadius: "10px" }}>
    <Typography variant="h5" sx={{ marginBottom: "1rem",color: "#333", fontFamily: "Courier New, monospace" }}>
      {firstAmount} 🇺🇸 USD-United States =
    </Typography>
    <Typography variant="h5" sx={{ marginBottom: "0.5rem", color: "#555", fontFamily: "Courier New, monospace"}}>
      🇦🇷  ARS - Argentina - {divisa}
    </Typography>
    <Typography variant="h5" sx={{ marginBottom: "0.5rem", fontFamily: "Courier New, monospace"}}>
      Venta: <span style={{ color: "#007bff" }}>$ {result}</span> 
    </Typography>
    <Typography variant="h5" sx={{fontFamily: "Courier New, monospace"}}>
      Compra: <span style={{ color: "#007bff", fontFamily: "Courier New, monospace"}}>$ {result2}</span> 
    </Typography>
  </Box> 
          )}
        </div>
      )}
      {value === 1 && (
        <div>
        <Typography variant='h5' sx={{marginBottom: "2rem",marginTop:"2rem", fontFamily: "Courier New, monospace" }}>Conversor Universal</Typography>
        <Grid container spacing={2} sx={{ marginBottom:"20px",}} >
          <InoutUniversal />
          <Universal  value1={fromCurrency} setValue1={setFromCurrency} label1="from" />
          <SwitchCurrency />
          <Universal  value1={toCurrency} setValue1={setToCurrency} label1="to" />
        </Grid>
        {firstAmount1 ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem", backgroundColor: "#f8f8f8", padding: "1.5rem", borderRadius: "10px" }}>
          <Typography variant='h5' sx={{ marginTop: "5px", fontFamily: "Courier New, monospace"}}>{firstAmount1} {fromCurrency} =</Typography>
          <Typography variant='h5' sx={{ marginTop: "5px", fontFamily: "Courier New, monospace"}}>{resultCurrency*firstAmount1} {toCurrency}</Typography>
        </Box>
      ) : ""}
      </div>
      )}
    </Container>
  )
}

export default App;
