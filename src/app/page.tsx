"use client";

import React, { useState } from "react";

interface Expense {
  name: string;
  cost: number;
}

export default function Home() {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = () => {
    if (!name || !cost) return;

    setExpenses([...expenses, { name, cost: parseFloat(cost) }]);
    setName("");
    setCost("");
  };

  const deleteExpense = (index: number) => {
    const updated = [...expenses];
    updated.splice(index, 1);
    setExpenses(updated);
  };

  const total = expenses.reduce((sum, e) => sum + e.cost, 0);

  return (
    <div className="flex items-start h-screen pl-28 pt-26 text-white bg-zinc-900 text-2xl">
      <div className="w-1/3 max-w-sm">
        <h1 className="text-6xl text-teal-400 mb-4">Add Expense</h1>

        <label className="block mb-2">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-1 text-black bg-amber-50"
          />
        </label>

        <label className="block mb-4">
          Cost
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full p-2 mt-1 text-black bg-amber-50"
          />
        </label>

        <button
          onClick={addExpense}
          className="bg-white text-black px-4 py-2 rounded text-4xl"
        >
          Add
        </button>

        <h2 className="text-5xl text-teal-400 mt-8 mb-2">Stats</h2>
        <p>Sum: {total}</p>
        <p>Count: {expenses.length}</p>
      </div>

      <div className="w-2/3 space-y-4 flex flex-col md:pl-30 lg:pl-50 2xl:pl-100 pr-10">
        {expenses.map((exp, index) => (
          <div
          key={index}
          className="expense-item relative border-2 border-teal-400 rounded p-4 bg-zinc-800 w-full"
        >        
            <p>
              <strong>Name:</strong> {exp.name}
            </p>
            <p>
              <strong>Cost:</strong> {exp.cost}
            </p>
            <span
              className="absolute top-4 right-4 text-red-500 cursor-pointer"
              onClick={(event) => {
                const expenseElement = (event.target as Element).closest('.expense-item');
                if (expenseElement) {
                  expenseElement.classList.add('fadeout');
                  setTimeout(() => {
                    deleteExpense(index);
                  }, 300);
                }
              }} >
              ❌
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
