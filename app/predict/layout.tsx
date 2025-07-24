import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PredictLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container py-8 md:py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Disease Prediction</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
