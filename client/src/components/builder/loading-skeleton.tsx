import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BrandSelectSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Skeleton className="h-12 w-96 mx-auto mb-3" />
        <Skeleton className="h-6 w-128 mx-auto" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="aspect-video w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ComponentsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Skeleton className="h-12 w-96 mx-auto mb-3" />
        <Skeleton className="h-6 w-128 mx-auto" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-4">
              <Skeleton className="aspect-[4/3] mb-3" />
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
