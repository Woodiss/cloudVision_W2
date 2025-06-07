"use client";

import { useEffect, useState } from "react";
import { useIngredientsStore, Ingredient } from "@/stores/useIngredientsStore";

const IngredientSearch: React.FC = () => {
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Ingredient[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isHoveringList, setIsHoveringList] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const addIngredient = useIngredientsStore((state) => state.addIngredient);

  useEffect(() => {
    const fetchIngredients = async () => {
      const res = await fetch("/data/ingredients_with_emojis.json");
      const data = await res.json();
      setAllIngredients(data);
    };
    fetchIngredients();
  }, []);

  const updateSuggestions = (value: string) => {
    setInput(value);
    const filtered = allIngredients.filter((ing) =>
      ing.name.toLowerCase().includes(value.toLowerCase()),
    );
    setSuggestions(
      filtered.length > 0 ? filtered : [{ name: value, emoji: "❓" }],
    );
    setSelectedIndex(-1); // Reset la sélection lors d’une nouvelle saisie
  };

  const handleSelect = (ingredient: Ingredient) => {
    addIngredient(ingredient);
    setInput("");
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1,
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelect(suggestions[selectedIndex]);
      } else if (input.trim()) {
        const exactMatch = suggestions.find(
          (s) => s.name.toLowerCase() === input.trim().toLowerCase(),
        );
        if (exactMatch) {
          handleSelect(exactMatch);
        } else {
          handleSelect({ name: input.trim(), emoji: "❓" });
        }
      }
    }
  };

  const shouldShowSuggestions = input && (isFocused || isHoveringList);

  return (
    <div className="w-full relative">
      <input
        type="text"
        value={input}
        onChange={(e) => updateSuggestions(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setTimeout(() => setIsFocused(false), 100);
        }}
        placeholder="Search ingredients"
        className="w-full p-2 border rounded-full bg-white px-6 py-3 border-none focus:ring-3 focus:ring-amber-500 focus:outline-0"
      />

      {shouldShowSuggestions && (
        <ul
          className="w-full border rounded mt-2 bg-white shadow absolute z-10 max-h-[30vh] overflow-scroll"
          onMouseEnter={() => setIsHoveringList(true)}
          onMouseLeave={() => setIsHoveringList(false)}
        >
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(suggestion)}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                idx === selectedIndex ? "bg-amber-100" : ""
              }`}
            >
              {suggestion.emoji} {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientSearch;
