import { useState } from "react";
import "./styles.css";

export default function App() {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchJoke(e) {
    // prevent <a href="#"> from reloading the page
    if (e) e.preventDefault();

    setLoading(true);
    setError(false);
    setJoke("");

    try {
      const res = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      // if response not ok → simulate an error
      if (!res.ok) {
        throw new Error("Could not fetch a joke. Try again.");
      }

      const data = await res.json();

      // format joke: setup + new line + bold punchline
      setJoke(`${data.setup}<br><b>${data.punchline}</b>`);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex">
      <div className="App">
        <h1>Random Joke</h1>
        <p>Click the button to fetch a fresh one.</p>

        <button className="button" onClick={fetchJoke} disabled={loading}>
          {loading ? "Fetching..." : "Fetch joke"}
        </button>

        {error ? (
          <>
            <p style={{ color: "red" }}>Could not fetch a joke. Try again.</p>
            <p>
              <a href="#" onClick={fetchJoke}>
                Try again
              </a>
            </p>
          </>
        ) : joke ? (
          // render HTML safely (for <br> and <b>)
          <p dangerouslySetInnerHTML={{ __html: joke }} />
        ) : (
          <p>No joke yet.</p>
        )}
      </div>
    </div>
  );
}
