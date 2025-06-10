"use client";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useIngredientsStore, Ingredient } from "@/stores/useIngredientsStore";
import { ImageUp, LoaderCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
interface AnalyzedIngredient extends Ingredient {
  id: string;
}

type AnalysisState = {
  data: {
    image_url: string;
    ingredients: AnalyzedIngredient[];
  } | null;
  loading: boolean;
  error: boolean;
};

export default function IngredientIdentifier() {
  const [emojiMap, setEmojiMap] = useState<Record<string, string>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [analysis, setAnalysis] = useState<AnalysisState>({
    data: null,
    loading: false,
    error: false,
  });

  const addIngredient = useIngredientsStore((state) => state.addIngredient);

  const getEmoji = (name: string) => {
    return emojiMap[name.toLowerCase()] || "❓";
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setImageFile(acceptedFiles[0]);
      setAnalysis({ data: null, loading: false, error: false });
      setSelected({});
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setAnalysis({ data: null, loading: true, error: false });

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await fetch("http://localhost:5000", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      setAnalysis({ data, loading: false, error: false });

      setSelected(
        Object.fromEntries(
          data.ingredients.map((i: AnalyzedIngredient) => [i.id, true]),
        ),
      );
    } catch (err) {
      console.error("Analysis failed", err);
      setAnalysis({ data: null, loading: false, error: true });
    }
  };

  const handleCheckboxToggle = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdd = () => {
    if (!analysis.data) return;
    analysis.data.ingredients
      .filter((i) => selected[i.id])
      .forEach((i) => {
        addIngredient({ name: i.name, emoji: getEmoji(i.name) });
      });
    toast("✅ Added with success !");
  };

  useEffect(() => {
    const loadEmojis = async () => {
      try {
        const res = await fetch("/data/ingredients_with_emojis.json");
        const data: { name: string; emoji: string }[] = await res.json();
        const map = data.reduce(
          (acc, item) => {
            acc[item.name.toLowerCase()] = item.emoji;
            return acc;
          },
          {} as Record<string, string>,
        );
        setEmojiMap(map);
      } catch (err) {
        console.error("Failed to load emoji list", err);
      }
    };

    loadEmojis();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-amber-500 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragActive ? "bg-amber-100 border-amber-500" : "bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <ImageUp className="mx-auto mb-4" size={32} color="#f59e0b" />
        <p className="text-gray-600">
          {isDragActive
            ? "Drop here"
            : "Drag an drop an image or clic to select one"}
        </p>
        {imageFile && (
          <p className="mt-2 text-sm text-gray-500">{imageFile.name}</p>
        )}
      </div>

      {imageFile && (
        <Button
          onClick={handleAnalyze}
          className="mx-auto flex font-bold text-base"
          disabled={analysis.loading}
        >
          <Sparkles />
          {analysis.loading ? (
            <>
              Analyse <LoaderCircle className="animate-spin" />
            </>
          ) : (
            "Analyse"
          )}
        </Button>
      )}

      {analysis.error && (
        <p className="text-red-600 font-semibold text-center font-mono">
          Error during analysis
        </p>
      )}

      {analysis.data && (
        <div className="space-y-4">
          <img
            src={`data:image/jpeg;base64,${analysis.data.image_url}`}
            alt="Analyzed"
            className="mx-auto max-h-[300px] object-contain rounded border"
          />

          {analysis.data.ingredients.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No ingredients found.
            </p>
          ) : (
            <>
              <ul className="space-y-2">
                {analysis.data.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected[ingredient.id] || false}
                      onChange={() => handleCheckboxToggle(ingredient.id)}
                    />
                    <span>
                      {getEmoji(ingredient.name)} {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleAdd}
                className="w-full font-semibold text-base mt-4"
              >
                Add the selected ingredients
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
