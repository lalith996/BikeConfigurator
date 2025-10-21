import { Card, CardContent } from "@/components/ui/card";
import { Brand } from "@shared/schema";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandSelectProps {
  brands: Brand[];
  selectedBrandId?: string;
  onSelectBrand: (brandId: string) => void;
}

export function BrandSelect({ brands, selectedBrandId, onSelectBrand }: BrandSelectProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Select brand to begin
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose your preferred mountain bike brand. Each brand offers unique frame geometries and ride characteristics.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card
            key={brand.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover-elevate active-elevate-2",
              selectedBrandId === brand.id
                ? "border-2 border-trail shadow-lg ring-2 ring-trail/20"
                : "border-border hover:shadow-xl"
            )}
            onClick={() => onSelectBrand(brand.id)}
            data-testid={`card-brand-${brand.id}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                    {brand.name}
                  </h3>
                  {brand.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {brand.description}
                    </p>
                  )}
                </div>
                <div
                  className={cn(
                    "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ml-3",
                    selectedBrandId === brand.id
                      ? "bg-trail border-trail"
                      : "border-muted-foreground/30 bg-background"
                  )}
                >
                  {selectedBrandId === brand.id && (
                    <Check className="h-4 w-4 text-trail-foreground" />
                  )}
                </div>
              </div>

              {brand.logo && (
                <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center p-4">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
