export default function PosterPage() {
  return (
    <>
      <h1 className="page-title">Event Poster</h1>
      <p className="page-subtitle">
        A First Taste of Building Agentic AI Systems, a one day workshop by the Department of AI,
        Vishnu Women&apos;s University.
      </p>
      <div className="poster-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/poster.jpeg" alt="Event poster: A First Taste of Building Agentic AI Systems" />
      </div>
    </>
  );
}
