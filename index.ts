import express, { type Application, type Request, type Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(express.json())
app.use(cors())

type AuthyRequest = Request<{}, {}, {
    accessToken: string
    entitlementsToken?: string
}>

app.post('/entitlements', async (req: AuthyRequest, res: Response) => {
    console.log(req.body)
    await fetch("https://entitlements.auth.riotgames.com/api/token/v1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${req.body.accessToken}`
        }
    })
    .then(res => res.json())
    .then(data => {
        res.json(data)
    })
    .catch(e => res.status(500).json({ error: e.message || e }));
})

app.post('/userinfo', async (req: AuthyRequest, res: Response) => {
    console.log(req)
    await fetch("https://auth.riotgames.com/userinfo", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${req.body.accessToken}`
        }
    })
    .then(res => res.json())
    .then(data => {
        res.json(data)
    })
    .catch(e => res.status(500).json({ error: e.message || e }));
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server Up!")
})