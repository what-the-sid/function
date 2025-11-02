import React, { useState } from "react";
import { motion } from "framer-motion";

export default function MalpyShowcase() {
  const [malCode, setMalCode] = useState(
    `ith namaskaram():\n    name "Sidharth" aanu\n    kaanikyuka f"Hello {name}!"\n\nnamaskaram()`,
  );
  const [pyCode, setPyCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://malpy-backend.onrender.com";

  const handleTranslateToPython = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/to_py`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: malCode }),
      });
      const data = await res.json();
      setPyCode(data.translated || "Error: " + data.detail);
    } catch (err) {
      setPyCode(String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleTranslateToMalayalam = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/to_mal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: pyCode }),
      });
      const data = await res.json();
      setMalCode(data.translated || "Error: " + data.detail);
    } catch (err) {
      setMalCode(String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRunPython = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/run_py`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: pyCode }),
      });
      const data = await res.json();
      setOutput(data.output || "Executed successfully.");
    } catch (err) {
      setOutput(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 px-4 md:px-16">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Malpy Playground: Malayalam ↔ Python Translator
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Malayalam Editor */}
        <div className="bg-gray-800 rounded-2xl p-5 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-semibold mb-3 text-blue-300">
            Malayalam (.mal)
          </h2>
          <textarea
            value={malCode}
            onChange={(e) => setMalCode(e.target.value)}
            className="w-full h-72 p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
          <button
            onClick={handleTranslateToPython}
            disabled={loading}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Translating..." : "Translate → Python"}
          </button>
        </div>

        {/* Python Editor */}
        <div className="bg-gray-800 rounded-2xl p-5 shadow-xl border border-gray-700">
          <h2 className="text-2xl font-semibold mb-3 text-green-300">
            Python (.py)
          </h2>
          <textarea
            value={pyCode}
            onChange={(e) => setPyCode(e.target.value)}
            className="w-full h-72 p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none"
          />
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={handleTranslateToMalayalam}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Translating..." : "← Translate to Malayalam"}
            </button>
            <button
              onClick={handleRunPython}
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Running..." : "▶ Run Python"}
            </button>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="mt-10 bg-gray-800 border border-gray-700 rounded-2xl p-5 shadow-lg">
        <h3 className="text-xl font-semibold mb-3 text-yellow-400">Output</h3>
        <pre className="bg-gray-900 p-3 rounded-lg min-h-[80px] text-sm text-gray-200 font-mono whitespace-pre-wrap">
          {output || "No output yet..."}
        </pre>
      </div>

      {/* Documentation */}
      <div className="mt-12 bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-purple-300">
          📘 Malpy Syntax Guide
        </h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-300">
          <li>
            <code>ith function_name():</code> → Define a function
          </li>
          <li>
            <code>x 5 aanu</code> → Assign a value (<code>x = 5</code>)
          </li>
          <li>
            <code>num 5 aanengil:</code> → If condition (
            <code>if num == 5:</code>)
          </li>
          <li>
            <code>athupole num 10 aayal:</code> → Else if (
            <code>elif num == 10:</code>)
          </li>
          <li>
            <code>allengil:</code> → Else
          </li>
          <li>
            <code>kaanikyuka "Hello"</code> → Print statement
          </li>
          <li>
            <code>x vitto</code> → Return x
          </li>
        </ul>
      </div>

      <footer className="text-center text-gray-500 mt-10 text-sm">
        © 2025 Malpy by Sid
      </footer>
    </div>
  );
}
