import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <button className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md" data-testid="link-home">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">CB</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground hidden sm:block">
                Custom Bikes
              </span>
            </button>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/">
              <button
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === "/" ? "text-foreground" : "text-muted-foreground"
                )}
                data-testid="link-nav-home"
              >
                Home
              </button>
            </Link>
            <Link href="/builder">
              <button
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === "/builder" ? "text-foreground" : "text-muted-foreground"
                )}
                data-testid="link-nav-builder"
              >
                Bike Builder
              </button>
            </Link>
            <Link href="/faq">
              <button
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === "/faq" ? "text-foreground" : "text-muted-foreground"
                )}
                data-testid="link-nav-faq"
              >
                FAQ
              </button>
            </Link>
          </div>

          {/* Cart Button */}
          <div className="flex items-center gap-2">
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative" data-testid="button-cart">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/">
                <button
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location === "/" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-mobile-home"
                >
                  Home
                </button>
              </Link>
              <Link href="/builder">
                <button
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location === "/builder" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-mobile-builder"
                >
                  Bike Builder
                </button>
              </Link>
              <Link href="/faq">
                <button
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location === "/faq" ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="link-mobile-faq"
                >
                  FAQ
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
