import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressStep {
  id: number;
  label: string;
  status: "completed" | "current" | "upcoming";
}

interface ProgressIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  const progressSteps: ProgressStep[] = steps.map((label, index) => ({
    id: index + 1,
    label,
    status: index + 1 < currentStep ? "completed" : index + 1 === currentStep ? "current" : "upcoming",
  }));

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full py-6 bg-card border-b border-card-border">
      <div className="container mx-auto px-4">
        {/* Progress Bar */}
        <div className="relative mb-8">
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-chart-3 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="flex justify-between items-start">
          {progressSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all duration-300",
                  step.status === "completed" && "bg-chart-3 border-chart-3 text-white",
                  step.status === "current" && "bg-primary border-primary text-primary-foreground scale-110 shadow-lg",
                  step.status === "upcoming" && "bg-muted border-muted-foreground/30 text-muted-foreground"
                )}
                data-testid={`progress-step-${step.id}`}
              >
                {step.status === "completed" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              
              {/* Step Label */}
              <div
                className={cn(
                  "mt-2 text-xs md:text-sm font-medium text-center transition-colors",
                  step.status === "completed" && "text-chart-3",
                  step.status === "current" && "text-primary font-semibold",
                  step.status === "upcoming" && "text-muted-foreground"
                )}
              >
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.label.split(" ")[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
