import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    fetchTexts();
  }, []);

  async function fetchTexts() {
    const res = await fetch("/api/text");
    const data = await res.json();
    setTexts(data);
  }

  async function addText() {
    if (!text) return;
    await fetch("/api/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    fetchTexts();
  }

  return (
    <div>
      <h1>Simple To-Do App</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addText}>Add</button>

      <ul>
        {texts.map((item) => (
          <li key={item._id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
