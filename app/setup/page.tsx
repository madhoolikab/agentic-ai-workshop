const SKILLS_ZIP_URL =
  "https://drive.google.com/file/d/1xw8KjiWCT7vAhWNae7gaF94sK0ym9V8j/view?usp=sharing";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-link">
      {children}
    </a>
  );
}

const claudeSteps = [
  <>
    Download the <strong>Grill Me</strong> skill zip file from{" "}
    <Ext href={SKILLS_ZIP_URL}>Google Drive</Ext> and save it on your computer. Do not unzip it.
  </>,
  <>
    Sign in at <Ext href="https://claude.ai">claude.ai</Ext>. If you do not have an account yet,
    create one first. Then open <strong>Settings</strong> from your profile menu.
  </>,
  <>
    Go to <strong>Capabilities</strong> and make sure{" "}
    <strong>Cloud code execution and file creation</strong> is turned on. Skills need this to work.
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/setup-capabilities.webp"
      alt="The Capabilities page in claude.ai settings with Cloud code execution and file creation turned on"
      className="step-image"
    />
  </>,
  <>
    In the left sidebar under <strong>Customize</strong>, click <strong>Skills</strong>, then
    choose the option to upload a skill.
  </>,
  <>
    Choose the zip file you downloaded. Claude will add the Grill Me skill to your account and
    show it in the list.
  </>,
  <>
    Turn the skill on with its toggle. Start a new chat and ask Claude to grill you on an idea, to
    check that it works.
  </>,
];

const githubSteps = [
  <>
    Go to <Ext href="https://github.com/signup">github.com</Ext> and create an account. Use an
    email address you check often, and verify it when GitHub sends you a confirmation.
  </>,
  <>
    Choose a simple username and note it down. You will use the same GitHub account to sign in to
    Backgrounder, and your teammates will need your username to add you.
  </>,
  <>
    Agree within your team on <strong>one person</strong> who will create the repository. Each team
    needs exactly one repository for its project.
  </>,
  <>
    That person clicks the <strong>+</strong> icon at the top right of GitHub, then{" "}
    <strong>New repository</strong>. Give it a clear name, for example the name of your project,
    and click <strong>Create repository</strong>.
  </>,
  <>
    In the new repository, open <strong>Settings</strong>, then <strong>Collaborators</strong>,
    and click <strong>Add people</strong>. Add every teammate by their GitHub username.
  </>,
  <>
    Each teammate opens the invitation from their email, or from the notifications on GitHub, and
    accepts it. Once accepted, everyone on the team can work in the same repository.
  </>,
];

const backgrounderSteps = [
  <>
    Go to <Ext href="https://backgrounder.dev/">backgrounder.dev</Ext> and create an account using
    your <strong>GitHub</strong> account, so it is linked to the same GitHub ID you set up above.
  </>,
  <>
    When Backgrounder asks for permission to connect to GitHub, review what it asks for and
    approve it.
  </>,
  <>
    Give Backgrounder access to your <strong>team&apos;s project repository</strong>, the one you
    created in the GitHub step. Do not give it access to repositories that are not part of the
    workshop.
  </>,
  <>
    Check that your project repository now shows up inside Backgrounder. If it does not, go back
    and check that you have accepted the collaborator invitation on GitHub.
  </>,
];

const sections = [
  {
    title: "Set up Claude",
    hint: "Add the Grill Me skill to your claude.ai account",
    steps: claudeSteps,
  },
  {
    title: "Set up GitHub",
    hint: "Create your account, and one repository per team",
    steps: githubSteps,
  },
  {
    title: "Set up Backgrounder",
    hint: "Sign in with GitHub and give it access to your project repository",
    steps: backgrounderSteps,
  },
];

export default function SetupPage() {
  return (
    <>
      <h1 className="page-title">System Setup</h1>
      <p className="page-subtitle">
        Please finish these three setups before the workshop so we can spend our time building. It
        should take about twenty minutes in total.
      </p>
      <p className="callout">
        <strong>Click on each setup below to open its instructions.</strong> If you get stuck at any
        point, tell me and we will sort it out.
      </p>

      <div className="setup-list">
        {sections.map((section, i) => (
          <details className="setup-item" key={section.title}>
            <summary>
              <span className="setup-num">{i + 1}</span>
              <span className="setup-heading">
                <span className="setup-title">{section.title}</span>
                <span className="setup-hint">{section.hint}</span>
              </span>
              <span className="setup-cta">
                <span className="setup-cta-open">Show steps</span>
                <span className="setup-cta-close">Hide steps</span>
              </span>
              <span className="setup-chevron" aria-hidden="true" />
            </summary>
            <ol className="prep-list setup-steps">
              {section.steps.map((s, j) => (
                <li key={j}>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </details>
        ))}
      </div>
    </>
  );
}
