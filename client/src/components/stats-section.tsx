import { useEffect, useRef, useState } from "react";

interface StatData {
  value: number;
  label: string;
  color: string;
}

const statsData: StatData[] = [
  { value: 2847, label: "Students Helped", color: "text-primary" },
  { value: 1234, label: "Gear Items Donated", color: "text-emerald-600" },
  { value: 156, label: "Free Classes Offered", color: "text-purple-600" },
  { value: 89, label: "Active Volunteers", color: "text-yellow-500" },
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
      const increment = stat.value / 100;
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
      }, 20);
    });
  };

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className={`text-4xl font-bold ${stat.color} mb-2 stat-counter`}
              >
                {animatedValues[index].toLocaleString()}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
