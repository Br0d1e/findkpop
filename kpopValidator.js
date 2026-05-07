const KPOP_KEYWORDS = [
  "kpop", "k-pop", "k pop",
  "album", "albums", "photocard", "pc", "lightstick",
  "merch", "merchandise", "season greetings",
  "preorder", "pre-order", "pob", "signed",
  "digipack", "digipak", "photobook",
  "comeback", "debut", "fanmeeting", "fansign",
  "bts", "blackpink", "stray kids", "txt", "enhypen",
  "twice", "seventeen", "nct", "exo", "ive",
  "newjeans", "le sserafim", "itzy", "aespa",
  "gidle", "(g)i-dle", "ateez", "red velvet",
  "official", "weverse", "yg", "jyp", "sm"
];

const BLOCKLIST = [
  "car", "iphone", "android", "laptop", "ps5", "xbox",
  "nike", "adidas", "football", "soccer", "nba", "nfl",
  "gun", "crypto", "bitcoin", "stocks", "loan", "casino"
];

function normalize(text) {
  return text.toLowerCase().trim();
}

export function isKpopQuery(query) {
  const q = normalize(query);

  // BLOCK non-K-pop topics
  for (const bad of BLOCKLIST) {
    if (q.includes(bad)) {
      return {
        valid: false,
        reason: "Blocked non-K-pop topic"
      };
    }
  }

  // SCORE K-pop relevance
  let score = 0;

  for (const keyword of KPOP_KEYWORDS) {
    if (q.includes(keyword)) {
      score++;
    }
  }

  const isValid = score >= 1;

  return {
    valid: isValid,
    score,
    reason: isValid ? "Allowed K-pop query" : "Not K-pop related"
  };
}
