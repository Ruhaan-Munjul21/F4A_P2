import { MapPin, Phone, Mail } from "lucide-react"

export function LocationsSection() {
  const locations = [
    {
      name: "Main Training Facility",
      address: "123 Sports Drive, Your City, ST 12345",
      phone: "(555) 123-4567",
      email: "main@fencingforeveryone.org",
      hours: "Mon-Fri: 4pm-8pm, Sat: 9am-3pm",
    },
    {
      name: "Community Center Location",
      address: "456 Community Blvd, Your City, ST 12345",
      phone: "(555) 123-4568",
      email: "community@fencingforeveryone.org",
      hours: "Sat: 1pm-4pm, Sun: 10am-2pm",
    },
  ]

  return (
    <section className="py-20 px-6 lg:px-12">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Training Locations</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <div key={index} className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">{location.name}</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FACC14] flex-shrink-0 mt-1" />
                  <p className="text-white/70">{location.address}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#FACC14] flex-shrink-0" />
                  <p className="text-white/70">{location.phone}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#FACC14] flex-shrink-0" />
                  <p className="text-white/70">{location.email}</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/50 text-sm">Hours: {location.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
