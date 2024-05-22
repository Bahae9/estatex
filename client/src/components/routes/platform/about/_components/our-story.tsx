const COMPANY_HISTORY = [
  {
    year: 2020,
    title: "Adaptation and Resilience",
    description:
      "Quick response to the challenges of the pandemic, adaptation of sales and rental processes to ensure the safety of all.",
  },
  {
    year: 2022,
    title: "Regional Expansion",
    description:
      "Opening of new branches in several key regions, significantly increasing our reach and impact on the local real estate market.",
  },
  {
    year: 2023,
    title: "Expansion and Innovation",
    description:
      "Launch of new technologies to improve real estate management and customer experience. Introduction of an interactive online platform.",
  },
  {
    year: 2024,
    title: "Sustainable Growth",
    description:
      "Focus on sustainability and expansion of the real estate portfolio with eco-friendly projects. Establishment of strategic partnerships.",
  },
];

const OurStory = () => {
  return (
    <section className="py-20 min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-60px)] flex justify-center items-center bg-muted">
      <div className="container max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-4xl font-semibold sm:text-5xl">
            Our Agency's Story
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
            Discover the faces behind our success. Our dedicated experts are
            ready to assist you with all your real estate projects.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-4 pt-10 sm:grid-cols-2">
          {COMPANY_HISTORY.map(({ description, title, year }) => (
            <div
              className="rounded-lg border p-6 shadow-sm transition-all bg-white"
              key={year}
            >
              <div className="space-y-2">
                <div className="text-2xl font-bold">{year}</div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p
                  className="text-muted-foreground line-clamp-4"
                  title={description}
                >
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
