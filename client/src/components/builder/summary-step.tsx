import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { riderInfoSchema, RiderInfo } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { CheckCircle2, HelpCircle, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SummaryStepProps {
  onComplete: (riderInfo: RiderInfo) => void;
  isCompleting?: boolean;
}

export function SummaryStep({ onComplete, isCompleting }: SummaryStepProps) {
  const form = useForm<RiderInfo>({
    resolver: zodResolver(riderInfoSchema),
    defaultValues: {
      riderWeight: 150,
      riderHeight: 68,
      saddleHeight: 700,
      tshirtSize: undefined,
    },
  });

  const onSubmit = (data: RiderInfo) => {
    onComplete(data);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle2 className="h-16 w-16 text-chart-3 mx-auto mb-4" />
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Your dream build is almost complete!
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          You're almost there! This is the final step before we get your custom build rolling. 
          Just fill in a few quick details so we can dial in your fit. Want a free t-shirt? Just choose a size!
        </p>
      </div>

      <Card className="max-w-2xl mx-auto border-border">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
              Rider Info
            </h3>
            <p className="text-sm text-muted-foreground">
              Once you've filled out your info, click "Complete Build" to add your custom bike 
              to the cart and your Fanatik Custom Discount will be applied there.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="riderWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rider Weight (lbs)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="150"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        data-testid="input-rider-weight"
                      />
                    </FormControl>
                    <FormDescription>
                      Your weight including riding gear
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="riderHeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rider Height (inches)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="68"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        data-testid="input-rider-height"
                      />
                    </FormControl>
                    <FormDescription>
                      Just your height in inches
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="saddleHeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Saddle Height (mm)
                      <Dialog>
                        <DialogTrigger asChild>
                          <button type="button" className="hover-elevate p-1 rounded">
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Need help with measurements?</DialogTitle>
                            <DialogDescription className="space-y-3 pt-4">
                              <p>
                                <strong>Saddle Height:</strong> Measure from the top of your lower pedal 
                                to the top of your saddle with the dropper fully extended.
                              </p>
                              <p>
                                If you're not sure or don't have a bike yet, just enter 1 and we'll 
                                reach out before starting on your build.
                              </p>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="700"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        data-testid="input-saddle-height"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tshirtSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>T-Shirt Size (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-tshirt-size">
                          <SelectValue placeholder="Select a size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="XS">XS</SelectItem>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                        <SelectItem value="XXL">XXL</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Want a free t-shirt? Select your size!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-trail hover:bg-trail text-trail-foreground font-semibold"
                disabled={isCompleting}
                data-testid="button-complete-build"
              >
                {isCompleting ? (
                  "Adding to Cart..."
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Complete Build
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
