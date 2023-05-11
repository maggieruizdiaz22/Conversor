import React, { createContext, useState } from 'react'

export const CurrencyContext = createContext(); //Crea un contexto

const CurrencyProvider = ({children}) => {
    const [divisa , setDivisa] = useState("Dolar");  
    const [firstAmount , setFirstAmount] = useState("");
    const [firstAmount1 , setFirstAmount1] = useState("");
    const [fromCurrency, setFromCurrency] = useState("🇺🇸 USD - United States");
    const [toCurrency, setToCurrency] = useState("🇦🇺 AUD - Australia");
   
    const value= {
        divisa,
        setDivisa,
        firstAmount,
        setFirstAmount,
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        firstAmount1, 
        setFirstAmount1
    };
  return (
    <CurrencyContext.Provider value={value}>
        {children}
        </CurrencyContext.Provider>
  )
}

export default CurrencyProvider
