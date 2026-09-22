import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Building Agentic AI Systems — Workshop",
  description:
    "Vishnu Women's University · Department of AI — a one day workshop on building agentic AI systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="brand">
              Building Agentic AI Systems
            </Link>
            <nav className="nav">
              <Link href="/">Projects &amp; Teams</Link>
              <Link href="/prep-questions">Prep Questions</Link>
              <Link href="/poster">Poster</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-block">
              <span className="footer-label">Speaker</span>
              <a
                href="https://www.linkedin.com/in/madhoolika/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Madhoolika B
              </a>
            </div>
            <div className="footer-divider" aria-hidden="true" />
            <div className="footer-block footer-block-right">
              <span className="footer-highlight">A First Taste of Building Agentic AI Systems</span>
              <span className="footer-meta">Vishnu Women&apos;s University, Bhimavaram</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
