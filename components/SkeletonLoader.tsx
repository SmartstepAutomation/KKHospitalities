export default function SkeletonLoader() {
  return (
    <div className="animate-pulse flex flex-col gap-4">
      <div className="bg-gray-200 aspect-[4/3] rounded-3xl w-full"></div>
      <div className="h-6 bg-gray-200 rounded-full w-3/4 px-4"></div>
      <div className="h-4 bg-gray-200 rounded-full w-1/2 px-4"></div>
      <div className="flex justify-between items-center px-4 mt-2">
         <div className="h-8 bg-gray-200 rounded-full w-1/3"></div>
         <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
      </div>
    </div>
  );
}
