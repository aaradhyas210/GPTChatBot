import { useState } from "react";
import "./App.css";
import ChatBot from "./components/ChatBot/ChatBot";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [loading, setLoading] = useState(false);
  const [crawlSuccess, setCrawlSuccess] = useState(false);
  const [crawlUrl, setCrawlUrl] = useState("");

  const crawlWebsite = async () => {
    setLoading(true);
    setCrawlSuccess(false);
    fetch(`http://localhost:8080/scrape?url=${crawlUrl}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setLoading(false);
          setCrawlSuccess(false);
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        setLoading(false);
        setCrawlSuccess(true);
      })
      .catch((error) => {
        setLoading(false);
        setCrawlSuccess(false);
        console.log(error);
      });
  };

  return (
    <div className="App">
      <p>Enter link you wish to crawl</p>
      <input onChange={(e) => setCrawlUrl(e.target.value)} type="string" />
      <div className="Line">
        <button onClick={crawlWebsite}>Submit</button>
      </div>
      {loading && (
        <div className="Line">
          <CircularProgress />
        </div>
      )}
      {crawlSuccess && (
        <div className="Line">
          The website has been successfully scraped. You can now use the chatbot
        </div>
      )}
      <ChatBot />
    </div>
  );
}

export default App;
