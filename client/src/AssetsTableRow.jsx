import { useState } from "react"
import GetKlines from "./GetKlines"
    
const AssetsTableRow = ({coin, BTCprice, USDprice}) => {

    const [showKlines, setShowKlines] = useState(false)
    const [intervalValue, setIntervalValue] = useState()

    const showChartSubmit = (event) => {
        event.preventDefault()
        const interval = event.target.elements.interval.value
        setIntervalValue(interval)
        console.log(`Poberam wykres dla ${coin.asset} z intervalem ${interval}`)
        setShowKlines(true)
    }

    return (
        <>
        <div className='d-flex flex-row align-items-center assets--table-row'>
            <span className='col-2 p-1'>{coin.asset}</span>
            <span className='col-2 p-1'>{coin.free}</span>
            <span className='col-2 p-1'>{coin.btcValuation} ₿</span>
            <span className='col-2 p-1'>$ {parseFloat((BTCprice*coin.btcValuation).toFixed(2))}</span>
            <span className='col-1 p-1'>{parseFloat((BTCprice*coin.btcValuation*USDprice).toFixed(2))} zł</span>
            <form className='col-3 p-1 showChart' onSubmit={showChartSubmit}>
                <select name="interval" className="interval">
                    <option value="1s">1s</option>
                    <option value="1m">1m</option>
                    <option value="3m">3m</option>
                    <option value="5m">5m</option>
                    <option value="15m">15m</option>
                    <option value="30m">30m</option>
                    <option value="1h">1h</option>
                    <option value="2h">2h</option>
                    <option value="4h">4h</option>
                    <option value="6h">6h</option>
                    <option value="8h">8h</option>
                    <option value="12h">12h</option>
                    <option value="1d">1d</option>
                    <option value="3d">3d</option>
                    <option value="1w">1w</option>
                    <option value="1M">1M</option>
                </select>
                <button className="BtnShowChart">zobacz</button>
            </form>
        </div>
        
        {showKlines ? (
            <div className="d-flex flex-row align-items-center assets--table-chart">
                <GetKlines coin={coin.asset} interval={intervalValue} />
            </div>
        ) : ("") }
        
        
        </>
    )
}

export default AssetsTableRow