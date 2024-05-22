import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { AgentProps } from "@/types/db";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import UpdateAgentForm from "./update-agent-form";
import { format } from "date-fns";

const ListAgents = ({
  agents,
  setAgents,
}: {
  agents: AgentProps[];
  setAgents: React.Dispatch<React.SetStateAction<AgentProps[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<null | AgentProps>(null);
  async function removeAgent(agentId: number) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/agents/${agentId}`,
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
        return { success: false, message: "Failed to delete agent." };
      }
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row gap-6 space-y-0">
        <div className="grid gap-2">
          <CardTitle>Agents</CardTitle>
          <CardDescription>
            All agents will be displayed in this table.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8">
        {agents && agents.length > 0 ? (
          <>
            <Table className="table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Agent Id</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map(
                  ({ id, fullName, phoneNumber, createdAt, updatedAt }) => (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{fullName}</TableCell>
                      <TableCell>{phoneNumber}</TableCell>
                      <TableCell>{format(createdAt, "yyyy-MM-dd")}</TableCell>
                      <TableCell>{format(updatedAt, "yyyy-MM-dd")}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={async () => {
                              const result = await removeAgent(id);
                              if (result.success) {
                                setAgents(
                                  agents.filter((agent) => agent.id !== id)
                                );
                                toast({
                                  description: "Agent removed successfully!",
                                  variant: "success",
                                });
                              } else {
                                toast({
                                  description:
                                    result.message ||
                                    "Failed to remove agent. Please try again later.",
                                  variant: "destructive",
                                });
                              }
                            }}
                          >
                            <Trash size={20} className="text-destructive" />
                          </button>
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setCurrentAgent({
                                id,
                                fullName,
                                phoneNumber,
                                createdAt,
                                updatedAt,
                              });
                            }}
                          >
                            <Edit size={20} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
            {currentAgent && (
              <Dialog
                open={isOpen}
                onOpenChange={(e) => {
                  setIsOpen(e);
                }}
                key={currentAgent.id}
              >
                <DialogContent className="max-w-xl">
                  <Card className="h-fit border-0">
                    <CardHeader>
                      <CardTitle>Update agent</CardTitle>
                      <CardDescription>
                        To update agent information, please fill out the form
                        with the following fields
                      </CardDescription>
                    </CardHeader>
                    <UpdateAgentForm
                      setIsOpen={setIsOpen}
                      setAgents={setAgents}
                      defaultValues={{
                        fullName: currentAgent.fullName,
                        phoneNumber: currentAgent.phoneNumber,
                      }}
                      id={currentAgent.id}
                    />
                  </Card>
                </DialogContent>
              </Dialog>
            )}
          </>
        ) : (
          <p>
            No agents are currently available. Agents will display here once
            added.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ListAgents;
