import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { ProgressIndicator } from "@/components/builder/progress-indicator";
import { BikeVisualizer } from "@/components/builder/bike-visualizer";
import { PriceWeightTracker } from "@/components/builder/price-weight-tracker";
import { BrandSelect } from "@/components/builder/brand-select";
import { FrameSelect } from "@/components/builder/frame-select";
import { ComponentSelect } from "@/components/builder/component-select";
import { ReviewStep } from "@/components/builder/review-step";
import { SummaryStep } from "@/components/builder/summary-step";
import { BrandSelectSkeleton, ComponentsSkeleton } from "@/components/builder/loading-skeleton";
import { Brand, Frame, Component, RiderInfo } from "@shared/schema";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const STEPS = ["Brand", "Frame", "Components", "Review", "Summary"];

export default function Builder() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBrandId, setSelectedBrandId] = useState<string>();
  const [selectedFrameId, setSelectedFrameId] = useState<string>();
  const [selectedComponents, setSelectedComponents] = useState<{
    fork?: string;
    wheelset?: string;
    groupset?: string;
    brakes?: string;
  }>({});

  // Fetch brands
  const { data: brands = [], isLoading: brandsLoading } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  // Fetch frames
  const { data: frames = [], isLoading: framesLoading } = useQuery<Frame[]>({
    queryKey: ["/api/frames", selectedBrandId],
    enabled: !!selectedBrandId,
  });

  // Get selected frame to determine wheel size for compatibility
  const selectedFrameData = frames.find((f) => f.id === selectedFrameId);
  const wheelSizeForFilter = selectedFrameData?.wheelSize;

  // Fetch components (filter by selected frame's wheel size for compatibility)
  const { data: components = [], isLoading: componentsLoading } = useQuery<Component[]>({
    queryKey: ["/api/components", wheelSizeForFilter],
    enabled: !!selectedFrameId && !!wheelSizeForFilter,
    queryFn: async () => {
      const url = wheelSizeForFilter ? `/api/components?wheelSize=${wheelSizeForFilter}` : "/api/components";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch components");
      return response.json();
    },
  });

  // Save build mutation
  const saveBuildMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/builds", data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/builds"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Build Complete!",
        description: "Your custom bike has been added to the cart.",
      });
      setLocation("/cart");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save your build. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Get selected objects
  const selectedBrand = brands.find((b) => b.id === selectedBrandId);
  const selectedFrame = frames.find((f) => f.id === selectedFrameId);
  const selectedComponentObjects = {
    fork: components.find((c) => c.id === selectedComponents.fork),
    wheelset: components.find((c) => c.id === selectedComponents.wheelset),
    groupset: components.find((c) => c.id === selectedComponents.groupset),
    brakes: components.find((c) => c.id === selectedComponents.brakes),
  };

  // Calculate totals
  const totalPrice = [
    selectedFrame,
    selectedComponentObjects.fork,
    selectedComponentObjects.wheelset,
    selectedComponentObjects.groupset,
    selectedComponentObjects.brakes,
  ].reduce((sum, item) => sum + (item ? parseFloat(item.price) : 0), 0);

  const totalWeight = [
    selectedFrame,
    selectedComponentObjects.fork,
    selectedComponentObjects.wheelset,
    selectedComponentObjects.groupset,
    selectedComponentObjects.brakes,
  ].reduce((sum, item) => sum + (item ? parseFloat(item.weight) : 0), 0);

  const discount = totalPrice > 5000 ? totalPrice * 0.1 : totalPrice > 3000 ? totalPrice * 0.05 : 0;

  const handleNext = () => {
    if (currentStep === 1 && !selectedBrandId) {
      toast({
        title: "Brand Required",
        description: "Please select a brand to continue.",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 2 && !selectedFrameId) {
      toast({
        title: "Frame Required",
        description: "Please select a frame to continue.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedBrandId(undefined);
    setSelectedFrameId(undefined);
    setSelectedComponents({});
  };

  const handleCompleteBuild = (riderInfo: RiderInfo) => {
    if (!selectedBrandId || !selectedFrameId) return;

    const buildData = {
      brandId: selectedBrandId,
      frameId: selectedFrameId,
      forkId: selectedComponents.fork,
      wheelsetId: selectedComponents.wheelset,
      groupsetId: selectedComponents.groupset,
      brakesId: selectedComponents.brakes,
      totalPrice: (totalPrice - discount).toString(),
      totalWeight: totalWeight.toString(),
      ...riderInfo,
    };

    saveBuildMutation.mutate(buildData);
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator currentStep={currentStep} steps={STEPS} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  data-testid="button-back"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  data-testid="button-restart"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Restart
                </Button>
              </div>

              {currentStep < STEPS.length && (
                <Button
                  onClick={handleNext}
                  className="bg-trail hover:bg-trail text-trail-foreground"
                  data-testid="button-next"
                >
                  {currentStep === STEPS.length - 1 ? "Review" : "Next"}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>

            <div className="min-h-[600px]">
              {currentStep === 1 && (
                brandsLoading ? (
                  <BrandSelectSkeleton />
                ) : (
                  <BrandSelect
                    brands={brands}
                    selectedBrandId={selectedBrandId}
                    onSelectBrand={setSelectedBrandId}
                  />
                )
              )}

              {currentStep === 2 && (
                framesLoading ? (
                  <ComponentsSkeleton />
                ) : (
                  <FrameSelect
                    frames={frames}
                    selectedFrameId={selectedFrameId}
                    onSelectFrame={setSelectedFrameId}
                  />
                )
              )}

              {currentStep === 3 && (
                componentsLoading ? (
                  <ComponentsSkeleton />
                ) : (
                  <ComponentSelect
                    components={components}
                    selectedComponents={selectedComponents}
                    onSelectComponent={(category, id) =>
                      setSelectedComponents((prev) => ({ ...prev, [category]: id }))
                    }
                  />
                )
              )}

              {currentStep === 4 && selectedBrand && (
                <ReviewStep
                  brandName={selectedBrand.name}
                  selectedFrame={selectedFrame}
                  selectedComponents={selectedComponentObjects}
                  totalPrice={totalPrice}
                  totalWeight={totalWeight}
                  onEdit={setCurrentStep}
                />
              )}

              {currentStep === 5 && (
                <SummaryStep
                  onComplete={handleCompleteBuild}
                  isCompleting={saveBuildMutation.isPending}
                />
              )}
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1 space-y-6">
            <BikeVisualizer
              selectedFrame={selectedFrame}
              selectedComponents={selectedComponentObjects}
            />
            
            {selectedFrame && (
              <PriceWeightTracker
                totalPrice={totalPrice}
                totalWeight={totalWeight}
                discount={discount}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
