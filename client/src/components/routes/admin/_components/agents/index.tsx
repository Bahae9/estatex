import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import NewAgentForm from "./new-agent-form";
import { useLoaderData } from "react-router-dom";
import { AgentProps } from "@/types/db";
import ListAgents from "./list-agents";

const Agents = () => {
  const { agents: AGENTS } = useLoaderData() as {
    agents: AgentProps[];
  };
  const [agents, setAgents] = useState(AGENTS);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="flex flex-col gap-6 lg:gap-8">
      <Dialog
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e);
        }}
      >
        <DialogContent className="max-w-xl">
          <Card className="h-fit border-0">
            <CardHeader>
              <CardTitle>Add new agent</CardTitle>
              <CardDescription>
                To add a new agent, fill out the form with the following fields
              </CardDescription>
            </CardHeader>
            <NewAgentForm setIsOpen={setIsOpen} setAgents={setAgents} />
          </Card>
        </DialogContent>
      </Dialog>
      <Button
        className="gap-2 self-end"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add new agent <Plus />
      </Button>
      <ListAgents agents={agents} setAgents={setAgents} />
    </section>
  );
};

export default Agents;
