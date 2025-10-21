import { Component, ComponentCategory } from "@shared/schema";
import { ComponentCard } from "./component-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ComponentSelectProps {
  components: Component[];
  selectedComponents: {
    fork?: string;
    wheelset?: string;
    groupset?: string;
    brakes?: string;
  };
  onSelectComponent: (category: string, componentId: string) => void;
}

export function ComponentSelect({
  components,
  selectedComponents,
  onSelectComponent,
}: ComponentSelectProps) {
  const categories = [
    { key: ComponentCategory.FORK, label: "Fork" },
    { key: ComponentCategory.WHEELSET, label: "Wheelset" },
    { key: ComponentCategory.GROUPSET, label: "Groupset" },
    { key: ComponentCategory.BRAKES, label: "Brakes" },
  ];

  const getComponentsByCategory = (category: string) => {
    return components.filter((c) => c.category === category);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Build Your Dream Bike
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select premium components for each category. Watch your build come together in real-time.
        </p>
      </div>

      <Tabs defaultValue={ComponentCategory.FORK} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          {categories.map((category) => (
            <TabsTrigger
              key={category.key}
              value={category.key}
              className="font-semibold"
              data-testid={`tab-${category.key}`}
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.key} value={category.key} className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getComponentsByCategory(category.key).map((component) => (
                <ComponentCard
                  key={component.id}
                  id={component.id}
                  name={component.name}
                  brand={component.brand}
                  image={component.image}
                  price={component.price}
                  weight={component.weight}
                  description={component.description || undefined}
                  isSelected={
                    selectedComponents[category.key as keyof typeof selectedComponents] ===
                    component.id
                  }
                  onSelect={(id) => onSelectComponent(category.key, id)}
                  isPopular={component.id.includes("1")}
                  testId={`card-${category.key}-${component.id}`}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
