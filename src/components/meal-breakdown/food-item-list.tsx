import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { FoodItem } from "@/lib/infrastructure/services/AIService/schemas"

export function FoodItemList({ foodItems }: { foodItems: FoodItem[] }) {
  return (
    <Accordion type="single" collapsible>
      {foodItems.map((foodItem, index) => (
        <AccordionItem
          key={index + foodItem.description}
          value={index + foodItem.description}
          className="last:border-b-0"
        >
          <AccordionTrigger>
            <div className="text-sm">
              <span>{foodItem.description}</span>
              <span className="ml-2 text-xs text-muted-foreground">
                ({foodItem.weight.toFixed(0)}g)
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="flex flex-row gap-1">
            <span className="text-xs text-muted-foreground">
              Cal: {foodItem.calories}cal
            </span>
            <span className="text-xs text-muted-foreground">
              Pro: {foodItem.proteins}g
            </span>
            <span className="text-xs text-muted-foreground">
              Carbs: {foodItem.carbohydrates}g
            </span>
            <span className="text-xs text-muted-foreground">
              Fats: {foodItem.fats}g
            </span>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
