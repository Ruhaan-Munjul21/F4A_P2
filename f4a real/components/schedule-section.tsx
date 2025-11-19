export function ScheduleSection() {
  const schedule = [
    { day: "Monday", time: "4:00 PM - 6:00 PM", program: "Youth Classes - Beginner", location: "Main Gym" },
    { day: "Tuesday", time: "4:00 PM - 6:00 PM", program: "Youth Classes - Intermediate", location: "Main Gym" },
    { day: "Wednesday", time: "4:00 PM - 6:00 PM", program: "Competition Training", location: "Main Gym" },
    { day: "Thursday", time: "4:00 PM - 6:00 PM", program: "Youth Classes - Advanced", location: "Main Gym" },
    { day: "Friday", time: "4:00 PM - 6:00 PM", program: "Open Practice", location: "Main Gym" },
    { day: "Saturday", time: "9:00 AM - 12:00 PM", program: "Competition Training", location: "Main Gym" },
    { day: "Saturday", time: "1:00 PM - 3:00 PM", program: "Youth Classes - All Levels", location: "Community Center" },
  ]

  return (
    <section className="py-20 px-6 lg:px-12 bg-white/5">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Class Schedule & Locations</h2>

        <div className="bg-[#252525] rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 bg-white/5 border-b border-white/10 font-semibold text-white">
            <div>Day</div>
            <div>Time</div>
            <div>Program</div>
            <div>Location</div>
          </div>

          {schedule.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
            >
              <div className="text-white font-medium">{item.day}</div>
              <div className="text-white/70">{item.time}</div>
              <div className="text-white/70">{item.program}</div>
              <div className="text-[#FACC14]">{item.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
