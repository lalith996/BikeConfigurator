import { Frame } from "@shared/schema";
import { ComponentCard } from "./component-card";

interface FrameSelectProps {
  frames: Frame[];
  selectedFrameId?: string;
  onSelectFrame: (frameId: string) => void;
}

export function FrameSelect({ frames, selectedFrameId, onSelectFrame }: FrameSelectProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Choose Your Frame
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The frame is the foundation of your build. Select the model that matches your riding style and terrain.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {frames.map((frame) => (
          <ComponentCard
            key={frame.id}
            id={frame.id}
            name={frame.name}
            brand={frame.brandId}
            image={frame.image}
            price={frame.price}
            weight={frame.weight}
            description={frame.description || undefined}
            isSelected={selectedFrameId === frame.id}
            onSelect={onSelectFrame}
            testId={`card-frame-${frame.id}`}
          />
        ))}
      </div>
    </div>
  );
}
