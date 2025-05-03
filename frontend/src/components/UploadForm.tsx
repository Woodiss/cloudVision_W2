import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

// ✅ Schéma strict avec z.instanceof
const formSchema = z.object({
  file: z
    .instanceof(File, { message: "Un fichier est requis" })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Le fichier doit être une image JPG, PNG, WebP ou AVIF",
    }),
});

// ✅ Typage unifié
type UploadFormData = z.infer<typeof formSchema>;

export default function UploadForm() {
  const form = useForm<UploadFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: UploadFormData) => {
    console.log(values.file);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Fichier</FormLabel>
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
        <Button type="submit">Envoyer</Button>
      </form>
    </Form>
  );
}
