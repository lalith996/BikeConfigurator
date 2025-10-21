import { Frame, Component } from "@shared/schema";
import { cn } from "@/lib/utils";
import { ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BikeVisualizerProps {
  selectedFrame?: Frame;
  selectedComponents: {
    fork?: Component;
    wheelset?: Component;
    groupset?: Component;
    brakes?: Component;
  };
}

export function BikeVisualizer({ selectedFrame, selectedComponents }: BikeVisualizerProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 20, 60));

  return (
    <div className="sticky top-20 bg-card border border-card-border rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Your Build
        </h3>
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 60}
            data-testid="button-zoom-out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground w-12 text-center">
            {zoom}%
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            data-testid="button-zoom-in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bike Visualization Area */}
      <div className="relative aspect-[4/3] bg-muted/20 rounded-lg overflow-hidden flex items-center justify-center">
        {!selectedFrame ? (
          <div className="text-center p-8">
            <RotateCw className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Select a frame to begin building
            </p>
          </div>
        ) : (
          <div
            className="relative transition-all duration-300 ease-out"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* Layered Component Images */}
            <div className="relative">
              {/* Base Frame */}
              {selectedFrame && (
                <img
                  src={selectedFrame.image}
                  alt={selectedFrame.name}
                  className="w-full h-auto transition-opacity duration-300"
                  data-testid="img-frame"
                />
              )}

              {/* Overlaid Components */}
              <div className="absolute inset-0 flex items-center justify-center">
                {selectedComponents.fork && (
                  <img
                    src={selectedComponents.fork.image}
                    alt={selectedComponents.fork.name}
                    className={cn(
                      "absolute w-1/3 h-auto opacity-90 transition-all duration-300",
                      "left-[10%] top-[20%]"
                    )}
                    data-testid="img-fork"
                  />
                )}
                
                {selectedComponents.wheelset && (
                  <img
                    src={selectedComponents.wheelset.image}
                    alt={selectedComponents.wheelset.name}
                    className={cn(
                      "absolute w-1/2 h-auto opacity-90 transition-all duration-300",
                      "left-[25%] top-[30%]"
                    )}
                    data-testid="img-wheelset"
                  />
                )}

                {selectedComponents.groupset && (
                  <img
                    src={selectedComponents.groupset.image}
                    alt={selectedComponents.groupset.name}
                    className={cn(
                      "absolute w-1/4 h-auto opacity-90 transition-all duration-300",
                      "right-[30%] bottom-[25%]"
                    )}
                    data-testid="img-groupset"
                  />
                )}

                {selectedComponents.brakes && (
                  <img
                    src={selectedComponents.brakes.image}
                    alt={selectedComponents.brakes.name}
                    className={cn(
                      "absolute w-1/5 h-auto opacity-90 transition-all duration-300",
                      "left-[15%] top-[35%]"
                    )}
                    data-testid="img-brakes"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Components List */}
      {selectedFrame && (
        <div className="mt-6 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Selected Components
          </p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Frame:</span>
              <span className="font-medium text-foreground">{selectedFrame.name}</span>
            </div>
            {selectedComponents.fork && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Fork:</span>
                <span className="font-medium text-foreground">{selectedComponents.fork.name}</span>
              </div>
            )}
            {selectedComponents.wheelset && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Wheels:</span>
                <span className="font-medium text-foreground">{selectedComponents.wheelset.name}</span>
              </div>
            )}
            {selectedComponents.groupset && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Drivetrain:</span>
                <span className="font-medium text-foreground">{selectedComponents.groupset.name}</span>
              </div>
            )}
            {selectedComponents.brakes && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Brakes:</span>
                <span className="font-medium text-foreground">{selectedComponents.brakes.name}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
