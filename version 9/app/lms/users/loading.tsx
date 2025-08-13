import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function UsersLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="h-8 bg-neutral-700 rounded w-64 animate-pulse" />
          <div className="h-4 bg-neutral-700 rounded w-96 animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-neutral-700 rounded w-24 animate-pulse" />
          <div className="h-10 bg-neutral-700 rounded w-32 animate-pulse" />
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-neutral-900 border-neutral-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-3 bg-neutral-700 rounded w-20 animate-pulse" />
                  <div className="h-8 bg-neutral-700 rounded w-16 animate-pulse" />
                </div>
                <div className="w-8 h-8 bg-neutral-700 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="h-10 bg-neutral-700 rounded w-80 animate-pulse" />
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-8 bg-neutral-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 bg-neutral-700 rounded w-24 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Users Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-700 rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-neutral-700 rounded w-32 animate-pulse" />
                    <div className="h-3 bg-neutral-700 rounded w-24 animate-pulse" />
                  </div>
                </div>
                <div className="h-6 bg-neutral-700 rounded w-16 animate-pulse" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="h-3 bg-neutral-700 rounded w-full animate-pulse" />
                <div className="h-3 bg-neutral-700 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-neutral-700 rounded w-1/2 animate-pulse" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-neutral-700">
                <div className="h-3 bg-neutral-700 rounded w-16 animate-pulse" />
                <div className="h-6 w-6 bg-neutral-700 rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
