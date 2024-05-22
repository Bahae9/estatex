import {
  CalendarClock,
  DollarSign,
  Heart,
  Sprout,
  ShieldCheck,
  Rocket,
} from "lucide-react";

const OUR_SERVICES = [
  {
    title: "Real Estate Rental",
    Icon: CalendarClock,
    description:
      "Our real estate rental service offers an exceptional user experience, combining speed, efficiency, and trust to find the best properties suited to our clients' needs. We ensure attentive follow-up and transparent communication throughout the process.",
  },
  {
    title: "Real Estate Sales",
    Icon: DollarSign,
    description:
      "We facilitate the real estate sales process with a personalized and professional approach, ensuring trust and satisfaction to maximize our clients' results. We offer innovative sales solutions and expert advice.",
  },
  {
    title: "Real Estate Consulting",
    Icon: Heart,
    description:
      "Our real estate experts provide insightful and personalized advice, focused on trust and excellence, to support you in your real estate projects. We emphasize a positive user experience and tailored solutions.",
  },
  {
    title: "Continuous Improvement",
    Icon: Sprout,
    description:
      "We are committed to continuously improving our agency and services by integrating the latest technologies and best practices to offer our clients a high-quality experience. This ensures high customer satisfaction and optimal management of your real estate projects.",
  },
  {
    title: "Trust",
    Icon: ShieldCheck,
    description:
      "We place paramount importance on trust in our relationships with clients. We work with transparency and honesty, ensuring secure and reliable transactions.",
  },
  {
    title: "Best User Experience",
    Icon: Rocket,
    description:
      "We aim to provide the best user experience possible through personalized services, attentive support, and a client-focused approach. Our goal is to ensure your satisfaction at every stage of your real estate project.",
  },
];

const OurServices = () => {
  return (
    <section className="py-20 min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-60px)] flex justify-center items-center bg-muted">
      <div className="container max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-4xl font-semibold sm:text-5xl">Our Services</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
            Discover our comprehensive range of services designed to meet your
            specific needs and provide customized solutions.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-4 pt-10 sm:grid-cols-2 xl:grid-cols-3">
          {OUR_SERVICES.map(({ description, Icon, title }) => (
            <div
              className="rounded-lg border bg-white p-6 shadow-sm transition-all"
              key={title}
            >
              <div className="flex flex-col gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 mb-2">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p
                  className="text-muted-foreground line-clamp-2"
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

export default OurServices;
