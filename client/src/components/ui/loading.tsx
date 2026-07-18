import { Loader2Icon } from "lucide-react"

const loading = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2Icon className="h-8 w-8 animate-spin text-green-500"/>
    </div>
  )
}

export default loading
