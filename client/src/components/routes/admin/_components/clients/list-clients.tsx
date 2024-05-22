import { useAuth } from "@/components/contexts/auth-context";
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
import { UserFullDataProps } from "@/types/db";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateClientForm from "./update-client-form";

const ListClients = ({
  clients,
  setClients,
}: {
  clients: UserFullDataProps[];
  setClients: React.Dispatch<React.SetStateAction<UserFullDataProps[]>>;
}) => {
  const { token, clearToken } = useAuth();
  const navigate = useNavigate();
  const { id: userId } = jwtDecode(token as string) as {
    id: number;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<null | UserFullDataProps>(
    null
  );
  async function removeUser(id: number) {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to delete user." };
      }
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row gap-6 space-y-0">
        <div className="grid gap-2">
          <CardTitle>Clients</CardTitle>
          <CardDescription>
            All clients will be displayed in this table.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8">
        {clients && clients.length > 0 && (
          <>
            <Table className="table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Client Id</TableHead>
                  <TableCell>Email</TableCell>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map(
                  ({
                    id,
                    fullName,
                    phoneNumber,
                    createdAt,
                    updatedAt,
                    auth,
                    email,
                  }) => (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{fullName}</TableCell>
                      <TableCell>{phoneNumber || "Not provided"}</TableCell>
                      <TableCell>{format(createdAt, "yyyy-MM-dd")}</TableCell>
                      <TableCell>{format(updatedAt, "yyyy-MM-dd")}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={async () => {
                              const result = await removeUser(id);
                              if (id === userId) {
                                clearToken();
                                navigate("/login");
                              }
                              if (result.success) {
                                setClients(
                                  clients.filter((client) => client.id !== id)
                                );
                                toast({
                                  description: "User removed successfully!",
                                  variant: "success",
                                });
                              } else {
                                toast({
                                  description:
                                    result.message ||
                                    "Failed to remove user. Please try again later.",
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
                              setCurrentClient({
                                id,
                                fullName,
                                phoneNumber,
                                createdAt,
                                updatedAt,
                                email,
                                auth,
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
            {currentClient && (
              <Dialog
                open={isOpen}
                onOpenChange={(e) => {
                  setIsOpen(e);
                }}
                key={currentClient.id}
              >
                <DialogContent className="max-w-xl">
                  <Card className="h-fit border-0">
                    <CardHeader>
                      <CardTitle>Update Client</CardTitle>
                      <CardDescription>
                        To update client information, please fill out the form
                        with the following fields
                      </CardDescription>
                    </CardHeader>
                    <UpdateClientForm
                      setIsOpen={setIsOpen}
                      setClients={setClients}
                      defaultValues={{
                        fullName: currentClient.fullName,
                        phoneNumber: currentClient.phoneNumber,
                        email: currentClient.email,
                      }}
                      id={currentClient.id}
                    />
                  </Card>
                </DialogContent>
              </Dialog>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ListClients;
