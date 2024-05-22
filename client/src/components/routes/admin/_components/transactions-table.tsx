import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionProps } from "@/types/db";
import { Link } from "react-router-dom";

export default function TransactionsTable({
  transactions,
}: {
  transactions: TransactionProps[];
}) {
  return (
    <Card className="xl:max-w-xl 2xl:max-w-full">
      <CardHeader className="flex flex-row gap-6 space-y-0">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription
            className="line-clamp-2"
            title="Les cinq derniers transactions signés aujourd'hui"
          >
            Last five transactions will be displayed in this table.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="transactions">
            See All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {transactions && transactions.length > 0 ? (
          <Table className="table-auto">
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Id</TableHead>
                <TableHead>RealEstate Id</TableHead>
                <TableHead>Contract Id</TableHead>
                <TableHead>Agent Id</TableHead>
                <TableHead>Buyer Id</TableHead>
                <TableHead className="text-right">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map(
                ({
                  id,
                  agentId,
                  buyerId,
                  contractId,
                  realEstateId,
                  createdAt,
                }) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{realEstateId}</TableCell>
                    <TableCell>{contractId}</TableCell>
                    <TableHead>{agentId}</TableHead>
                    <TableCell>{buyerId}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        ) : (
          <p>
            No transactions are currently available. Transactions will display
            here once added.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
