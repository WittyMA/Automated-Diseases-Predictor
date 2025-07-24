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
  age: z.coerce.number().min(0, "Cannot be negative").max(120, "Too old").default(40),
  gender: z.enum(["Male", "Female"], { required_error: "Please select gender." }).default("Male"),
  totalBilirubin: z.coerce.number().min(0, "Cannot be negative").max(100, "Too high").default(1.0),
  directBilirubin: z.coerce.number().min(0, "Cannot be negative").max(50, "Too high").default(0.2),
  alkalinePhosphotase: z.coerce.number().min(0, "Cannot be negative").max(2000, "Too high").default(180),
  alamineAminotransferase: z.coerce.number().min(0, "Cannot be negative").max(2000, "Too high").default(40),
  aspartateAminotransferase: z.coerce.number().min(0, "Cannot be negative").max(2000, "Too high").default(40),
  totalProtiens: z.coerce.number().min(0, "Cannot be negative").max(15, "Too high").default(7.0),
  albumin: z.coerce.number().min(0, "Cannot be negative").max(10, "Too high").default(3.5),
  albuminAndGlobulinRatio: z.coerce.number().min(0, "Cannot be negative").max(5, "Too high").default(1.0),
})

interface LiverDiseaseFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  loading: boolean
}

export function LiverDiseaseForm({ onSubmit, loading }: LiverDiseaseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 40,
      gender: "Male",
      totalBilirubin: 1.0,
      directBilirubin: 0.2,
      alkalinePhosphotase: 180,
      alamineAminotransferase: 40,
      aspartateAminotransferase: 40,
      totalProtiens: 7.0,
      albumin: 3.5,
      albuminAndGlobulinRatio: 1.0,
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
                <FormLabel>Total Bilirubin (mg/dL)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="Total Bilirubin" {...field} />
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
                <FormLabel>Direct Bilirubin (mg/dL)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="Direct Bilirubin" {...field} />
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
                <FormLabel>Alkaline Phosphotase (IU/L)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Alkaline Phosphotase" {...field} />
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
                <FormLabel>Alamine Aminotransferase (IU/L)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Alamine Aminotransferase" {...field} />
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
                <FormLabel>Aspartate Aminotransferase (IU/L)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Aspartate Aminotransferase" {...field} />
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
                <FormLabel>Total Protiens (g/dL)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="Total Protiens" {...field} />
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
                <FormLabel>Albumin (g/dL)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="Albumin" {...field} />
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
                  <Input type="number" step="0.1" placeholder="A/G Ratio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Predict Liver Disease
        </Button>
      </form>
    </Form>
  )
}
