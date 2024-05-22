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
import { useLoaderData } from "react-router-dom";
import { UserFullDataProps } from "@/types/db";
import ListClients from "./list-clients";
import NewClientForm from "./new-client-form";

const Clients = () => {
  const { clients: CLIENTS } = useLoaderData() as {
    clients: UserFullDataProps[];
  };
  const [clients, setClients] = useState(CLIENTS);
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
              <CardTitle>Add new Client</CardTitle>
              <CardDescription>
                To add a new client, fill out the form with the following fields
              </CardDescription>
            </CardHeader>
            <NewClientForm setIsOpen={setIsOpen} setClients={setClients} />
          </Card>
        </DialogContent>
      </Dialog>
      <Button
        className="gap-2 self-end"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add new client <Plus />
      </Button>
      <ListClients clients={clients} setClients={setClients} />
    </section>
  );
};

export default Clients;
