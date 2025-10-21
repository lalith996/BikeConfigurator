import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Package, Shield } from "lucide-react";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our custom bike builder, shipping, and warranties.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="general" data-testid="tab-general">
                <HelpCircle className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="shipping" data-testid="tab-shipping">
                <Package className="h-4 w-4 mr-2" />
                Shipping
              </TabsTrigger>
              <TabsTrigger value="warranty" data-testid="tab-warranty">
                <Shield className="h-4 w-4 mr-2" />
                Warranty
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card className="border-border">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="help-choose">
                      <AccordionTrigger className="font-semibold text-left" data-testid="faq-help-choose">
                        Can you help me choose parts?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        You can contact us through chat or email and we will be happy to assist you 
                        with your custom build. Our expert team can recommend components based on your 
                        riding style, terrain, and budget.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="build-time">
                      <AccordionTrigger className="font-semibold text-left" data-testid="faq-build-time">
                        How long will it take to build my bike?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        If all parts are in stock, the typical lead time is 7-10 days until it is ready 
                        to ship. We'll notify you of any delays if specific components are backordered.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="discount">
                      <AccordionTrigger className="font-semibold text-left" data-testid="faq-discount">
                        How does the discount work?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        The Custom Bike build applies an automatic discount when you add the build to the cart. 
                        The amount depends on the price level of build:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Builds over $5,000: 10% discount</li>
                          <li>Builds over $3,000: 5% discount</li>
                        </ul>
                        Note that products that are on sale are not discounted further.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="coupon">
                      <AccordionTrigger className="font-semibold text-left" data-testid="faq-coupon">
                        Can I use a coupon code?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        No, you cannot stack coupon codes with the automatic custom builder discount. 
                        The builder discount already provides significant savings on custom builds.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping">
              <Card className="border-border">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="shipping-method">
                      <AccordionTrigger className="font-semibold text-left" data-testid="faq-shipping-method">
                        How will you ship my custom bike?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Our Pro Pack shipping method ensures your bike arrives safely, properly tuned, 
                        and partially assembled. Your bike will be packaged in a reinforced box with 
                        protective materials to prevent damage during transit.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="international">
                      <AccordionTrigger className="font-semibold text-left" data-testid="faq-international">
                        Do you ship overseas?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, we ship all over the world. Shipping costs will apply, and will be added 
                        at checkout. We run discounts and promotions all year, so stay tuned for exclusive deals.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="shipping-time">
                      <AccordionTrigger className="font-semibold text-left" data-testid="faq-shipping-time">
                        How long will it take to get my order once shipped?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        It depends on where you are. Orders processed here will take 5-7 business days 
                        to arrive in the lower 48 United States. Overseas deliveries can take anywhere 
                        from 7-16 days. Delivery details will be provided in your confirmation email.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="free-shipping">
                      <AccordionTrigger className="font-semibold text-left" data-testid="faq-free-shipping">
                        Is shipping free?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Most orders $50 or more ship for free within the lower 48 United States. 
                        Custom bike builds typically qualify for free shipping.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="warranty">
              <Card className="border-border">
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="warranty-info">
                      <AccordionTrigger className="font-semibold text-left" data-testid="faq-warranty-info">
                        Is there a warranty?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        As your trusted source for all things mountain bike, we guarantee top quality in 
                        every product and bike we build. All components come with manufacturer warranties, 
                        and our assembly work is guaranteed for 30 days.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="returns">
                      <AccordionTrigger className="font-semibold text-left" data-testid="faq-returns">
                        What is your return policy?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Return your products within 30 days to get a full refund. Products must be in 
                        original condition and packaging. Some exceptions and terms apply to custom builds.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="defects">
                      <AccordionTrigger className="font-semibold text-left" data-testid="faq-defects">
                        What if I receive a defective component?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        If you receive a defective component, contact us immediately. We'll work with 
                        you to either replace the component or provide a full refund. All manufacturer 
                        defects are covered under warranty.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
