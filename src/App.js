import "./styles.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTumblr } from "@fortawesome/free-brands-svg-icons";

export default function App() {
  const [bgColor, setBGColor] = useState("#20681D");
  const [quote, setQuote] = useState(
    "Software and cathedrals are much the same; first we build them, then we pray"
  );
  const [quoteAuthor, setQuoteAuthor] = useState("Anonymous");

  async function getQuote() {
    const quote = await fetch(
      "https://goquotes-api.herokuapp.com/api/v1/random?count=1",
      { headers: { accept: "application/json" }, method: "GET" }
    );
    return await quote.json();
  }

  async function updateUI(quote) {
    getQuote()
      .then((res) => {
        setBGColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        setQuote(res?.quotes[0]?.text);
        setQuoteAuthor(res?.quotes[0]?.author);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="card" id="quote-box">
      <div className="card__text">
        <blockquote className="blockquote" id="text">
          <p>{quote}</p>
          <footer className="blockquote-footer">
            <cite title="Source Title" id="author">
              {quoteAuthor}
            </cite>
          </footer>
        </blockquote>
        <button>
          <a href="twitter.com/intent/tweet" id="tweet-quote">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </button>
        <button>
          <FontAwesomeIcon icon={faTumblr} />
        </button>
        <button
          id="new-quote"
          onClick={updateUI}
          style={{ background: `${bgColor}` }}
        >
          New quote
        </button>
      </div>
    </div>
  );
}
