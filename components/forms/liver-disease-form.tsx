"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Dispatch, SetStateAction } from "react"

const formSchema = z.object({
  age: z.coerce.number().min(0, "Must be non-negative"),
  gender: z.enum(["Male", "Female"], { message: "Please select a valid option" }),
  totalBilirubin: z.coerce.number().min(0, "Must be non-negative"),
  directBilirubin: z.coerce.number().min(0, "Must be non-negative"),
  alkalinePhosphotase: z.coerce.number().min(0, "Must be non-negative"),
  alamineAminotransferase: z.coerce.number().min(0, "Must be non-negative"),
  aspartateAminotransferase: z.coerce.number().min(0, "Must be non-negative"),
  totalProtiens: z.coerce.number().min(0, "Must be non-negative"),
  albumin: z.coerce.number().min(0, "Must be non-negative"),
  albuminAndGlobulinRatio: z.coerce.number().min(0, "Must be non-negative"),
})

interface LiverDiseaseFormProps {
  setPrediction: Dispatch<SetStateAction<any>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setError: Dispatch<SetStateAction<string | null>>
}

export default function LiverDiseaseForm({ setPrediction, setLoading, setError }: LiverDiseaseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      gender: "Male",
      totalBilirubin: 0,
      directBilirubin: 0,
      alkalinePhosphotase: 0,
      alamineAminotransferase: 0,
      aspartateAminotransferase: 0,
      totalProtiens: 0,
      albumin: 0,
      albuminAndGlobulinRatio: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setError(null)
    setPrediction(null)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL}/api/predict/liver-disease`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Prediction failed")
      }

      const data = await response.json()
      setPrediction(data)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalBilirubin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Bilirubin</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="directBilirubin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direct Bilirubin</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alkalinePhosphotase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alkaline Phosphotase</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alamineAminotransferase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamine Aminotransferase</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="aspartateAminotransferase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aspartate Aminotransferase</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalProtiens"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Protiens</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="albumin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Albumin</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="albuminAndGlobulinRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Albumin and Globulin Ratio</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Predict Liver Disease</Button>
      </form>
    </Form>
  )
}
