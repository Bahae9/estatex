import { Card, CardContent } from "@/components/ui/card";
import { Building, MessageSquare, Pickaxe, Users } from "lucide-react";

const Statics = ({
  counts,
}: {
  counts: {
    userCount: number;
    agentCount: number;
    feedbackCount: number;
    realEstateCount: number;
  };
}) => {
  const { agentCount, feedbackCount, realEstateCount, userCount } = counts;
  const statusCards = [
    {
      title: "Real Estates",
      description: "Total number of real estates listed on our website",
      total: realEstateCount,
      Icon: Building,
    },
    {
      title: "Clients",
      description: "Total number of clients on our website",
      total: userCount,
      Icon: Users,
    },
    {
      title: "Agents",
      description: "Total number of agents listed on our website",
      total: agentCount,
      Icon: Pickaxe,
    },
    {
      title: "Feedback",
      description:
        "Total number of feedback provided by clients on our services",
      total: feedbackCount,
      Icon: MessageSquare,
    },
  ];
  return (
    <section>
      <div className="px-6 md:px-8 grid gap-6 md:gap-8">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statusCards.map(({ Icon, description, title, total }) => (
            <Card key={title}>
              <CardContent className="p-6 flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-6 h-6" />
                  <h3 className="text-xl font-semibold pt-0.5">{title}</h3>
                </div>
                <div className="text-3xl font-bold">+{total}</div>
                <p
                  className="text-muted-foreground line-clamp-2"
                  title={description}
                >
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statics;
