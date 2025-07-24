"use client"

import { useParams } from "next/navigation"
import { DiabetesForm } from "@/components/forms/diabetes-form"
import { HeartDiseaseForm } from "@/components/forms/heart-disease-form"
import { KidneyDiseaseForm } from "@/components/forms/kidney-disease-form"
import { LiverDiseaseForm } from "@/components/forms/liver-disease-form"
import { CovidSymptomsForm } from "@/components/forms/covid-symptoms-form"
import { ImageUploadForm } from "@/components/forms/image-upload-form"
import { PredictionResult } from "@/components/prediction-result"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

interface PredictionResponse {
  prediction: number
  message: string
  details?: any
  error?: string
}

export default function DiseasePredictionPage() {
  const params = useParams()
  const disease = params.disease as string
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL || "http://localhost:8787" // Replace with your Cloudflare Worker URL

  const handlePredict = async (data: any, isImageUpload = false) => {
    setLoading(true)
    setError(null)
    setPredictionResult(null)

    try {
      let response
      if (isImageUpload) {
        const formData = new FormData()
        formData.append("image", data.image)
        response = await fetch(`${API_BASE_URL}/api/predict/${disease}`, {
          method: "POST",
          body: formData,
        })
      } else {
        response = await fetch(`${API_BASE_URL}/api/predict/${disease}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const result: PredictionResponse = await response.json()
      setPredictionResult(result)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
      console.error("Prediction error:", err)
    } finally {
      setLoading(false)
    }
  }

  const renderForm = () => {
    switch (disease) {
      case "diabetes":
        return <DiabetesForm onSubmit={handlePredict} loading={loading} />
      case "heart-disease":
        return <HeartDiseaseForm onSubmit={handlePredict} loading={loading} />
      case "kidney-disease":
        return <KidneyDiseaseForm onSubmit={handlePredict} loading={loading} />
      case "liver-disease":
        return <LiverDiseaseForm onSubmit={handlePredict} loading={loading} />
      case "covid-symptoms":
        return <CovidSymptomsForm onSubmit={handlePredict} loading={loading} />
      case "covid-detection":
        return (
          <ImageUploadForm onSubmit={(data) => handlePredict(data, true)} loading={loading} diseaseName="COVID-19" />
        )
      case "pneumonia-detection":
        return (
          <ImageUploadForm onSubmit={(data) => handlePredict(data, true)} loading={loading} diseaseName="Pneumonia" />
        )
      default:
        return (
          <p className="text-center text-muted-foreground">Disease prediction for &quot;{disease}&quot; not found.</p>
        )
    }
  }

  const getDiseaseTitle = (slug: string) => {
    switch (slug) {
      case "diabetes":
        return "Diabetes Prediction"
      case "heart-disease":
        return "Heart Disease Prediction"
      case "kidney-disease":
        return "Kidney Disease Prediction"
      case "liver-disease":
        return "Liver Disease Prediction"
      case "covid-symptoms":
        return "COVID-19 Symptom Prediction"
      case "covid-detection":
        return "COVID-19 Image Detection"
      case "pneumonia-detection":
        return "Pneumonia Image Detection"
      default:
        return "Unknown Disease"
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">{getDiseaseTitle(disease)}</h2>
      <p className="text-muted-foreground text-center">
        {disease.includes("detection")
          ? "Upload an image for prediction."
          : "Fill in the details below to get a prediction."}
      </p>

      {error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {renderForm()}

      {predictionResult && (
        <PredictionResult
          prediction={predictionResult.prediction}
          message={predictionResult.message}
          details={predictionResult.details}
        />
      )}
    </div>
  )
}
