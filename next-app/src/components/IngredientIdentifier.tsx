"use client";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [analysis, setAnalysis] = useState<AnalysisState>({
    data: null,
    loading: false,
    error: false,
  });

  const addIngredient = useIngredientsStore((state) => state.addIngredient);

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
      const res = await fetch("http://localhost:5000/api", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

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
      .forEach((i) => addIngredient({ name: i.name, emoji: i.emoji }));
    toast("✅ Added with success !");
  };

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
          // className="w-full bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 transition"
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
            src={analysis.data.image_url}
            alt="Analyzed"
            className="mx-auto max-h-[300px] object-contain rounded border"
          />

          <ul className="space-y-2">
            {analysis.data.ingredients.map((ingredient) => (
              <li key={ingredient.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected[ingredient.id] || false}
                  onChange={() => handleCheckboxToggle(ingredient.id)}
                />
                <span>
                  {ingredient.emoji} {ingredient.name}
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
        </div>
      )}
    </div>
  );
}
