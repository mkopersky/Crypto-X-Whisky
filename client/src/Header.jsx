import logo from './assets/logo.png';

const Header = (props) => {

    return (
        
        <header className="container-fluid">

            <div className="container">
            
                <div className="d-flex justify-content-between align-items-center p-3">

                    <div className="col-4 logo">
                        <img src={logo} className="logo" alt="cryptoXwhisky" />
                    </div>

                    <div className="col-4 text-center market-rates">
                        <p>
                            {isNaN(parseFloat(props.btc)) 
                                ? "BTC: pobieranie kursu..." 
                                : <>BTC: <span>{parseFloat(props.btc).toFixed(2)} $</span></>}
                        </p>
                        <p>
                            {isNaN(parseFloat(props.usd)) 
                                ? "USD: pobieranie kursu..." 
                                : <>USD: <span>{parseFloat(props.usd).toFixed(2)} zł</span></>}
                        </p>
                    </div>

                    <div className='col-4'></div>

                </div>

            </div>
            
        </header>
    )

}

export default Header