import { useEffect, useState } from 'react'
import axios from 'axios'

const UseAxios = (url) => {
    const [data, setData] = useState([]); //contiene la respuesta en JSON
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);//indica si la solicityd a finalizado  o no
    
useEffect(() =>{
    const fetchData = async () => {
        try {
            setLoaded(true);
            const response = await axios(url);
            setData(response.data)
        } catch (error) {
            setError(error);
        } finally{
setLoaded(false);
        }
    }
    fetchData()
},[url]);

  return [data,error,loaded] // retorno la data de la peticon entre otros
}

export default UseAxios