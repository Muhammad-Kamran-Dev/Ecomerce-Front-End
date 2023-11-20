import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="grid w-11/12 grid-cols-1 mx-auto my-20 gap-y-20 xl:grid-cols-2 gap-x-10 ">
      <div className="flex h-screen gap-2">
        <div className="flex flex-col gap-3 animate-pulse">
          <Skeleton className="h-[200px] w-[150px] "></Skeleton>
          <Skeleton className="h-[200px] w-[150px] "></Skeleton>
          <Skeleton className="h-[200px] w-[150px] "></Skeleton>
          <Skeleton className="h-[200px] w-[150px] "></Skeleton>
          <Skeleton className="h-[200px] w-[150px]"></Skeleton>
        </div>
        <Skeleton className="flex-1 animate-pulse"></Skeleton>
      </div>
      <div className="flex flex-col h-screen gap-20">
        <div className="space-y-2 ">
          <Skeleton className="w-full h-6" />
          <Skeleton className="h-4 w-52" />
          <Skeleton className="w-32 h-4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-6" />
          <Skeleton className="h-4 w-52" />
        </div>
        <div className="space-y-5">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="h-4 w-52" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="h-4 w-52" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
