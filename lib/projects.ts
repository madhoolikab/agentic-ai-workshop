export const TEAM_CAPACITY = 5;

export type Project = {
  id: string;
  domain: string;
  name: string;
  prompt: string;
  color: string;
  icon: string;
};

export const projects: Project[] = [
  {
    id: "placement-prep-agent",
    domain: "Career",
    name: "Placement & Career Prep",
    prompt:
      "Placement season buries students: tracking companies, rewriting resumes, prepping for each company's JDs, over and over. No way to tell if they're actually ready. And they're running on no sleep. Help.",
    color: "#b5502f",
    icon: "🎯",
  },
  {
    id: "campus-issue-resolution",
    domain: "Campus Operations",
    name: "Campus Issue Resolution",
    prompt:
      "Campus complaints get lost between departments, with no owner and no visibility into what's pending. How do you coordinate all of this and make campus life better?",
    color: "#3b4451",
    icon: "🏫",
  },
  {
    id: "farmer-decision-support",
    domain: "Agriculture",
    name: "Farmer Decision-Support",
    prompt:
      "Farmers make constant decisions: what to plant, when to irrigate, which fertilizer, which pesticide actually works. How can you support that work?",
    color: "#4d7358",
    icon: "🌾",
  },
  {
    id: "hospital-appointment-coordination",
    domain: "Healthcare Operations",
    name: "Hospital Appointment Coordination",
    prompt:
      "Booking a hospital appointment means calling around, guessing availability, and hoping nothing conflicts. Make it easy and stress-free to see a doctor.",
    color: "#7a4a68",
    icon: "🏥",
  },
  {
    id: "autonomous-trip-planner",
    domain: "Travel",
    name: "Autonomous Trip Planning",
    prompt:
      "Planning a trip with family or friends is stressful: best tickets, hotels, cabs, saving contacts, endless purchasing and packing. Could you use some help here?",
    color: "#1f6f6b",
    icon: "✈️",
  },
  {
    id: "content-creator-agent",
    domain: "Content Creation",
    name: "Content Creation",
    prompt:
      "One of the most demanding jobs out there, full of subjective calls. On top of that, there's heavy lifting in research, ideation, scripting, scheduling. Pick your battles wisely.",
    color: "#8a5a1f",
    icon: "📱",
  },
];
