import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TEAM = [
  {
    fullName: "Djaidri Chouabi",
    role: "General Director",
    description:
      "Djaidri, aged 22, is the founder and visionary driving force of the agency. With more than twenty years of experience in the real estate sector, he is passionate about innovation and sustainable development. Outside of work, he enjoys sailing and photography.",
    imgUrl: "/avatars/djaidri.jpg",
  },
  {
    fullName: "Ferkacha Aymen",
    role: "Marketing Director",
    description:
      "Ferkacha, 21, leads the agency's marketing strategy. Creative and forward-thinking, he works to strengthen the agency's market presence. In his free time, Sébastien is a cinema enthusiast and loves exploring visual arts.",
    imgUrl: "/avatars/ferkacha.jpg",
  },
  {
    fullName: "Lmtaii Bahaa",
    role: "Project Manager for Rentals",
    description:
      "Lmtaii, 21, manages all aspects of rentals within the agency. Precise and organized, he ensures smooth operations. Julien is a big football fan and spends his free time coaching a youth team.",
    imgUrl: "/avatars/lmtaii.jpg",
  },
  {
    fullName: "Saadi Zaid",
    role: "Sales Manager",
    description:
      "Saadi, 22, leads the sales team with contagious dynamism. He has expertise in negotiation and customer relations, always seeking the best deal for his clients. Passionate about mountains, he practices mountaineering and skiing.",
    imgUrl: "/avatars/saadi.jpg",
  },
];

const MeetTeam = () => {
  return (
    <section className="py-20">
      <div className="container max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-4xl font-semibold sm:text-5xl">Meet Our Team</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
            Get to know the passionate professionals who make up our team. Their
            expertise and commitment are at the heart of our success.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 xl:grid-cols-4 lg:gap-12">
          {TEAM.map(({ description, fullName, role, imgUrl }) => (
            <div
              className="flex flex-col items-center space-y-4"
              key={fullName}
            >
              <Avatar className="h-36 w-36">
                <AvatarImage src={imgUrl} className="object-cover" />
                <AvatarFallback>{fullName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <h3 className="text-lg font-semibold">{fullName}</h3>
                <p className="text-muted-foreground">{role}</p>
                <p
                  className="text-sm text-muted-foreground line-clamp-4"
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

export default MeetTeam;
