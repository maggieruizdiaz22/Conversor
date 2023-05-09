import { Box, Container, Grid, Tab, Typography, Tabs, Link } from '@mui/material'
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
const [conversionRate, setConversionRate] = useState(null); // Guardo los datos de la conversion
  const [error, setError] = useState(false);//manejar los errores de la api
  const [value, setValue] = useState(0);
  const [buyingRate, setBuyingRate] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const [chartData, setChartData] = useState(null);

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
          }; // Obtengo los tipos de dólares con precio de compra y venta
          return acc;
        }, {});
        setConversionRate(conversionRates); // Me guardo los datos obtenidos en el estado
        setError(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const startDate = '2019-01-01';
  //       const endDate = '2023-05-01';
  //       const baseCurrency = 'ARS';
  //       const targetCurrency = 'USD';
  //       const apiUrl = `https://api.exchangerate-api.com/v4/timeseries?start_date=${startDate}&end_date=${endDate}&base=${baseCurrency}&symbols=${targetCurrency}`;

  //       const response = await fetch(apiUrl);
  //       const data = await response.json();
        
  //       const rates = data.rates;
  //       const dates = Object.keys(rates);
  //       const exchangeRates = Object.values(rates).map((rate) => rate[targetCurrency]);
        
  //       const ctx = document.getElementById('dollarChart').getContext('2d');
  //       const chart = new Chart(ctx, {
  //         type: 'line',
  //         data: {
  //           labels: dates,
  //           datasets: [
  //             {
  //               label: 'Cotización del dólar en Argentina',
  //               data: exchangeRates,
  //               borderColor: 'rgb(255, 99, 132)',
  //               borderWidth: 2,
  //             },
  //           ],
  //         },
  //         options: {
  //           responsive: true,
  //           plugins: {
  //             legend: {
  //               position: 'top',
  //             },
  //             title: {
  //               display: true,
  //               text: 'Cotización del dólar en Argentina',
  //             },
  //           },
  //         },
  //       });

  //       setChart(chart);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
     
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

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


  useEffect(() => {
    if (conversionRate && fromCurrency) {
      const currencyCode = fromCurrency.split(" ")[1];
      const rate = conversionRate[currencyCode];
      if (rate) {
        const buyingRateValue = parseFloat(rate.compra.replace(",", "."));
        setBuyingRate(buyingRateValue);
      }
    }
  }, [conversionRate, fromCurrency]);

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
        sx={{
          '& .MuiTabs-indicator': styles.indicator,
        }}
      >
        <Tab
          label="Convetir"
          sx={{
            ...styles.tab,
            ...(value === 0 && styles.selectedTab),
          }}
        />
        <Tab
          label="Conversor Universal"
          sx={{
            ...styles.tab,
            ...(value === 1 && styles.selectedTab),
          }}
        />
      </Tabs>
      
    </Box>
    {value === 0 && (
        <div>
          <Typography variant='h5' sx={{marginBottom: "2rem",marginTop:"2rem" }}>Conversor Peso-Dolar</Typography>
          <Grid container spacing={2} sx={{ marginBottom:"20px",}} >
            <InoutAmount />
            <SelectCountry label="Divisa" value={divisa} setValue={setDivisa} />
          </Grid>
          {result !== null && (
            <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
              <Typography variant='h5' sx={{ marginTop: "5px", marginBottom:"15px", fontWeight: "bold", color:"gray" }}>{firstAmount} 🇺🇸 USD-United States =</Typography>
              <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{result} 🇦🇷  ARS - Argentina - {divisa}</Typography>
            </Box>
          )}
        </div>
      )}
      {value === 1 && (
        <div>
        <Typography variant='h5' sx={{marginBottom: "2rem",marginTop:"2rem" }}>Conversor Universal</Typography>
        <Grid container spacing={2} sx={{ marginBottom:"20px",}} >
          <InoutUniversal />
          <Universal  value1={fromCurrency} setValue1={setFromCurrency} label1="from" />
          <SwitchCurrency />
          <Universal  value1={toCurrency} setValue1={setToCurrency} label1="to" />
        </Grid>
        {firstAmount1 ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
          <Typography>{firstAmount1} {fromCurrency} =</Typography>
          <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{resultCurrency*firstAmount1} {toCurrency}</Typography>
        </Box>
      ) : ""}
      </div>
      )}
   

    </Container>
  )
}

export default App;