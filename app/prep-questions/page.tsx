export default function PrepQuestionsPage() {
  const questions = [
    "What is the problem you're solving?",
    "Who are the target users?",
    "What are their pain points?",
    "What do people do today, without this agent?",
    "Whose time and effort are you saving by solving this problem, and how?",
  ];

  return (
    <>
      <h1 className="page-title">Before the Workshop</h1>
      <p className="page-subtitle">
        Hey there! I&apos;m so glad you&apos;re joining us to learn about agents and what it
        takes to build real-world agentic AI applications.
      </p>
      <p className="page-subtitle">
        Your first step is to pick the problem you want to work on. Each team will have 5
        people, and once you&apos;re in, spend real time together understanding the problem
        before jumping into a solution. Think, discuss, debate, and use the questions below to
        guide you.
      </p>
      <p className="callout">
        <strong>
          Be ready to present your thinking when we meet for the workshop on September 26,
          2026.
        </strong>
      </p>
      <ol className="prep-list">
        {questions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>
    </>
  );
}
