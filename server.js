import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "d14ca594a23f93e4d620e60eaeeceaca";
const TOKEN = "ATTA276c5a6a510c336a1d907be9787e9eb88b17e60f8b43cd65d2b2040399c80bcb8B7D103B";
const BASE = "https://api.trello.com/1";

app.all("/trello/*", async (req, res) => {
  const path = req.params[0];
  const query = new URLSearchParams(req.query).toString();
  const sep = query ? "&" : "";
  const url = `${BASE}/${path}?key=${API_KEY}&token=${TOKEN}${sep}${query ? "&" + query : ""}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: ["POST", "PUT"].includes(req.method) ? JSON.stringify(req.body) : undefined,
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("Irlequip Trello Proxy running ✅"));

app.listen(process.env.PORT || 3000, () => console.log("Proxy running"));
