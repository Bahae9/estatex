import MultiImageUpload from "@/components/shared/multi-image-upload";
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
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { RealEstateProps, UserDataProps } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  RealEstateFormProps,
  RealEstateSchema,
  realEstateTransactionType,
  realEstateType,
} from "./data";

const UpdteRealEstateForm = ({
  setIsOpen,
  setRealEstates,
  defaultValues,
  id,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRealEstates:
    | React.Dispatch<React.SetStateAction<(RealEstateProps & UserDataProps)[]>>
    | React.Dispatch<React.SetStateAction<RealEstateProps[]>>;
  defaultValues: RealEstateProps;
  id: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState(
    [] as { publicId: string; url: string }[]
  );
  const form = useForm<RealEstateFormProps>({
    resolver: zodResolver(RealEstateSchema),
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
      userId: defaultValues.userId.toString(),
    },
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
    fetch(`http://localhost:8080/api/realEstates/${id}`, {
      method: "PUT",
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
                "Failed to update real estate. Please try again later."
            );
          });
        }
        return response.json();
      })
      .then((response) => {
        toast({
          description: "real estate updated successfully!",
          variant: "success",
        });
        setRealEstates((prev: any) =>
          prev.map((realEstate: any) =>
            realEstate.id === id ? response : realEstate
          )
        );
        form.reset();
        setIsOpen(false);
      })
      .catch((error) => {
        toast({
          description:
            error.message || "An error occurred while updating the feedback.",
          variant: "destructive",
        });
      });
  }

  useEffect(() => {
    if (id && defaultValues.imageUrls) {
      setImages(
        defaultValues.imageUrls.split(",").map((el) => ({
          publicId: el.split("@")[0],
          url: el.split("@")[1],
        }))
      );
      return;
    }
    setImages([]);
  }, [id]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-3 px-2">
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
            Update real estate
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default UpdteRealEstateForm;
