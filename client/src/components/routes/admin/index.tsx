import StatusCard from "@/components/shared/cards/status-card";
import { Building, MessageSquare, Pickaxe, Users } from "lucide-react";
import ContractsTable from "./_components/contracts-table";
import TransactionsTable from "./_components/transactions-table";
import { useLoaderData } from "react-router-dom";
import { ContractProps, TransactionProps } from "@/types/db";

const Admin = () => {
  const {
    counts: { agentCount, feedbackCount, realEstateCount, userCount },
    transactions,
    contracts,
  } = useLoaderData() as {
    counts: {
      userCount: number;
      agentCount: number;
      feedbackCount: number;
      realEstateCount: number;
    };
    transactions: TransactionProps[];
    contracts: ContractProps[];
  };
  const statusCards = [
    {
      title: "Real Estates",
      description: "Manages data of properties available for sale or rent.",
      total: realEstateCount,
      Icon: Building,
      to: "real-estates",
    },
    {
      title: "Clients",
      description:
        "Contains information about clients, including buyers and sellers.",
      total: userCount,
      Icon: Users,
      to: "clients",
    },
    {
      title: "Agents",
      description:
        "Lists agents and their details to facilitate interaction management.",
      total: agentCount,
      Icon: Pickaxe,
      to: "agents",
    },
    {
      title: "Feedback",
      description: "Archives users' feedback and comments on services.",
      total: feedbackCount,
      Icon: MessageSquare,
      to: "feedbacks",
    },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((el) => (
          <StatusCard key={el.to} {...el} />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_3fr] 2xl:grid-cols-[3fr_2fr] gap-4">
        <TransactionsTable transactions={transactions} />
        <ContractsTable contracts={contracts} />
      </div>
    </div>
  );
};

export default Admin;
