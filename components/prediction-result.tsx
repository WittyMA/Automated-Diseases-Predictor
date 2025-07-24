import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PredictionResultProps {
  prediction: {
    prediction: number
    message: string
    details?: any
  }
}

export default function PredictionResult({ prediction }: PredictionResultProps) {
  const isPositive = prediction.prediction === 1
  const resultText = isPositive ? "Positive" : "Negative"
  const resultColor = isPositive ? "text-red-600" : "text-green-600"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-semibold">
          Result: <span className={resultColor}>{resultText}</span>
        </p>
        <p className="text-muted-foreground">{prediction.message}</p>
        {prediction.details && (
          <div>
            <h3 className="font-semibold mt-4">Details:</h3>
            <pre className="mt-2 p-4 bg-gray-100 rounded-md text-sm overflow-auto">
              {JSON.stringify(prediction.details, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
