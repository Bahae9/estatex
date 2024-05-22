import { useAuth } from "@/components/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { ProfileValues, profileSchema } from "./data";

const EditProfile = () => {
  const { token, saveToken } = useAuth();

  const { fullName, phoneNumber, sub, id } = jwtDecode(token as string) as {
    fullName: string;
    phoneNumber: string;
    sub: string;
    id: number;
  };

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      email: sub,
      fullName: fullName,
      phoneNumber: phoneNumber,
      password: "",
    },
  });

  const isChanged = () => {
    return (
      form.getValues("email") !== sub ||
      form.getValues("fullName") !== fullName ||
      form.getValues("phoneNumber") !== phoneNumber ||
      !!form.getValues("password")
    );
  };

  async function onSubmit(data: ProfileValues) {
    try {
      const updatedData = Object.entries(data).reduce(
        (acc, [key, value]) => (
          key === "email" && value !== sub
            ? (acc.email = value)
            : key === "fullName" && value !== fullName
            ? (acc.fullName = value)
            : key === "phoneNumber" && value !== phoneNumber
            ? (acc.phoneNumber = value)
            : key === "password" && !!value
            ? (acc.password = value)
            : acc,
          acc
        ),
        {} as {
          fullName?: string;
          email?: string;
          password?: string;
          phoneNumber?: string | undefined;
        }
      );
      const response = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const responseData = await response.json();
        saveToken(responseData.token, false);
        form.resetField("password");
        toast({
          description: "User information updated successfully.",
          variant: "success",
        });
      } else {
        const error = await response.json();
        throw new Error(
          error.message ||
            error.detail ||
            "Failed to update user information. Please try again later."
        );
      }
    } catch (error: any) {
      toast({
        description: error.message || "Failed to update user information.",
        variant: "destructive",
      });
    }
  }

  return (
    <section className="flex-1 flex justify-center items-center">
      <Card className={"h-fit w-fit"}>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Use this form to update your personal information.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-3">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        className={cn(
                          form.getFieldState("fullName").error &&
                            "border-destructive placeholder:text-destructive/60 text-destructive"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number
                      <span
                        className={cn(
                          "text-muted-foreground ml-1",
                          form.getFieldState("phoneNumber").error &&
                            "text-destructive/80"
                        )}
                      ></span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        className={cn(
                          form.getFieldState("phoneNumber").error &&
                            "border-destructive placeholder:text-destructive/60 text-destructive"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        className={cn(
                          form.getFieldState("email").error &&
                            "border-destructive placeholder:text-destructive/60 text-destructive"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className={cn(
                          form.getFieldState("password").error &&
                            "border-destructive placeholder:text-destructive/60 text-destructive"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto"
                type="submit"
                disabled={!isChanged() || !form.formState.isValid}
              >
                Update Profile
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </section>
  );
};

export default EditProfile;
