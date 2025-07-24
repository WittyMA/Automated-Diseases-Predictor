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
  bp: z.coerce.number().min(0, "Cannot be negative").max(180, "Too high").default(80), // Blood Pressure
  sg: z.coerce.number().min(1.0, "Too low").max(1.03, "Too high").default(1.015), // Specific Gravity
  al: z.coerce.number().min(0, "Cannot be negative").max(5, "Too high").default(0), // Albumin
  su: z.coerce.number().min(0, "Cannot be negative").max(5, "Too high").default(0), // Sugar
  rbc: z.enum(["normal", "abnormal"]).optional().default("normal"), // Red Blood Cells
  pc: z.enum(["normal", "abnormal"]).optional().default("normal"), // Pus Cell
  pcc: z.enum(["present", "notpresent"]).optional().default("present"), // Pus Cell Clumps
  ba: z.enum(["present", "notpresent"]).optional().default("present"), // Bacteria
  bgr: z.coerce.number().min(0, "Cannot be negative").max(500, "Too high").default(120), // Blood Glucose Random
  bu: z.coerce.number().min(0, "Cannot be negative").max(400, "Too high").default(40), // Blood Urea
  sc: z.coerce.number().min(0, "Cannot be negative").max(20, "Too high").default(1.2), // Serum Creatinine
  sod: z.coerce.number().min(0, "Cannot be negative").max(180, "Too high").default(140), // Sodium
  pot: z.coerce.number().min(0, "Cannot be negative").max(10, "Too high").default(4.0), // Potassium
  hemo: z.coerce.number().min(0, "Cannot be negative").max(20, "Too high").default(14.0), // Hemoglobin
  pcv: z.coerce.number().min(0, "Cannot be negative").max(60, "Too high").default(45), // Packed Cell Volume
  wc: z.coerce.number().min(0, "Cannot be negative").max(25000, "Too high").default(7000), // White Blood Cell Count
  rc: z.coerce.number().min(0, "Cannot be negative").max(10, "Too high").default(5.0), // Red Blood Cell Count
  htn: z.enum(["yes", "no"]).optional().default("no"), // Hypertension
  dm: z.enum(["yes", "no"]).optional().default("no"), // Diabetes Mellitus
  cad: z.enum(["yes", "no"]).optional().default("no"), // Coronary Artery Disease
  appet: z.enum(["good", "poor"]).optional().default("good"), // Appetite
  pe: z.enum(["yes", "no"]).optional().default("no"), // Pedal Edema
  ane: z.enum(["yes", "no"]).optional().default("no"), // Anemia
})

interface KidneyDiseaseFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  loading: boolean
}

export function KidneyDiseaseForm({ onSubmit, loading }: KidneyDiseaseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 40,
      bp: 80,
      sg: 1.015,
      al: 0,
      su: 0,
      rbc: "normal",
      pc: "normal",
      pcc: "present",
      ba: "present",
      bgr: 120,
      bu: 40,
      sc: 1.2,
      sod: 140,
      pot: 4.0,
      hemo: 14.0,
      pcv: 45,
      wc: 7000,
      rc: 5.0,
      htn: "no",
      dm: "no",
      cad: "no",
      appet: "good",
      pe: "no",
      ane: "no",
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
            name="bp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure (mmHg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Blood pressure" {...field} />
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
                  <Input type="number" step="0.001" placeholder="Specific gravity" {...field} />
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
                  <Input type="number" placeholder="Albumin" {...field} />
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
                  <Input type="number" placeholder="Sugar" {...field} />
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
                      <SelectValue placeholder="Select status" />
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
                      <SelectValue placeholder="Select status" />
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
                      <SelectValue placeholder="Select status" />
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
                      <SelectValue placeholder="Select status" />
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
                <FormLabel>Blood Glucose Random (mg/dl)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Blood glucose" {...field} />
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
                <FormLabel>Blood Urea (mg/dl)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Blood urea" {...field} />
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
                <FormLabel>Serum Creatinine (mg/dl)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="Serum creatinine" {...field} />
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
                  <Input type="number" placeholder="Sodium" {...field} />
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
                  <Input type="number" step="0.1" placeholder="Potassium" {...field} />
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
                <FormLabel>Hemoglobin (g/dl)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="Hemoglobin" {...field} />
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
                  <Input type="number" placeholder="Packed cell volume" {...field} />
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
                <FormLabel>White Blood Cell Count (cells/cumm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="White blood cell count" {...field} />
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
                  <Input type="number" step="0.1" placeholder="Red blood cell count" {...field} />
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
                      <SelectValue placeholder="Select status" />
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
                      <SelectValue placeholder="Select status" />
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
                      <SelectValue placeholder="Select status" />
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
                      <SelectValue placeholder="Select status" />
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
                      <SelectValue placeholder="Select status" />
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
                      <SelectValue placeholder="Select status" />
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
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Predict Kidney Disease
        </Button>
      </form>
    </Form>
  )
}
