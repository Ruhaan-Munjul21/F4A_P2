import { useQuery } from "@tanstack/react-query";
import type { ScholarshipAthlete } from "@shared/schema";

export function useScholarshipAthletes() {
  return useQuery<ScholarshipAthlete[]>({
    queryKey: ["/api/scholarship-athletes"],
    queryFn: async () => {
      const response = await fetch("/api/scholarship-athletes");
      if (!response.ok) {
        throw new Error("Failed to fetch scholarship athletes");
      }
      const data = await response.json();

      // Parse achievements from JSON string to array
      return data.map((athlete: any) => ({
        ...athlete,
        achievements: athlete.achievements
          ? (typeof athlete.achievements === 'string'
              ? JSON.parse(athlete.achievements)
              : athlete.achievements)
          : []
      }));
    },
  });
}
