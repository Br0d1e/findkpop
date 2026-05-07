import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { isKpopQuery } from "./kpopValidator.js";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

/* SEARCH ROUTE */
app.get("/search", async (req, res) => {
  try {
    const query = (req.query.q || "").trim();

    // 🔒 K-POP VALIDATION (NEW SYSTEM)
    const result = isKpopQuery(query);

    if (!result.valid) {
      return res.status(400).json({
        error: "Only K-pop related searches are allowed.",
        details: result
      });
    }

    const apiURL =
      `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&api_key=${process.env.SERP_API_KEY}`;

    const response = await fetch(apiURL);
    const data = await response.json();

    const results = (data.shopping_results || []).map(item => ({
      title: item.title,
      price: item.price,
      link: item.product_link || item.link,
      store: item.source,
      thumbnail: item.thumbnail
    }));

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

/* START SERVER */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
