import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface PredictLayoutProps {
  children: React.ReactNode
}

export default function PredictLayout({ children }: PredictLayoutProps) {
  const diseases = [
    { name: "Diabetes", href: "/predict/diabetes" },
    { name: "Heart Disease", href: "/predict/heart-disease" },
    { name: "Kidney Disease", href: "/predict/kidney-disease" },
    { name: "Liver Disease", href: "/predict/liver-disease" },
    { name: "COVID-19 Symptoms", href: "/predict/covid-symptoms" },
    { name: "COVID-19 Detection (Image)", href: "/predict/covid-detection" },
    { name: "Pneumonia Detection (Image)", href: "/predict/pneumonia-detection" },
  ]

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 py-8">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="space-y-4 py-8">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">Disease Prediction</h4>
          <div className="grid gap-1">
            {diseases.map((disease) => (
              <Link
                key={disease.name}
                href={disease.href}
                className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
              >
                {disease.name}
              </Link>
            ))}
          </div>
        </div>
      </aside>
      <main className="flex w-full flex-col overflow-hidden">{children}</main>
    </div>
  )
}
