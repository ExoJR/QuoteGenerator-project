import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitterSquare,
  faTumblrSquare,
} from "@fortawesome/free-brands-svg-icons";
import "./quoteGenerator.scss";

function QuoteGenerator() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [fade, setFade] = useState(false);

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setAuthor(data.author);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
      });
  }, []);

  const fetchQuote = () => {
    setFade(true);
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setQuote(data.content);
          setAuthor(data.author);
          setFade(false);
          setRandomColor();
        }, 500);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
      });
  };

  const setRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.background = randomColor
    let bgText = document.getElementById("text");
    let bgAuthor = document.getElementById("author");
    let bgLinksAndButtons = document.querySelectorAll('.button-24')
     bgAuthor.style.color = randomColor
     bgText.style.color = randomColor
    

     bgLinksAndButtons.forEach(button => {
      button.style.backgroundColor = randomColor;
      button.style.border = randomColor;

      button.addEventListener('mouseenter', function() {
        button.style.border = `1px solid ${randomColor}`;
        button.style.color = randomColor;
        button.style.backgroundColor = 'aliceblue';
        
    });
    
 
    button.addEventListener('mouseleave', function() {
      button.style.border = `1px solid aliceblue`;
        button.style.backgroundColor = randomColor; 
        button.style.color = 'aliceblue';
    });
    });

    
  };

  return (
    <div id="quote-box">
      <blockquote id="quote-text" className={fade ? "fade-out" : ""}>
        <p id="text">
          <FontAwesomeIcon icon={faQuoteLeft} className="faQuoteLeft" /> {quote}
        </p>
        <div id="author">
          <p>- {author}</p>
        </div>
      </blockquote>
      <div id="buttons">
        <div className="div-links">
          {" "}
          <a
            href="https://twitter.com/intent/tweet"
            id="tweet-quote"
            target="_blank"
            className="button-24"
          >
            <FontAwesomeIcon
              icon={faTwitterSquare}
              className="faTwitterSquare"
            />
          </a>
          <a
            href="https://www.tumblr.com/register"
            id="tumblr-quote"
            target="_blank"
            className="button-24"
          >
            <FontAwesomeIcon icon={faTumblrSquare} className="faTumblrSquare" />
          </a>
        </div>
        <button id="new-quote" onClick={fetchQuote} className="button-24">
          New quote
        </button>
      </div>
    </div>
  );
}

export default QuoteGenerator;
