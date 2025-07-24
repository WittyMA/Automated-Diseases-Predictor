"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DiabetesForm from "@/components/forms/diabetes-form"
import HeartDiseaseForm from "@/components/forms/heart-disease-form"
import KidneyDiseaseForm from "@/components/forms/kidney-disease-form"
import LiverDiseaseForm from "@/components/forms/liver-disease-form"
import CovidSymptomsForm from "@/components/forms/covid-symptoms-form"
import ImageUploadForm from "@/components/forms/image-upload-form"
import PredictionResult from "@/components/prediction-result"
import { useState } from "react"

export default function DiseasePredictionPage() {
  const params = useParams()
  const disease = params.disease as string
  const [prediction, setPrediction] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getForm = () => {
    switch (disease) {
      case "diabetes":
        return <DiabetesForm setPrediction={setPrediction} setLoading={setLoading} setError={setError} />
      case "heart-disease":
        return <HeartDiseaseForm setPrediction={setPrediction} setLoading={setLoading} setError={setError} />
      case "kidney-disease":
        return <KidneyDiseaseForm setPrediction={setPrediction} setLoading={setLoading} setError={setError} />
      case "liver-disease":
        return <LiverDiseaseForm setPrediction={setPrediction} setLoading={setLoading} setError={setError} />
      case "covid-symptoms":
        return <CovidSymptomsForm setPrediction={setPrediction} setLoading={setLoading} setError={setError} />
      case "covid-detection":
        return (
          <ImageUploadForm
            disease="covid-detection"
            setPrediction={setPrediction}
            setLoading={setLoading}
            setError={setError}
          />
        )
      case "pneumonia-detection":
        return (
          <ImageUploadForm
            disease="pneumonia-detection"
            setPrediction={setPrediction}
            setLoading={setLoading}
            setError={setError}
          />
        )
      default:
        return <p>Select a disease from the sidebar.</p>
    }
  }

  const getTitle = () => {
    switch (disease) {
      case "diabetes":
        return "Diabetes Prediction"
      case "heart-disease":
        return "Heart Disease Prediction"
      case "kidney-disease":
        return "Kidney Disease Prediction"
      case "liver-disease":
        return "Liver Disease Prediction"
      case "covid-symptoms":
        return "COVID-19 Symptoms Prediction"
      case "covid-detection":
        return "COVID-19 Detection (Image)"
      case "pneumonia-detection":
        return "Pneumonia Detection (Image)"
      default:
        return "Disease Prediction"
    }
  }

  const getDescription = () => {
    switch (disease) {
      case "diabetes":
        return "Enter the patient's details to predict the likelihood of diabetes."
      case "heart-disease":
        return "Provide the patient's cardiovascular information for heart disease prediction."
      case "kidney-disease":
        return "Input the patient's lab results to assess kidney disease risk."
      case "liver-disease":
        return "Fill in the patient's liver-related parameters for liver disease prediction."
      case "covid-symptoms":
        return "Select the symptoms experienced by the patient to predict COVID-19 likelihood."
      case "covid-detection":
        return "Upload a chest X-ray image for COVID-19 detection."
      case "pneumonia-detection":
        return "Upload a chest X-ray image for pneumonia detection."
      default:
        return "Select a disease from the sidebar to get started with predictions."
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{getTitle()}</CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </CardHeader>
        <CardContent>{getForm()}</CardContent>
      </Card>

      {loading && (
        <Card>
          <CardHeader>
            <CardTitle>Predicting...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please wait while we process your request.</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {prediction && !loading && !error && <PredictionResult prediction={prediction} />}
    </div>
  )
}
