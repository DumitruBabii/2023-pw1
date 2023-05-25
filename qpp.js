import React, { useState } from "react";

function Diary() {
  const [entries, setEntries] = useState([]);

  const addEntry = (text) => {
    const newEntry = { id: Date.now(), text, timestamp: new Date() };
    setEntries([...entries, newEntry]);
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  };

  return (
    <div>
      <h1>Diary</h1>
      <EntryForm onAdd={addEntry} />
      <EntryList entries={entries} onDelete={deleteEntry} />
    </div>
  );
}

function EntryForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onAdd(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your entry"
      />
      <button type="submit">Add Entry</button>
    </form>
  );
}

function EntryList({ entries, onDelete }) {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          <div>{entry.text}</div>
          <div>{entry.timestamp.toLocaleString()}</div>
          <button onClick={() => onDelete(entry.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default Diary;
