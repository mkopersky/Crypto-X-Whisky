import React, {useEffect, useState} from 'react'
import Header from './Header'
import './App.css'
import AssetsTable from './AssetsTable'
import fetching from './assets/fetching_data.gif'

const App = () => {

    const [USDprice, setUSDprice] = useState(null)
    const [BTCprice, setBTCprice] = useState(null)

    // Fetching USD -> PLN pair value

    useEffect(() => {
        fetch("https://api.nbp.pl/api/exchangerates/rates/a/usd?format=json")
            .then(response => response.json())
            .then(data => {
                setUSDprice(data.rates[0].mid)
                console.log(`Ustawiono kurs dolara - ${data.rates[0].mid}`)
            })
        .catch(err => {
            console.error("Nie można pobrać kursu dolara ze strony NBP. Error: ", err)
        })
    }, [])

    // Fetchning BTC -> USDT pair value

    useEffect(() => {
        fetch("https://api3.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
            .then(response => response.json())
            .then(data => {
                setBTCprice(data.price)
                console.log(`Ustawiono kurs bitcona - ${data.price}`)
            })
        .catch(err => {
            console.error("Nie można pobrać kursu bitcoina z Binance public API. Błąd: ", err)
        })
    }, [])
  
    return (
        <div>

            <Header btc={BTCprice} usd={USDprice} />

            {BTCprice && USDprice ? (
                <AssetsTable BTC={BTCprice} USD={USDprice}/>
            ):(
                <div className='text-center mt-5'>
                    <img src={fetching} alt="fethcing data from server" />
                    <p className='mt-4'>Fetching data from Binance...</p>
                </div>
            )}
           
        </div>
    )
  }

export default App