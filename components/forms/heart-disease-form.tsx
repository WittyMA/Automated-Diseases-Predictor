"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  age: z.coerce.number().min(0, "Cannot be negative").max(120, "Too old").default(50),
  sex: z.enum(["0", "1"], { required_error: "Please select sex." }).default("1"), // 1 = male, 0 = female
  cp: z.enum(["0", "1", "2", "3"], { required_error: "Please select chest pain type." }).default("0"), // Chest pain type
  trestbps: z.coerce.number().min(0, "Cannot be negative").max(200, "Too high").default(120), // Resting blood pressure
  chol: z.coerce.number().min(0, "Cannot be negative").max(600, "Too high").default(200), // Serum cholestoral in mg/dl
  fbs: z.enum(["0", "1"], { required_error: "Please select fasting blood sugar." }).default("0"), // Fasting blood sugar > 120 mg/dl (1 = true; 0 = false)
  restecg: z.enum(["0", "1", "2"], { required_error: "Please select resting ECG." }).default("0"), // Resting electrocardiographic results
  thalach: z.coerce.number().min(0, "Cannot be negative").max(220, "Too high").default(150), // Maximum heart rate achieved
  exang: z.enum(["0", "1"], { required_error: "Please select exercise induced angina." }).default("0"), // Exercise induced angina (1 = yes; 0 = no)
  oldpeak: z.coerce.number().min(0, "Cannot be negative").max(10, "Too high").default(1.0), // ST depression induced by exercise relative to rest
  slope: z.enum(["0", "1", "2"], { required_error: "Please select the slope." }).default("0"), // The slope of the peak exercise ST segment
  ca: z.enum(["0", "1", "2", "3", "4"], { required_error: "Please select number of major vessels." }).default("0"), // Number of major vessels (0-3) colored by flourosopy
  thal: z.enum(["0", "1", "2", "3"], { required_error: "Please select thal." }).default("0"), // Thalassemia (0 = normal; 1 = fixed defect; 2 = reversible defect; 3 = normal)
})

interface HeartDiseaseFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  loading: boolean
}

export function HeartDiseaseForm({ onSubmit, loading }: HeartDiseaseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 50,
      sex: "1",
      cp: "0",
      trestbps: 120,
      chol: 200,
      fbs: "0",
      restecg: "0",
      thalach: 150,
      exang: "0",
      oldpeak: 1.0,
      slope: "0",
      ca: "0",
      thal: "0",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Age in years" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sex</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sex" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Male</SelectItem>
                    <SelectItem value="0">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chest Pain Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chest pain type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Typical Angina</SelectItem>
                    <SelectItem value="1">Atypical Angina</SelectItem>
                    <SelectItem value="2">Non-anginal Pain</SelectItem>
                    <SelectItem value="3">Asymptomatic</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="trestbps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resting Blood Pressure (mmHg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Resting blood pressure" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cholesterol (mg/dl)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Serum cholesterol" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fbs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fasting Blood Sugar &gt; 120 mg/dl</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Yes</SelectItem>
                    <SelectItem value="0">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="restecg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resting Electrocardiographic Results</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Normal</SelectItem>
                    <SelectItem value="1">ST-T wave abnormality</SelectItem>
                    <SelectItem value="2">Left ventricular hypertrophy</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thalach"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Heart Rate Achieved</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Maximum heart rate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exang"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise Induced Angina</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Yes</SelectItem>
                    <SelectItem value="0">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oldpeak"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ST Depression</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="ST depression" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slope"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slope of Peak Exercise ST Segment</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select slope" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Upsloping</SelectItem>
                    <SelectItem value="1">Flat</SelectItem>
                    <SelectItem value="2">Downsloping</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Major Vessels (0-3)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of vessels" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4 (Unknown/Other)</SelectItem> {/* Some datasets have 4 */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thalassemia</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select thal type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Unknown</SelectItem> {/* Some datasets have 0 for unknown */}
                    <SelectItem value="1">Normal</SelectItem>
                    <SelectItem value="2">Fixed Defect</SelectItem>
                    <SelectItem value="3">Reversible Defect</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Predict Heart Disease
        </Button>
      </form>
    </Form>
  )
}
