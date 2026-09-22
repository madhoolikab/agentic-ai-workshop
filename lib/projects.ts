export const TEAM_CAPACITY = 5;

export type Project = {
  id: string;
  domain: string;
  name: string;
  workflow: string;
  color: string;
  icon: string;
};

export const projects: Project[] = [
  {
    id: "placement-prep-agent",
    domain: "Career / Placement",
    name: "Placement Preparation Agent",
    workflow:
      "Reads resume → analyzes job requirements → identifies gaps → creates learning plan → conducts mock interviews → tracks improvement",
    color: "#b5502f",
    icon: "🎯",
  },
  {
    id: "campus-issue-resolution",
    domain: "Campus Operations",
    name: "Campus Issue Resolution Agentic System",
    workflow:
      "Receives complaints → categorizes them → assigns the right department → tracks resolution → escalates overdue issues",
    color: "#3b4451",
    icon: "🏫",
  },
  {
    id: "farmer-decision-support",
    domain: "Agriculture",
    name: "Farmer Decision-Support Agent",
    workflow:
      "Uses weather/crop/soil information → plans activities → monitors conditions → alerts farmers → updates recommendations",
    color: "#4d7358",
    icon: "🌾",
  },
  {
    id: "hospital-appointment-coordination",
    domain: "Healthcare Operations",
    name: "Hospital Appointment Coordination Agent",
    workflow:
      "Finds department → checks doctor availability → schedules/reschedules → sends reminders → handles conflicts",
    color: "#7a4a68",
    icon: "🏥",
  },
  {
    id: "autonomous-trip-planner",
    domain: "Travel",
    name: "Autonomous Trip Planner Agent",
    workflow:
      "Takes travel preferences → finds transport and stays → builds itinerary → checks budget and constraints → monitors changes → replans when needed",
    color: "#1f6f6b",
    icon: "✈️",
  },
  {
    id: "content-creator-agent",
    domain: "Content Creation",
    name: "Instagram Content Creator Agent",
    workflow:
      "Receives content topic → researches trends → generates ideas → creates script → prepares visual brief → schedules publishing",
    color: "#8a5a1f",
    icon: "📱",
  },
];
