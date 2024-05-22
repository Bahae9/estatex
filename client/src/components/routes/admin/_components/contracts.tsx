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
import { useLoaderData } from "react-router-dom";

const Contracts = () => {
  const { contracts } = useLoaderData() as {
    contracts: ContractProps[];
  };
  return (
    <Card>
      <CardHeader className="flex flex-row gap-6 space-y-0">
        <div className="grid gap-2">
          <CardTitle>Contracts</CardTitle>
          <CardDescription>
            All contracts will be displayed in this table.
          </CardDescription>
        </div>
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
                  <TableCell title={content}>
                    <p className="text-wrap line-clamp-3">{content}</p>
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
};

export default Contracts;
