"use client"
import { Skeleton } from "@/components/ui/custom-skelton"

export function HeroSectionSkeleton() {
  return (
    <div className="flex items-center justify-center w-full flex-col px-4 md:space-y-10 space-y-4 min-h-[50vh]">
      <Skeleton className="h-12 w-3/4 md:w-1/2 lg:w-1/3 rounded-lg" />
      <div className="space-y-2 w-full max-w-xl mx-auto">
        <Skeleton className="h-6 w-full rounded-lg" />
        <Skeleton className="h-6 w-5/6 mx-auto rounded-lg" />
      </div>
    </div>
  )
}

export function WorldMapSkeleton() {
  return (
    <div className="md:px-40 w-full -mt-32">
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  )
}

export default function LayoutSkeleton() {
  return (
    <>
      <WorldMapSkeleton />
      {/* <div className="md:px-40 w-full space-y-4 mt-8">
        <Skeleton className="h-8 w-1/2 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-lg" />
        <Skeleton className="h-4 w-4/5 rounded-lg" />
      </div> */}
    </>
  )
}

