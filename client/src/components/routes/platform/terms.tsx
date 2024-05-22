import Footer from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TERMS = [
  {
    id: "1",
    title: "Acceptance of Terms",
    description:
      "By accessing or using our website, mobile application, or any of our services, you agree to comply with these Terms of Use. If you do not agree with any part of these terms, you may not access our services.",
  },
  {
    id: "2",
    title: "Service Description",
    description:
      "EstateX offers a wide range of real estate management services, including property listing, tenant management with payment and repair tracking, as well as maintenance service coordination, all accessible through our secure online platform and other communication channels.",
  },
  {
    id: "3",
    title: "Account Registration",
    description:
      "To benefit from the full functionality of our services, you will need to create a personal account. You are required to keep your account information confidential and agree to take responsibility for all activities performed under your account.",
  },
  {
    id: "4",
    title: "User Conduct",
    description:
      "By using our services, you agree to use them only for lawful purposes and in accordance with these Terms of Use. You agree to refrain from any conduct that violates applicable laws or regulations or constitutes abusive use of our services.",
  },
  {
    id: "5",
    title: "Property Listings",
    description:
      "EstateX displays real estate listings from owners or third parties. While we strive to ensure the accuracy and completeness of these listings, we cannot guarantee that they are always up-to-date or free from errors.",
  },
  {
    id: "6",
    title: "Fees and Payments",
    description:
      "Some services offered by EstateX may be subject to fees. By using these services, you agree to pay the applicable fees according to the terms indicated on our platform or communicated in any other way.",
  },
  {
    id: "7",
    title: "Intellectual Property",
    description:
      "All content on our platform, such as text, graphics, logos, images, and software, is the property of EstateX or its licensors and is protected by copyright and other applicable intellectual property laws.",
  },
  {
    id: "8",
    title: "Privacy Policy",
    description:
      "Your use of our services is also subject to our Privacy Policy, which specifies how we collect, use, and protect your personal information. By using our services, you consent to your personal information being processed in accordance with this Privacy Policy.",
  },
  {
    id: "9",
    title: "Termination",
    description:
      "EstateX reserves the right to terminate or suspend your access to our services at any time, without notice or liability, if you violate these Terms of Use or for any other reason deemed necessary by EstateX.",
  },
  {
    id: "10",
    title: "Changes to Terms",
    description:
      "EstateX reserves the right to modify or update these Terms of Use at any time. We will inform you of any changes by posting the new terms on our platform. Your continued use of our services after such modifications constitutes your acceptance of the new terms.",
  },
];

const Terms = () => {
  return (
    <>
      <section className="py-20 min-h-[calc(100vh-126px)] lg:min-h-[calc(100vh-130px)] flex justify-center items-center">
        <div className="container max-w-7xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="max-w-[1000px] font-semibold text-5xl">
              Terms of Use
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-xl">
              Welcome to EstateX's Terms of Use. By using our services, you
              agree to these conditions.
            </p>
          </div>
          <div className="mt-8 grid gap-0 md:gap-8 md:grid-cols-2 px-4">
            <Accordion type="multiple" className="w-full">
              {TERMS.slice(0, 5).map(({ id, title, description }) => (
                <AccordionItem value={id}>
                  <AccordionTrigger className="gap-2 text-start text-xl font-medium">
                    {title}
                  </AccordionTrigger>
                  <AccordionContent className="text-start text-base text-muted-foreground">
                    {description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Accordion type="multiple" className="w-full">
              {TERMS.slice(5).map(({ id, title, description }) => (
                <AccordionItem value={id}>
                  <AccordionTrigger className="gap-2 text-start text-xl font-medium">
                    {title}
                  </AccordionTrigger>
                  <AccordionContent className="text-start text-base text-muted-foreground">
                    {description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Terms;
