import { useEffect, useRef, useState } from "react";

interface StatData {
  value: number;
  label: string;
  color: string;
  suffix?: string;
}

const statsData: StatData[] = [
  { value: 50, label: "Students Helped", color: "text-primary", suffix: "+" },
  { value: 63, label: "Sets of Gear Collected", color: "text-emerald-600", suffix: "+" },
  { value: 2, label: "Scholarship Athletes", color: "text-purple-600" },
  { value: 2000, label: "Raised", color: "text-yellow-500", suffix: "$+" },
];

export default function StatsSection() {
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    statsData.forEach((stat, index) => {
      let currentValue = 0;
      const increment = stat.value / 50; // Slower animation for smaller numbers
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= stat.value) {
          currentValue = stat.value;
          clearInterval(timer);
        }
        setAnimatedValues((prev) => {
          const newValues = [...prev];
          newValues[index] = Math.floor(currentValue);
          return newValues;
        });
      }, 30); // Slightly slower for better effect
    });
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Impact in <span className="text-primary">Numbers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from our community's dedication to making fencing accessible to everyone
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div
                className={`text-4xl md:text-5xl lg:text-6xl font-bold ${stat.color} mb-3 stat-counter transition-all duration-300`}
              >
                {stat.suffix?.includes("$") && "$"}
                {animatedValues[index].toLocaleString()}
                {stat.suffix?.includes("+") && "+"}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
