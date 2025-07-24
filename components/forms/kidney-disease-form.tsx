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
  bp: z.coerce.number().min(0, "Must be non-negative"),
  sg: z.coerce.number().min(0, "Must be non-negative"),
  al: z.coerce.number().min(0, "Must be non-negative"),
  su: z.coerce.number().min(0, "Must be non-negative"),
  rbc: z.enum(["normal", "abnormal", ""], { message: "Please select a valid option" }).optional(),
  pc: z.enum(["normal", "abnormal", ""], { message: "Please select a valid option" }).optional(),
  pcc: z.enum(["present", "notpresent", ""], { message: "Please select a valid option" }).optional(),
  ba: z.enum(["present", "notpresent", ""], { message: "Please select a valid option" }).optional(),
  bgr: z.coerce.number().min(0, "Must be non-negative"),
  bu: z.coerce.number().min(0, "Must be non-negative"),
  sc: z.coerce.number().min(0, "Must be non-negative"),
  sod: z.coerce.number().min(0, "Must be non-negative"),
  pot: z.coerce.number().min(0, "Must be non-negative"),
  hemo: z.coerce.number().min(0, "Must be non-negative"),
  pcv: z.coerce.number().min(0, "Must be non-negative"),
  wc: z.coerce.number().min(0, "Must be non-negative"),
  rc: z.coerce.number().min(0, "Must be non-negative"),
  htn: z.enum(["yes", "no", ""], { message: "Please select a valid option" }).optional(),
  dm: z.enum(["yes", "no", ""], { message: "Please select a valid option" }).optional(),
  cad: z.enum(["yes", "no", ""], { message: "Please select a valid option" }).optional(),
  appet: z.enum(["good", "poor", ""], { message: "Please select a valid option" }).optional(),
  pe: z.enum(["yes", "no", ""], { message: "Please select a valid option" }).optional(),
  ane: z.enum(["yes", "no", ""], { message: "Please select a valid option" }).optional(),
})

interface KidneyDiseaseFormProps {
  setPrediction: Dispatch<SetStateAction<any>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setError: Dispatch<SetStateAction<string | null>>
}

export default function KidneyDiseaseForm({ setPrediction, setLoading, setError }: KidneyDiseaseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      bp: 0,
      sg: 0,
      al: 0,
      su: 0,
      rbc: "",
      pc: "",
      pcc: "",
      ba: "",
      bgr: 0,
      bu: 0,
      sc: 0,
      sod: 0,
      pot: 0,
      hemo: 0,
      pcv: 0,
      wc: 0,
      rc: 0,
      htn: "",
      dm: "",
      cad: "",
      appet: "",
      pe: "",
      ane: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setError(null)
    setPrediction(null)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL}/api/predict/kidney-disease`, {
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
            name="bp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure (mm/Hg)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Gravity</FormLabel>
                <FormControl>
                  <Input type="number" step="0.001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="al"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Albumin</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="su"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sugar</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rbc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Red Blood Cells</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="abnormal">Abnormal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pus Cell</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="abnormal">Abnormal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pcc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pus Cell Clumps</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="notpresent">Not Present</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ba"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bacteria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="notpresent">Not Present</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bgr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Glucose Random (mgs/dl)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Urea (mgs/dl)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serum Creatinine (mgs/dl)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sodium (mEq/L)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Potassium (mEq/L)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hemo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hemoglobin (gms)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pcv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Packed Cell Volume</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>White Blood Cell Count (cells/cmm)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Red Blood Cell Count (millions/cmm)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="htn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hypertension</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diabetes Mellitus</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coronary Artery Disease</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appetite</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pedal Edema</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ane"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anemia</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Predict Kidney Disease</Button>
      </form>
    </Form>
  )
}
