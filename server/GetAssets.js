
import crypto from 'crypto'
import fetch from 'node-fetch'
import 'dotenv/config'

// TEST KEYS FROM BINANCE API DOCUMENTATION
// const apiKey = "vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A"
// const secretKey = "NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j"

const apiKey = process.env.API_KEY;
const secretKey = process.env.SECRET_KEY;

const baseUrl = "https://api.binance.com"
const assetsUrl = "/sapi/v3/asset/getUserAsset"

const signature = (queryString) => {

    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(queryString);
    const signature = hmac.digest('hex');

    return signature;
}

const getServerTime = async () => {
    try {
        const response = await fetch('https://api.binance.com/api/v3/time');
        const res = await response.json();
        console.log("Server time is: " + res.serverTime);
        return res.serverTime;
    } catch (error) {
        console.error('Error fetching server time:', error);
        return null;
    }
};

const GetAssets = async () => {

    try{

        const serverTime = await getServerTime();
        if (!serverTime) {
            console.error('Failed to get server time.');
            return;
        }

        const timestamp = Date.now();
        const adjustedTimestamp = Math.min(timestamp, serverTime + 1000);

        console.log("Server time: ")

        const query = `needBtcValuation=true&timestamp=${adjustedTimestamp}`

        const mySignature = signature(query)

        const url = `https://api4.binance.com/sapi/v3/asset/getUserAsset?${query}&signature=${mySignature}`

        const headers = {
            'X-MBX-APIKEY': apiKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: headers
        })
            
        if (!response.ok) {
            console.error(response)
        }

        const data = await response.json()
        console.log(data)
        return data

    } catch (error) {
        throw new Error(error.message);
    }

}

export default GetAssets