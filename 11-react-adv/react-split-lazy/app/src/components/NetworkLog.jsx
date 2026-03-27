// Displays a log of dynamically loaded chunks (for training visibility)
import { useState, useEffect, useRef } from "react";

export default function NetworkLog() {
  const [chunks, setChunks] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    // Watch for dynamically loaded scripts via PerformanceObserver
    if (!window.PerformanceObserver) return;

    observerRef.current = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (
          entry.initiatorType === "script" ||
          (entry.name.includes(".js") && entry.initiatorType === "fetch")
        ) {
          const name = entry.name.split("/").pop();
          if (name && !name.startsWith("node_modules")) {
            setChunks((prev) => {
              if (prev.some((c) => c.name === name)) return prev;
              return [
                ...prev,
                {
                  name,
                  size: entry.transferSize
                    ? `${(entry.transferSize / 1024).toFixed(1)} KB`
                    : "cached",
                  time: `${Math.round(entry.duration)}ms`,
                },
              ];
            });
          }
        }
      }
    });

    observerRef.current.observe({ entryTypes: ["resource"] });
    return () => observerRef.current?.disconnect();
  }, []);

  if (chunks.length === 0) return null;

  return (
    <div className="bg-gray-900 text-gray-300 rounded-xl p-4 text-xs font-mono">
      <p className="text-green-400 font-semibold mb-2">
        Loaded Chunks ({chunks.length})
      </p>
      {chunks.map((c) => (
        <div key={c.name} className="flex justify-between py-0.5">
          <span className="text-blue-400">{c.name}</span>
          <span className="text-gray-500">
            {c.size} · {c.time}
          </span>
        </div>
      ))}
    </div>
  );
}
