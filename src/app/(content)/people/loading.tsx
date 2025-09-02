import { Spinner } from "@/components/ui/spinner/spinner";

export default function Loading() {
  return <div className="w-full h-screen bg-black flex items-center justify-center">
    <Spinner />
  </div>
}