import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Weight } from "lucide-react";

interface PriceWeightTrackerProps {
  totalPrice: number;
  totalWeight: number;
  discount?: number;
}

export function PriceWeightTracker({ totalPrice, totalWeight, discount = 0 }: PriceWeightTrackerProps) {
  const finalPrice = totalPrice - discount;

  return (
    <Card className="border-border shadow-lg sticky top-20">
      <CardContent className="p-6">
        <h3 className="font-heading font-semibold text-lg mb-4 text-foreground">
          Build Summary
        </h3>
        
        <div className="space-y-4">
          {/* Price */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-trail/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-trail" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Price</p>
                {discount > 0 && (
                  <p className="text-xs line-through text-muted-foreground">
                    ${totalPrice.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-heading font-bold text-trail" data-testid="text-total-price">
                ${finalPrice.toFixed(2)}
              </p>
              {discount > 0 && (
                <p className="text-xs text-chart-3">
                  Save ${discount.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Weight */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Weight className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Weight</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-heading font-bold text-foreground" data-testid="text-total-weight">
                {totalWeight.toFixed(1)} lb
              </p>
              <p className="text-xs text-muted-foreground">
                ({(totalWeight * 0.453592).toFixed(1)} kg)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
