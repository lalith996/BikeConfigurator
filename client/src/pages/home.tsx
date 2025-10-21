import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Bike, Wrench, Truck, Shield } from "lucide-react";
import heroImage from "@assets/generated_images/Mountain_biker_action_hero_88b33ecd.png";
import completeBike from "@assets/generated_images/Complete_custom_mountain_bike_5aea248a.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Mountain biker in action"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Custom Bike Builder
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Enter the Custom Mountain Bike Builder, where you become the creator of your dream ride. 
            This is more than just a bike; it's an extension of you and who you are on the trail.
          </p>
          <Link href="/builder">
            <Button
              size="lg"
              className="bg-trail hover:bg-trail text-trail-foreground font-semibold text-lg px-8 py-6 rounded-lg shadow-xl"
              data-testid="button-start-builder"
            >
              Start Building
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Custom is Our Specialty */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Custom is our specialty
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">
                Dream it. Build it. Ride it.
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our custom bike builder lets you spec every component of your perfect ride, 
                so your next bike fits your style better than any off-the-shelf build. 
                Each one is hand-assembled by our expert mechanics and shipped straight to your door.
              </p>
              <Link href="/builder">
                <Button
                  variant="outline"
                  size="lg"
                  className="font-semibold"
                  data-testid="button-build-custom"
                >
                  Build Your Custom Bike
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src={completeBike}
                alt="Custom mountain bike"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border hover-elevate">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Bike className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
                    Custom Builds
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Design every detail of your dream bike
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover-elevate">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
                    Expert Assembly
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Hand-built by professional mechanics
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover-elevate">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
                    Free Shipping
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Free shipping on orders over $50
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover-elevate">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
                    Quality Warranty
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    30-day returns on all products
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
