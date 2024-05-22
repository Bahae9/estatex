import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { RealEstateProps, UserDataProps } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DEFAULT_REAL_ESTATE_VALUES,
  RealEstateFormProps,
  RealEstateSchema,
  realEstateTransactionType,
  realEstateType,
} from "./data";
import MultiImageUpload from "@/components/shared/multi-image-upload";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

const NewRealEstateForm = ({
  setIsOpen,
  usersIds,
  setRealEstates,
  userId,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRealEstates:
    | React.Dispatch<React.SetStateAction<(RealEstateProps & UserDataProps)[]>>
    | React.Dispatch<React.SetStateAction<RealEstateProps[]>>;
  usersIds?: string[];
  userId?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(
    [] as { publicId: string; url: string }[]
  );
  const form = useForm<RealEstateFormProps>({
    resolver: zodResolver(RealEstateSchema),
    mode: "onChange",
    defaultValues: userId
      ? { ...DEFAULT_REAL_ESTATE_VALUES, userId }
      : DEFAULT_REAL_ESTATE_VALUES,
  });

  function onSubmit(data: RealEstateFormProps) {
    if (isLoading) return;
    if (images.length < 1) {
      toast({
        description: "Please select at least an image.",
        variant: "destructive",
      });
      return;
    }
    fetch("http://localhost:8080/api/realEstates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        imageUrls: images.map((el) => `${el.publicId}@${el.url}`).join(","),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(
              error.message ||
                "Failed to create real estate. Please try again later."
            );
          });
        }
        return response.json();
      })
      .then((response) => {
        toast({
          description: "Real Esate created successfully!",
          variant: "success",
        });
        const { fullName, ...rest } = response;
        setRealEstates((prev: any) => [
          ...prev,
          userId ? rest : { fullName, ...rest },
        ]);
        form.reset();
        setIsOpen(false);
      })
      .catch((error) => {
        toast({
          description:
            error.message ||
            "An error occurred while creating the real estate.",
          variant: "destructive",
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-3 px-2">
          <div className="flex flex-col sm:flex-row w-full gap-3">
            {usersIds && usersIds.length > 0 && (
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>User Id</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(e) => {
                          field.onChange(e);
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            "w-full mt-2",
                            form.getFieldState("userId").error &&
                              "border-destructive placeholder:text-destructive/60 text-destructive"
                          )}
                        >
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          {usersIds.map((userId) => (
                            <SelectItem value={userId} key={userId}>
                              {userId}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full mt-2",
                          form.getFieldState("type").error &&
                            "border-destructive placeholder:text-destructive/60 text-destructive"
                        )}
                      >
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(realEstateType.Values).map((type) => (
                          <SelectItem value={type} key={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-3">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className={cn(
                        form.getFieldState("size").error &&
                          "border-destructive placeholder:text-destructive/60 text-destructive"
                      )}
                      {...field}
                      onChange={(e) => {
                        field.onChange(
                          Number.isInteger(+e.target.value)
                            ? +e.target.value
                            : e.target.value
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className={cn(
                        form.getFieldState("location").error &&
                          "border-destructive placeholder:text-destructive/60 text-destructive"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-3">
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full mt-2",
                          form.getFieldState("transactionType").error &&
                            "border-destructive placeholder:text-destructive/60 text-destructive"
                        )}
                      >
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(realEstateTransactionType.Values).map(
                          (type) => (
                            <SelectItem value={type} key={type}>
                              {type}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className={cn(
                        form.getFieldState("price").error &&
                          "border-destructive placeholder:text-destructive/60 text-destructive"
                      )}
                      {...field}
                      onChange={(e) => {
                        field.onChange(
                          Number.isInteger(+e.target.value)
                            ? +e.target.value
                            : e.target.value
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    className={cn(
                      form.getFieldState("title").error &&
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
            name="description"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    autoComplete="off"
                    className={cn(
                      "h-[90px]",
                      form.getFieldState("description").error &&
                        "border-destructive placeholder:text-destructive/60 text-destructive"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <MultiImageUpload
            value={images}
            setValue={setImages}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" type="submit" disabled={isLoading}>
            Add new real estate
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default NewRealEstateForm;
