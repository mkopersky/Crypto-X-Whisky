import { useState, useEffect } from "react"
import AssetsTableRow from "./AssetsTableRow"
import fetching from './assets/fetching_data.gif'

const AssetsTable = (props) => {

    const [serverData, setServerData] = useState(null)
    const [totalBTC, setTotalBTC] = useState(null)

    const BTCprice = props.BTC
    const USDprice = props.USD

    useEffect(() => {

        const fetchAssets = () => {
            fetch('http://localhost:5000/api')
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        console.error(`Nie pobrano danych z serwera Binance. Błąd: `, data.error)
                    } else {
                        setServerData(data)
                        const BTC = data.reduce((sum, coin) => parseFloat(sum) + parseFloat(coin.btcValuation), 0)
                        setTotalBTC(BTC)
                        console.log("Pobrano dane aktywów z Binance")
                    }
                })
            .catch(err => {
                console.error('Błąd pobierania danych', err)
            })  
        }
        
        fetchAssets()
        
    }, [])

    return (
        <div>

            {serverData && serverData.length > 0 ? (
                <>
                    {/* <pre>{JSON.stringify(serverData, null, 2)}</pre> */}
                    
                    <div className="container">

                        <div className="row mb-4 mt-5">
                            <p className="col p-3 m-3 summary">{totalBTC.toFixed(8)} ₿</p>
                            <p className="col p-3 m-3 summary">{(totalBTC*BTCprice).toFixed(2)} $</p>
                            <p className="col p-3 m-3 summary">{(totalBTC*BTCprice*USDprice).toFixed(2)} zł</p>
                        </div>

                        <p className='row assets--table-header'>
                            <span className='col-2 p-2'>KRYPTO</span>
                            <span className='col-2 p-2'>ILOŚĆ</span>
                            <span className='col-2 p-2'>BTC</span>
                            <span className='col-2 p-2'>USD</span>
                            <span className='col-1 p-2'>PLN</span>
                            <span className='col-3 p-2'>WYKRES</span>
                        </p>

                        {serverData.map((coin, i)=> (
                            <AssetsTableRow key={i} coin={coin} BTCprice={BTCprice} USDprice={USDprice}/>
                        ))}
                    </div>

                </>
            ) : (
                (
                    <div className='text-center mt-5'>
                        <img src={fetching} alt="fethcing data from server" />
                        <p className='mt-4'>Loading assets from localhost:5000/api</p>
                    </div>
                )
            )}
        </div>
    )

}

export default AssetsTable
