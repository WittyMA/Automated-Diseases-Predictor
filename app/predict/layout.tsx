import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function PredictLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container py-8 md:py-12 lg:py-16">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6 md:p-8 lg:p-10">{children}</CardContent>
      </Card>
    </section>
  )
}
