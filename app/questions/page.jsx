"use client";
import React, { useState } from "react";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    setLoading(true);

    const res = await fetch("/api/generate-questions", {
      method: "POST",
    });

    const data = await res.json();
    setQuestions(data.questions || []);
    setLoading(false);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        AI Interview Questions
      </h1>

      <button
        onClick={generateQuestions}
        className="mt-5 px-5 py-2 bg-blue-500 text-white rounded"
      >
        {loading ? "Generating..." : "Generate Questions"}
      </button>

      <div className="mt-5 space-y-3">
        {questions.map((q, index) => (
          <div key={index} className="p-3 border rounded">
            {q}
          </div>
        ))}
      </div>
    </div>
  );
}