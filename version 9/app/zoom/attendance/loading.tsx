import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AttendanceLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-32 bg-neutral-800" />
          <Skeleton className="h-4 w-64 mt-2 bg-neutral-800" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32 bg-neutral-800" />
          <Skeleton className="h-10 w-24 bg-neutral-800" />
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2 bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <Skeleton className="h-10 w-full bg-neutral-800" />
          </CardContent>
        </Card>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="bg-neutral-900 border-neutral-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-3 w-24 bg-neutral-800" />
                  <Skeleton className="h-8 w-12 mt-2 bg-neutral-800" />
                </div>
                <Skeleton className="h-8 w-8 bg-neutral-800" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-neutral-900 border-neutral-700">
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-neutral-800" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 bg-neutral-800 rounded">
                  <Skeleton className="h-4 w-full mb-2 bg-neutral-700" />
                  <Skeleton className="h-3 w-32 mb-3 bg-neutral-700" />
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="text-center">
                        <Skeleton className="h-4 w-16 mx-auto mb-1 bg-neutral-700" />
                        <Skeleton className="h-6 w-8 mx-auto bg-neutral-700" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-2 w-full bg-neutral-700" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-neutral-800" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <Skeleton className="h-12 w-16 mx-auto mb-2 bg-neutral-800" />
                <Skeleton className="h-4 w-32 mx-auto bg-neutral-800" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-4 w-16 bg-neutral-800" />
                      <Skeleton className="h-4 w-12 bg-neutral-800" />
                    </div>
                    <Skeleton className="h-2 w-full bg-neutral-800" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
