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
import { toast } from "@/components/ui/use-toast";
import { TransactionProps } from "@/types/db";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Transactions = () => {
  const { transactions: TRANSACTIONS } = useLoaderData() as {
    transactions: TransactionProps[];
  };
  const [transactions, setTransactions] = useState(TRANSACTIONS);
  async function removeTransaction(id: number) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/transactions/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to delete transaction." };
      }
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row gap-6 space-y-0">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            All transactions will be displayed in this table.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8">
        {transactions && transactions.length > 0 ? (
          <Table className="table-auto">
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Id</TableHead>
                <TableHead>RealEstate Id</TableHead>
                <TableHead>Contract Id</TableHead>
                <TableHead>Agent Id</TableHead>
                <TableHead>Buyer Id</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                    <TableCell>
                      <div className="flex justify-end">
                        <button
                          onClick={async () => {
                            const result = await removeTransaction(id);
                            if (result.success) {
                              setTransactions((prev) =>
                                prev.filter(
                                  (transaction) => transaction.id !== id
                                )
                              );
                              toast({
                                description:
                                  "Transaction removed successfully!",
                                variant: "success",
                              });
                            } else {
                              toast({
                                description:
                                  result.message ||
                                  "Failed to remove transaction. Please try again later.",
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          <Trash size={20} className="text-destructive" />
                        </button>
                      </div>
                    </TableCell>
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
};

export default Transactions;
