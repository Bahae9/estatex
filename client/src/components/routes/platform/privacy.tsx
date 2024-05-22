import Footer from "@/components/footer";

const PRIVACY = [
  {
    id: "1",
    title: "Information Collection",
    description:
      "We collect personal information when you register on our platform, fill out a form, or use our services. This information may include your name, email address, phone number, and other data necessary to provide our services.",
  },
  {
    id: "2",
    title: "Use of Information",
    description:
      "The information we collect may be used to personalize your experience and meet your individual needs, improve our customer service, process transactions, or send you periodic emails containing updates about our services, etc.",
  },
  {
    id: "3",
    title: "Information Protection",
    description:
      "We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or transfer your personal information to third parties without your consent, except as required by law.",
  },
  {
    id: "4",
    title: "Cookies",
    description:
      "We use cookies to understand and save your preferences for future visits, and compile aggregate data about site traffic and interactions to improve the site experience and tools in the future.",
  },
  {
    id: "5",
    title: "Disclosure to Third Parties",
    description:
      "We do not sell, trade, or transfer your personally identifiable information to third parties. This does not include trusted third parties who assist us in operating our website or conducting our business, as long as those parties agree to keep this information confidential.",
  },
  {
    id: "6",
    title: "Consent",
    description:
      "By using our site, you expressly consent to our strictly enforced privacy policy.",
  },
];

const Privacy = () => {
  return (
    <>
      <section className="py-20 min-h-[calc(100vh-126px)] lg:min-h-[calc(100vh-130px)] flex justify-center items-center">
        <div className="container max-w-7xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-semibold text-5xl">Privacy Policy</h2>
            <p className="max-w-[900px] text-muted-foreground text-xl">
              We ensure the security of your data. Discover how in our privacy
              policy. Your privacy is our priority.
            </p>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-4 pt-10 sm:grid-cols-2 xl:grid-cols-3">
            {PRIVACY.map(({ description, title, id }) => (
              <div
                className="rounded-lg border bg-white p-6 shadow-sm transition-all"
                key={id}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p
                    className="text-muted-foreground line-clamp-3"
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
      <Footer />
    </>
  );
};

export default Privacy;
