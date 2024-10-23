import express from "express"
import cors from "cors"
import GetAssets from "./GetAssets.js"

const app = express()

const corsOptions = {
    origin: /http:\/\/localhost:\d+/
  }
  
app.use(cors(corsOptions))

app.get('/api', async (req,res)=>{

    try {

        const assets = await GetAssets();
        res.json(assets);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

app.listen(5000, ()=>{console.log("Server running on 5000 ")})