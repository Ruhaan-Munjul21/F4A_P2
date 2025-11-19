"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentAge: "",
    parentName: "",
    email: "",
    phone: "",
    program: "youth",
    experience: "beginner",
    emergencyContact: "",
    emergencyPhone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    alert("Registration submitted successfully! We'll contact you within 24 hours.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="pt-32 pb-20 px-6 lg:px-12">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Register for Classes</h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Sign up for our free fencing programs. All experience levels welcome!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studentName" className="text-white">
              Student Name *
            </Label>
            <Input
              id="studentName"
              name="studentName"
              required
              value={formData.studentName}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentAge" className="text-white">
              Student Age *
            </Label>
            <Input
              id="studentAge"
              name="studentAge"
              type="number"
              required
              value={formData.studentAge}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentName" className="text-white">
              Parent/Guardian Name *
            </Label>
            <Input
              id="parentName"
              name="parentName"
              required
              value={formData.parentName}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              Phone *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program" className="text-white">
              Program *
            </Label>
            <select
              id="program"
              name="program"
              required
              value={formData.program}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-md bg-white/10 border border-white/20 text-white"
            >
              <option value="youth">Youth Classes</option>
              <option value="summer">Summer Camp</option>
              <option value="competition">Competition Training</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience" className="text-white">
              Experience Level *
            </Label>
            <select
              id="experience"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-md bg-white/10 border border-white/20 text-white"
            >
              <option value="beginner">Beginner (No experience)</option>
              <option value="intermediate">Intermediate (Some experience)</option>
              <option value="advanced">Advanced (Competitive experience)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact" className="text-white">
              Emergency Contact Name *
            </Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              required
              value={formData.emergencyContact}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyPhone" className="text-white">
              Emergency Contact Phone *
            </Label>
            <Input
              id="emergencyPhone"
              name="emergencyPhone"
              type="tel"
              required
              value={formData.emergencyPhone}
              onChange={handleChange}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FACC14] text-black hover:bg-[#FACC14]/90 h-12 text-lg font-medium rounded-full"
          >
            Submit Registration
          </Button>
        </form>
      </div>
    </section>
  )
}
