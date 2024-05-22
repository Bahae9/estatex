import { RealEstateProps, UserDataProps } from "@/types/db";
import RealEstateAdminCard from "./real-estate-admin-card";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UpdteRealEstateForm from "./update-real-estate-form";

const ListRealEstates = ({
  realEstates,
  setRealEstates,
}: {
  realEstates: (RealEstateProps & UserDataProps)[] | RealEstateProps[];
  setRealEstates:
    | React.Dispatch<React.SetStateAction<(RealEstateProps & UserDataProps)[]>>
    | React.Dispatch<React.SetStateAction<RealEstateProps[]>>;
}) => {
  const [currentRealEstate, setCurrentRealEstate] =
    useState<null | RealEstateProps>(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {realEstates && realEstates.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {realEstates.map((el) => (
              <RealEstateAdminCard
                key={el.id}
                realEstate={el}
                setRealEstates={setRealEstates}
                setCurrentRealEstate={setCurrentRealEstate}
                setIsOpen={setIsOpen}
              />
            ))}
          </div>
          {currentRealEstate && (
            <Dialog
              open={isOpen}
              onOpenChange={(e) => {
                setIsOpen(e);
              }}
            >
              <DialogContent className="max-w-4xl h-[90vh]">
                <Card className="h-full border-0 flex flex-col justify-center w-full">
                  <CardHeader>
                    <CardTitle>Update Feedback</CardTitle>
                    <CardDescription>
                      To update feedback information, please fill out the form
                      with the following fields
                    </CardDescription>
                  </CardHeader>
                  <UpdteRealEstateForm
                    setIsOpen={setIsOpen}
                    setRealEstates={setRealEstates}
                    defaultValues={currentRealEstate}
                    id={currentRealEstate.id}
                  />
                </Card>
              </DialogContent>
            </Dialog>
          )}
        </>
      ) : (
        <p>
          No real estates are currently available. real estates will display
          here once added.
        </p>
      )}
    </div>
  );
};

export default ListRealEstates;
