import express, { type Application, type Request, type Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(express.json())
app.use(cors())

type AuthyRequest = Request<{}, {}, {
    accessToken: string
    entitlementsToken?: string
    puuid: string
}>

app.post('/storefront', async (req: AuthyRequest, res: Response) => {
    console.log(req.body)
    await fetch(`https://pd.eu.a.pvp.net/store/v3/storefront/${req.body.puuid}`, {
        method: "POST",
        headers: {
            "X-Riot-ClientPlatform":   "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
            "X-Riot-ClientVersion": "B312378013F36E38",
            "X-Riot-Entitlements-JWT": req.body.entitlementsToken,
            "Authorization": `Bearer ${req.body.accessToken}`,
        } as Record<string, string>,
        body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        res.json(data)
    })
    .catch(e => res.status(500).json({ error: e.message || e }));
})

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