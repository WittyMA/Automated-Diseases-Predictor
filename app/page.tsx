import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  ArrowRightIcon,
  HeartPulseIcon,
  CigaretteIcon as LungsIcon,
  SyringeIcon,
  BabyIcon as KidneyIcon,
  LeafIcon as LiverIcon,
  ComputerIcon as VirusIcon,
} from "lucide-react"

interface DiseaseCardProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
}

function DiseaseCard({ title, description, href, icon }: DiseaseCardProps) {
  return (
    <Link href={href}>
      <Card className="group hover:shadow-lg transition-shadow duration-200 ease-in-out h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardContent>
        <div className="p-6 pt-0 flex justify-end">
          <ArrowRightIcon className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </Link>
  )
}

export default function HomePage() {
  const diseases = [
    {
      title: "Diabetes Prediction",
      description: "Predict the likelihood of diabetes based on health metrics.",
      href: "/predict/diabetes",
      icon: <SyringeIcon className="h-8 w-8 text-red-500" />,
    },
    {
      title: "Heart Disease Prediction",
      description: "Assess the risk of heart disease using various health indicators.",
      href: "/predict/heart-disease",
      icon: <HeartPulseIcon className="h-8 w-8 text-pink-500" />,
    },
    {
      title: "Kidney Disease Prediction",
      description: "Predict chronic kidney disease based on blood and urine tests.",
      href: "/predict/kidney-disease",
      icon: <KidneyIcon className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Liver Disease Prediction",
      description: "Estimate the risk of liver disease from patient records.",
      href: "/predict/liver-disease",
      icon: <LiverIcon className="h-8 w-8 text-green-500" />,
    },
    {
      title: "COVID-19 Symptom Prediction",
      description: "Predict COVID-19 based on reported symptoms.",
      href: "/predict/covid-symptoms",
      icon: <VirusIcon className="h-8 w-8 text-purple-500" />,
    },
    {
      title: "COVID-19 Image Detection",
      description: "Detect COVID-19 from chest X-ray images.",
      href: "/predict/covid-detection",
      icon: <LungsIcon className="h-8 w-8 text-orange-500" />,
    },
    {
      title: "Pneumonia Image Detection",
      description: "Identify pneumonia from chest X-ray images.",
      href: "/predict/pneumonia-detection",
      icon: <LungsIcon className="h-8 w-8 text-yellow-500" />,
    },
  ]

  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl mb-4">HealthPredict AI</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your real-time multimodal disease prediction system. Empowering health decisions with AI.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {diseases.map((disease) => (
          <DiseaseCard key={disease.title} {...disease} />
        ))}
      </div>
    </section>
  )
}
