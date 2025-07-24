"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  pregnancies: z.coerce.number().min(0, "Cannot be negative").max(17, "Too many pregnancies").default(0),
  glucose: z.coerce.number().min(0, "Cannot be negative").max(200, "Too high").default(120),
  bloodPressure: z.coerce.number().min(0, "Cannot be negative").max(122, "Too high").default(70),
  skinThickness: z.coerce.number().min(0, "Cannot be negative").max(99, "Too high").default(20),
  insulin: z.coerce.number().min(0, "Cannot be negative").max(846, "Too high").default(80),
  bmi: z.coerce.number().min(0, "Cannot be negative").max(67.1, "Too high").default(25),
  diabetesPedigreeFunction: z.coerce.number().min(0, "Cannot be negative").max(2.42, "Too high").default(0.5),
  age: z.coerce.number().min(0, "Cannot be negative").max(120, "Too old").default(30),
})

interface DiabetesFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  loading: boolean
}

export function DiabetesForm({ onSubmit, loading }: DiabetesFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pregnancies: 0,
      glucose: 120,
      bloodPressure: 70,
      skinThickness: 20,
      insulin: 80,
      bmi: 25,
      diabetesPedigreeFunction: 0.5,
      age: 30,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="pregnancies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pregnancies</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Number of pregnancies" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="glucose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Glucose (mg/dL)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Glucose concentration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bloodPressure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure (mmHg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Diastolic blood pressure" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skinThickness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skin Thickness (mm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Triceps skin fold thickness" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="insulin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insulin (mu U/ml)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2-Hour serum insulin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bmi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BMI</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="Body Mass Index" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="diabetesPedigreeFunction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diabetes Pedigree Function</FormLabel>
                <FormControl>
                  <Input type="number" step="0.001" placeholder="Diabetes pedigree function" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Predict Diabetes
        </Button>
      </form>
    </Form>
  )
}
