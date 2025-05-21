import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ListX } from "lucide-react";
type ServerResponseItem = {
  id: string;
  title: string;
  image: string;
  missedIngredientCount: number;
};

type ServerResponse = ServerResponseItem[];

type ResultRecipeProps = {
  data: [ServerResponse, string[], string];
};

export default function ResultRecipe({ data }: ResultRecipeProps) {
  const [recipes, ingredients, annotatedImage] = data;

  return (
    <div className="overflow-auto flex bg-white flex-col sm:flex-row sm:overflow-hidden sm:grow">
      <div className="w-full border-b border-neutral-400 flex flex-col gap-4 mb-4 sm:max-w-[360px] sm:border-b-0 sm:border-r sm:pr-4 sm:pt-2 sm:overflow-y-scroll">
        <img
          src={annotatedImage}
          alt="original image from user"
          className="w-full max-h-[30vh] object-cover rounded"
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Ingredients found</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="w-full h-fit flex-wrap flex gap-6 flex-1 justify-center p-2 sm:w-full  sm:overflow-scroll sm:h-full">
        {recipes.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded overflow-hidden max-w-[312px] w-auto">
            <img src={item.image} alt={item.title} />
            <div className="p-4">
              <h3 className="text-lg font-medium">{item.title}</h3>
              {item.missedIngredientCount > 0 && (
                <p className="flex mt-4">
                  <ListX color="red" />
                  {item.missedIngredientCount} Missing Ingredients
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
