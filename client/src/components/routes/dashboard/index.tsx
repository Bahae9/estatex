import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RealEstateProps } from "@/types/db";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ListRealEstates from "../admin/_components/real-estates/list-real-estates";
import NewRealEstateForm from "../admin/_components/real-estates/new-real-estate-form";
import { useAuth } from "@/components/contexts/auth-context";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const { token } = useAuth();
  const currentUserId = token
    ? (jwtDecode(token) as { id: number })?.id || -1
    : -1;

  const { realEstates: REAL_ESTATES } = useLoaderData() as {
    realEstates: RealEstateProps[];
  };

  const [realEstates, setRealEstates] = useState(REAL_ESTATES);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6 lg:gap-8">
      <Dialog
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e);
        }}
      >
        <DialogContent className="max-w-4xl h-[90vh]">
          <Card className="h-full flex flex-col justify-center w-full border-0">
            <CardHeader className="px-2">
              <CardTitle>Add new Real Estate</CardTitle>
              <CardDescription>
                To add a new real estate, fill out the form with the following
                fields
              </CardDescription>
            </CardHeader>
            <NewRealEstateForm
              setIsOpen={setIsOpen}
              setRealEstates={setRealEstates}
              userId={currentUserId.toString()}
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
        Add new real estate <Plus />
      </Button>
      <ListRealEstates
        realEstates={realEstates}
        setRealEstates={setRealEstates}
      />
    </section>
  );
};

export default Dashboard;
