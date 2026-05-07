import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());

const allowedKeywords = [

  // GENERAL
  "kpop",
  "k-pop",
  "album",
  "photocard",
  "lightstick",
  "merch",
  "season greetings",
  "signed",
  "pob",
  "preorder",
  "digipack",

  // BIG BOY GROUPS
  "bts",
  "seventeen",
  "stray kids",
  "txt",
  "tomorrow x together",
  "enhypen",
  "ateez",
  "exo",
  "nct",
  "nct 127",
  "nct dream",
  "wayv",
  "riize",
  "treasure",
  "the boyz",
  "zerobaseone",
  "zb1",
  "boynextdoor",
  "got7",
  "monsta x",
  "shinee",
  "super junior",
  "bigbang",
  "ikon",
  "winner",
  "2pm",
  "day6",
  "xdinary heroes",
  "btob",
  "infinite",
  "astro",
  "oneus",
  "p1harmony",
  "evnne",
  "tempest",
  "all(h)ours",

  // BIG GIRL GROUPS
  "blackpink",
  "twice",
  "newjeans",
  "aespa",
  "ive",
  "le sserafim",
  "lesserafim",
  "twice",
  "itzy",
  "nmixx",
  "gidle",
  "(g)i-dle",
  "idle",
  "babymonster",
  "kiss of life",
  "kiof",
  "illit",
  "izna",
  "katseye",
  "hearts2hearts",
  "meovv",
  "fifty fifty",
  "kep1er",
  "stayc",
  "fromis_9",
  "red velvet",
  "mamamoo",
  "oh my girl",
  "dreamcatcher",
  "weeekly",
  "viviz",
  "wooah",
  "csr",
  "triples",
  "tripleS",
  "class:y",
  "young posse",
  "badvillain",
  "rescene",
  "unis",
  "h1-key",
  "cignature",
  "purple kiss",

  // CO-ED / OTHER
  "kard",
  "xlov",

  // SOLOISTS
  "iu",
  "taeyeon",
  "jungkook",
  "jimin",
  "v",
  "rm",
  "suga",
  "j-hope",
  "jhope",
  "rose",
  "rosé",
  "jennie",
  "lisa",
  "jisoo",
  "cha eunwoo",
  "sunmi",
  "chungha",
  "somi"
];

app.get("/search", async (req, res) => {
  try {
    const query = (req.query.q || "").toLowerCase().trim();

    /* BLOCK NON K-POP SEARCHES */
    const isKpopSearch = allowedKeywords.some(keyword =>
      query.includes(keyword)
    );

    if (!isKpopSearch) {
      return res.status(400).json({
        error: "Only K-pop related searches are allowed."
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

    console.log(results[0]);

    res.json(results);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});