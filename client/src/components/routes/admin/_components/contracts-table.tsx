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
import { ContractProps } from "@/types/db";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContractsTable({
  contracts,
}: {
  contracts: ContractProps[];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-6 space-y-0">
        <div className="grid gap-2">
          <CardTitle>Contrats</CardTitle>
          <CardDescription
            className="line-clamp-2"
            title=" Les cinq derniers contrats signés aujourd'hui"
          >
            Les cinq derniers contrats signés aujourd'hui
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="contracts">
            See all
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-8">
        {contracts && contracts.length > 0 ? (
          <Table className="table-auto">
            <TableHeader>
              <TableRow>
                <TableHead>Contract Id</TableHead>
                <TableHead className="w-[80%]">Content</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map(({ id, content }) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell className="text-wrap line-clamp-2" title={content}>
                    {content}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>
            No contracts are currently available. Contracts will display here
            once added.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
