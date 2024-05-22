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
import { AddedFeedbackProps } from "@/types/db";
import ListFeedbacks from "./list-feedbacks";
import NewFeedbackForm from "./new-feedback-form";

const Clients = () => {
  const { feedbacks: FEEDBACKS, usersIds } = useLoaderData() as {
    feedbacks: AddedFeedbackProps[];
    usersIds: { id: string }[];
  };
  const [feedbacks, setFeedbacks] = useState(FEEDBACKS);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="flex flex-col gap-6 lg:gap-8">
      <Dialog
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e);
        }}
      >
        <DialogContent className="max-w-4xl h-[90vh] lg:h-fit">
          <Card className="h-full flex flex-col justify-center w-full border-0">
            <CardHeader>
              <CardTitle>Add new Feedback</CardTitle>
              <CardDescription>
                To add a new feedback, fill out the form with the following
                fields
              </CardDescription>
            </CardHeader>
            <NewFeedbackForm
              setIsOpen={setIsOpen}
              setFeedbacks={setFeedbacks}
              usersIds={usersIds.map((el) => el.id.toString())}
            />
          </Card>
        </DialogContent>
      </Dialog>
      <Button
        className="gap-2 self-end"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add new feedback <Plus />
      </Button>
      <ListFeedbacks feedbacks={feedbacks} setFeedbacks={setFeedbacks} />
    </section>
  );
};

export default Clients;
