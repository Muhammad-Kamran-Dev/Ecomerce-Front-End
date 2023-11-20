import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen grid place-items-center ">
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="flex gap-5">
          <span className="border-r-2 border-gray-500 px-5"> 404</span> This
          page could not be found.
        </div>
        <Link href="/" className="text-orange-500 underline font-bold">
          Return Home
        </Link>
      </div>
    </div>
  );
}
