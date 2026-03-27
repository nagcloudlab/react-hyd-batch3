// LEVEL 2 — Input Interaction
import { useState } from "react";

export default function InputBox() {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        placeholder="Enter name"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Hello, {text || "stranger"}!</p>
    </div>
  );
}
