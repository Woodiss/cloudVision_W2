// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];

// // ✅ Schéma strict avec z.instanceof
// const formSchema = z.object({
//   file: z.instanceof(File, { message: "Un fichier est requis" }).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
//     message: "Le fichier doit être une image JPG, PNG, WebP ou AVIF",
//   }),
// });

// // ✅ Typage unifié
// type UploadFormData = z.infer<typeof formSchema>;

// export default function UploadForm() {
//   const form = useForm<UploadFormData>({
//     resolver: zodResolver(formSchema),
//   });

//   const onSubmit = async (values: UploadFormData) => {
//     console.log(values.file);
//     try {
//       const formData = new FormData();
//       formData.append("file", values.file);
//       console.log(formData);

//       const response = await fetch("http://localhost:5000/", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Echec de l'envoie des données");
//       }
//       const data = await response.json();
//       console.log("Image envoyer avec succes : ", data);
//     } catch (error) {
//       console.log("Erreur lors de l'upload : ", error);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="file"
//           render={({ field: { value, onChange, ...fieldProps } }) => (
//             <FormItem>
//               <FormLabel>Fichier</FormLabel>
//               <FormControl>
//                 <Input
//                   {...fieldProps}
//                   type="file"
//                   accept=".jpg,.jpeg,.png,.webp,.avif"
//                   onChange={(event) => {
//                     const file = event.target.files?.[0];
//                     if (file) {
//                       onChange(file);
//                     }
//                   }}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Envoyer</Button>
//       </form>
//     </Form>
//   );
// }
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"];

const formSchema = z.object({
  file: z.instanceof(File, { message: "Un fichier est requis" }).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Le fichier doit être une image JPG, PNG, WebP ou AVIF",
  }),
});

type UploadFormData = z.infer<typeof formSchema>;
type ServerResponseItem = {
  id: string;
  title: string;
  image: string;
};
type ServerResponse = ServerResponseItem[];

export default function UploadForm() {
  const [responseData, setResponseData] = useState<ServerResponse | null>(null);
  const form = useForm<UploadFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: UploadFormData) => {
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
      setResponseData(data); // 💡 Ouvre la modal avec les données
    } catch (error) {
      console.log("Erreur lors de l'upload :", error);
    }
  };

  return (
    <>
      <Form {...form} >
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
          <Button type="submit">Send</Button>
        </form>
      </Form>

      {/* ✅ Modal pour afficher les données */}
      <Dialog open={!!responseData} onOpenChange={() => setResponseData(null)}>
  <DialogContent className="min-w-screen h-screen max-w-none rounded-none flex flex-col">
    <DialogHeader className="h-auto">
      <DialogTitle>Données reçues</DialogTitle>
      <DialogDescription>Le serveur a répondu avec les données suivantes :</DialogDescription>
    </DialogHeader>

    <div className="flex-1 overflow-auto flex flex-wrap gap-4 bg-white p-4">
      {responseData &&
        responseData.map((item) => (
          <div key={item.id} className="bg-slate-200 shadow-md rounded">
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
    </div>

    <DialogFooter className="h-auto">
      <Button onClick={() => setResponseData(null)}>Fermer</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    </>
  );
}
