// Visitor counter. In Step 8 of the guide, paste your API Gateway Invoke URL below.
const API_URL = ""; // e.g. "https://abc123.execute-api.us-east-1.amazonaws.com/count"

const countEl = document.getElementById("count");

if (!API_URL) {
  countEl.textContent = "coming soon";
} else {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => { countEl.textContent = data.count; })
    .catch(() => { countEl.textContent = "unavailable"; });
}
