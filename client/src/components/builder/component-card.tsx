import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, DollarSign, Weight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComponentCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: string;
  weight: string;
  description?: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  isPopular?: boolean;
  testId?: string;
}

export function ComponentCard({
  id,
  name,
  brand,
  image,
  price,
  weight,
  description,
  isSelected,
  onSelect,
  isPopular,
  testId,
}: ComponentCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover-elevate",
        isSelected
          ? "border-2 border-trail shadow-lg ring-2 ring-trail/20"
          : "border-border hover:shadow-xl"
      )}
      onClick={() => onSelect(id)}
      data-testid={testId || `card-component-${id}`}
    >
      <CardContent className="p-4">
        {/* Selection Indicator */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {isPopular && (
              <Badge variant="secondary" className="mb-2 text-xs">
                Popular Choice
              </Badge>
            )}
          </div>
          <div
            className={cn(
              "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
              isSelected
                ? "bg-trail border-trail"
                : "border-muted-foreground/30 bg-background"
            )}
          >
            {isSelected && <Check className="h-4 w-4 text-trail-foreground" />}
          </div>
        </div>

        {/* Product Image */}
        <div className="aspect-[4/3] mb-3 bg-muted/20 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{brand}</p>
            <h4 className="font-semibold text-sm text-foreground line-clamp-1">
              {name}
            </h4>
          </div>

          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}

          {/* Price and Weight */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-1 text-xs">
              <DollarSign className="h-3 w-3 text-trail" />
              <span className="font-semibold text-trail">${price}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Weight className="h-3 w-3" />
              <span>{weight} lb</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
