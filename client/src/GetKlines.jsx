import React, { useState, useEffect } from "react";
import { Chart } from "./Chart";
// import Mytest from "./MyTest";

const GetKlines = ({coin, interval}) => {
    const [klines, setKlines] = useState([])

    useEffect(() => {
        const fetchKlines = async () => {
            const limit = 150; // Amount of data received from Binance for a single currency pair

            try {
                const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${coin}USDT&interval=${interval}&limit=${limit}`);
                const data = await response.json();

                const formattedData = data.map(([time, open, high, low, close]) => ({
                    open: parseFloat(open),
                    high: parseFloat(high),
                    low: parseFloat(low),
                    close: parseFloat(close),
                    time: time/1000
                }))

                setKlines(formattedData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchKlines()
    }, [coin, interval])
    
    //                          DATA FOR TESTING PURPOSES
    // ---------------------------------------------------------------------------
    // const initialData = [
    //     { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
    //     { open: 9.55, high: 10.30, low: 9.42, close: 9.94, time: 1642514276 },
    //     { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
    //     { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
    //     { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 },
    //     { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
    //     { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 },
    //     { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 },
    //     { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 },
    //     { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
    // ];

    return (
        <div style={{width:'100%'}}>
            {/* <Mytest normal_data={klines}/> */}
            <Chart data={klines} />
        </div>
    )
};

export default GetKlines

//                  DATA RECEIVED FROM BINANCE API
// ---------------------------------------------------------------
// [ 
//     [
//         1655971200000,      // 0 - Kline open time
//         "0.01086000",       // 1 - Open price
//         "0.01086600",       // 2 - High price
//         "0.01083600",       // 3 - Low price
//         "0.01083800",       // 4 - Close price
//         "2290.53800000",    // 5 - Volume
//         1655974799999,      // 6 - Kline close time
//         "24.85074442",      // 7 - Quote asset volume
//         2283,               // 8 - Number of trades
//         "1171.64000000",    // 9 - Taker buy base asset volume
//         "12.71225884",      // 10 - Taker buy quote asset volume
//         "0"                 // 11 - Unused field, ignore
//     ],
//     [...],
//     [...]
// ]