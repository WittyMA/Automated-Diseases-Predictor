import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2Icon, XCircleIcon } from "lucide-react"

interface PredictionResultProps {
  prediction: number
  message: string
  details?: any
}

export function PredictionResult({ prediction, message, details }: PredictionResultProps) {
  const isPositive = prediction === 1
  return (
    <Card className={isPositive ? "border-red-500" : "border-green-500"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Prediction Result</CardTitle>
        {isPositive ? (
          <XCircleIcon className="h-8 w-8 text-red-500" />
        ) : (
          <CheckCircle2Icon className="h-8 w-8 text-green-500" />
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className={`text-lg font-semibold ${isPositive ? "text-red-600" : "text-green-600"}`}>{message}</p>
        {details && (
          <div>
            <h3 className="text-md font-medium mb-2">Details:</h3>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
              <code>{JSON.stringify(details, null, 2)}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
