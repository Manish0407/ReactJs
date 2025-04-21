import { useState, useEffect } from 'react'
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import './App.css'

function App() {
    const [amount, setAmount] = useState()
    const [from, setFrom] = useState("usd")
    const [to, setTo] = useState("inr")
    const [convertedAmount, setConvertedAmount] = useState()

    const [currencyInfo, setCurrencyInfo] = useCurrencyInfo(from)
    const options = Object.keys(currencyInfo)

    const swap = () => {
        setTo(from);
        setFrom(to);
        // const temp = amount;
        setAmount(convertedAmount);
        setConvertedAmount(amount)
        setCurrencyInfo(from)
    }
    useEffect(() => {
        const result = amount * currencyInfo[to];
        setConvertedAmount(parseFloat(result.toFixed(3)));
    }, [amount, to, from, currencyInfo]) // Before giving currencyInfo in dependency array converted amount was wrong 

    return (
        <div className='container'>
            <div >
                <div>
                    <div>
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <button onClick={swap}>Swap</button>
                    <div>
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <h2>
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default App
