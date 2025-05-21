import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { LoaderCircle, ListX } from "lucide-react";
import ResultRecipe from "./ResultRecipe";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];

const formSchema = z.object({
  file: z.instanceof(File, { message: "Un fichier est requis" }).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Le fichier doit être une image JPG, PNG, WebP ou AVIF",
  }),
});

type UploadFormData = z.infer<typeof formSchema>;
export type ServerResponseItem = {
  id: string;
  title: string;
  image: string;
  missedIngredientCount: number;
};

export type ServerResponse = ServerResponseItem[];

export default function UploadForm() {
  const [responseState, setResponseState] = useState<{
    data: [ServerResponse, string[], string] | null;
    isLoading: boolean;
    error: boolean;
  }>({
    data: null,
    isLoading: false,
    error: false,
  });

  const form = useForm<UploadFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: UploadFormData) => {
    setResponseState({ data: null, isLoading: true, error: false });

    try {
      const formData = new FormData();
      formData.append("file", values.file);

      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi des données");
      }

      const data = await response.json();
      console.log(data);

      setResponseState({ data, isLoading: false, error: false });
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      setResponseState({ data: null, isLoading: false, error: true });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="file"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.avif"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={responseState.isLoading}>
            {responseState.isLoading ? (
              <>
                Sending <LoaderCircle className="animate-spin" />
              </>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </Form>
      {responseState.error && <p className="text-red-500">An error occurred</p>}

      {/* Modal pour afficher les données */}
      <Dialog open={!!responseState.data} onOpenChange={() => setResponseState({ ...responseState, data: null })}>
        <DialogContent className="min-w-screen h-screen max-w-none rounded-none flex flex-col p-4">
          <DialogHeader className="h-auto">
            <DialogTitle>Data received</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          {responseState.data && <ResultRecipe data={responseState.data} />}

          <DialogFooter className="h-auto">
            <Button onClick={() => setResponseState({ ...responseState, data: null })}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
