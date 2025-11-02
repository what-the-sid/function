import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Ezhuth() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("unicode"); // 'unicode' or 'fml'

  // Simple conversion (placeholder logic — replace with your own mappings)
  const convertText = () => {
    if (mode === "unicode") {
      // Unicode → FML (sample logic)
      const converted = inputText
        .replace(/അ/g, "a")
        .replace(/ആ/g, "aa")
        .replace(/ഇ/g, "i")
        .replace(/ഉ/g, "u");
      setOutputText(converted);
    } else {
      // FML → Unicode (sample logic)
      const converted = inputText
        .replace(/aa/g, "ആ")
        .replace(/a/g, "അ")
        .replace(/i/g, "ഇ")
        .replace(/u/g, "ഉ");
      setOutputText(converted);
    }
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      alert("Copied to clipboard!");
    } catch (err) {
      alert("Failed to copy!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 px-6 py-12">
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ✍️ Ezhuth — Malayalam Font Converter
      </motion.h1>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
        {/* Mode Switch */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setMode("unicode")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mode === "unicode"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Unicode → FML
          </button>
          <button
            onClick={() => setMode("fml")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              mode === "fml"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            FML → Unicode
          </button>
        </div>

        {/* Input / Output Textareas */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm text-gray-400">Input</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-60 bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              placeholder="Type your Malayalam text here..."
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-400">Output</label>
            <textarea
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
              className="w-full h-60 bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              placeholder="Converted text will appear here..."
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={convertText}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold"
          >
            Convert
          </button>
          <button
            onClick={copyToClipboard}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold"
          >
            Copy Output
          </button>
          <button
            onClick={clearText}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Documentation */}
      <div className="max-w-3xl mx-auto mt-12 bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          📘 About Ezhuth
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          <b>Ezhuth</b> helps convert Malayalam text between <b>Unicode</b> and{" "}
          <b>FML (Font-based Malayalam)</b> scripts. This is useful for
          publishing old documents, fonts like ML-TTRevathi or ML-Karthika, or
          ensuring compatibility across systems that don’t support Unicode.
        </p>
      </div>

      <footer className="text-center text-gray-500 mt-10 text-sm">
        © 2025 function — Ezhuth by Sid
      </footer>
    </div>
  );
}
