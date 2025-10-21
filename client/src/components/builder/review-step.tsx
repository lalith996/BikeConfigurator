import { Frame, Component } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Weight, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewStepProps {
  brandName: string;
  selectedFrame?: Frame;
  selectedComponents: {
    fork?: Component;
    wheelset?: Component;
    groupset?: Component;
    brakes?: Component;
  };
  totalPrice: number;
  totalWeight: number;
  onEdit: (step: number) => void;
}

export function ReviewStep({
  brandName,
  selectedFrame,
  selectedComponents,
  totalPrice,
  totalWeight,
  onEdit,
}: ReviewStepProps) {
  const buildItems = [
    { label: "Brand", value: brandName, step: 1 },
    { label: "Frame", value: selectedFrame?.name, step: 2, price: selectedFrame?.price, weight: selectedFrame?.weight },
    { label: "Fork", value: selectedComponents.fork?.name, step: 3, price: selectedComponents.fork?.price, weight: selectedComponents.fork?.weight },
    { label: "Wheelset", value: selectedComponents.wheelset?.name, step: 3, price: selectedComponents.wheelset?.price, weight: selectedComponents.wheelset?.weight },
    { label: "Groupset", value: selectedComponents.groupset?.name, step: 3, price: selectedComponents.groupset?.price, weight: selectedComponents.groupset?.weight },
    { label: "Brakes", value: selectedComponents.brakes?.name, step: 3, price: selectedComponents.brakes?.price, weight: selectedComponents.brakes?.weight },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Review Your Build
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Review your custom bike configuration. You can edit any section before proceeding.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {buildItems.map((item) => (
          item.value && (
            <Card key={item.label} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                    {item.price && item.weight && (
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="h-3 w-3 text-trail" />
                          <span className="text-trail font-medium">${item.price}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Weight className="h-3 w-3" />
                          <span>{item.weight} lb</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(item.step)}
                    data-testid={`button-edit-${item.label.toLowerCase()}`}
                  >
                    <Edit2 className="h-3 w-3 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        ))}

        {/* Total Summary */}
        <Card className="border-2 border-trail/30 bg-trail/5">
          <CardContent className="p-6">
            <h3 className="font-heading font-semibold text-lg mb-4 text-foreground">
              Build Total
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Price:</span>
                <span className="text-2xl font-heading font-bold text-trail">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Weight:</span>
                <span className="text-xl font-heading font-bold text-foreground">
                  {totalWeight.toFixed(1)} lb
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
