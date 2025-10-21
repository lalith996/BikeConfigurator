import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, ArrowRight, Package } from "lucide-react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Build } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { toast } = useToast();

  const { data: builds = [], isLoading } = useQuery<Build[]>({
    queryKey: ["/api/cart"],
  });

  const deleteBuildMutation = useMutation({
    mutationFn: async (buildId: string) => {
      return await apiRequest("DELETE", `/api/cart/${buildId}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Removed from Cart",
        description: "Build removed successfully.",
      });
    },
  });

  const subtotal = builds.reduce((sum, build) => sum + parseFloat(build.totalPrice), 0);
  const shipping = subtotal > 50 ? 0 : 25;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (builds.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingCart className="h-24 w-24 text-muted-foreground/40 mx-auto mb-6" />
          <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Start building your dream bike to add it to your cart.
          </p>
          <Link href="/builder">
            <Button className="bg-trail hover:bg-trail text-trail-foreground" data-testid="button-start-building">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            Review your custom bike builds before checkout
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {builds.map((build) => (
              <Card key={build.id} className="border-border" data-testid={`cart-item-${build.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="font-medium">
                          Custom Build
                        </Badge>
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                        Custom Mountain Bike
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Frame: {build.frameId} • {parseFloat(build.totalWeight).toFixed(1)} lb total
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-2xl font-bold text-trail">
                        ${parseFloat(build.totalPrice).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {build.riderHeight && build.riderWeight && (
                        <p>
                          Rider: {build.riderHeight}" tall, {build.riderWeight} lbs
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteBuildMutation.mutate(build.id)}
                      disabled={deleteBuildMutation.isPending}
                      data-testid={`button-remove-${build.id}`}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-border sticky top-20">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-xl text-foreground mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">
                      {shipping === 0 ? (
                        <Badge variant="secondary" className="bg-chart-3/10 text-chart-3">
                          Free
                        </Badge>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-heading text-2xl font-bold text-trail">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-trail hover:bg-trail text-trail-foreground font-semibold mb-4"
                  size="lg"
                  data-testid="button-checkout"
                >
                  <Package className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                </Button>

                <Link href="/builder">
                  <Button variant="outline" className="w-full" data-testid="button-continue-building">
                    Continue Building
                  </Button>
                </Link>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    Free shipping on orders over $50 within the lower 48 United States
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
