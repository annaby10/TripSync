import React from "react";

function Header() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="flex justify-between items-center p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-400 dark:text-indigo-300">TripSync 🌍</h1>
      <button
        onClick={toggleDarkMode}
        className="px-3 py-1 border rounded text-sm dark:text-white text-gray-800 border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        Toggle Theme
      </button>
    </header>
  );
}

export default Header;
