export const TEAM_CAPACITY = 5;

export type Project = {
  id: string;
  domain: string;
  name: string;
  workflow: string;
};

export const projects: Project[] = [
  {
    id: "placement-prep-agent",
    domain: "Career / Placement",
    name: "Placement Preparation Agent",
    workflow:
      "Reads resume → analyzes job requirements → identifies gaps → creates learning plan → conducts mock interviews → tracks improvement",
  },
  {
    id: "campus-issue-resolution",
    domain: "Campus Operations",
    name: "Campus Issue Resolution Agentic System",
    workflow:
      "Receives complaints → categorizes them → assigns the right department → tracks resolution → escalates overdue issues",
  },
  {
    id: "farmer-decision-support",
    domain: "Agriculture",
    name: "Farmer Decision-Support Agent",
    workflow:
      "Uses weather/crop/soil information → plans activities → monitors conditions → alerts farmers → updates recommendations",
  },
  {
    id: "hospital-appointment-coordination",
    domain: "Healthcare Operations",
    name: "Hospital Appointment Coordination Agent",
    workflow:
      "Finds department → checks doctor availability → schedules/reschedules → sends reminders → handles conflicts",
  },
  {
    id: "autonomous-trip-planner",
    domain: "Travel",
    name: "Autonomous Trip Planner Agent",
    workflow:
      "Receives travel preferences → finds transport and stays → builds itinerary → checks budget and constraints → monitors changes → replans when needed",
  },
  {
    id: "content-creator-agent",
    domain: "Content Creation",
    name: "Instagram Content Creator Agent",
    workflow:
      "Receives content goal/topic → researches trends and audience interests → generates content ideas → creates script/caption → prepares visual/thumbnail brief → schedules publishing → analyzes performance → improves future content based on engagement",
  },
];
