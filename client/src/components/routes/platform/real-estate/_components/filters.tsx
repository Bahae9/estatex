import Ranger from "@/components/shared/ranger";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
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
import { cn } from "@/lib/utils";
import { RealEstateProps, UserDataProps } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import {
  realEstateType,
  realEstateTransactionType,
} from "../../../admin/_components/real-estates/data";
import {
  DEFAULT_SEARCH_VALUES,
  MAX_PRICE,
  MIN_PRICE,
  SearchValues,
  searchSchema,
  type SelectSearchSchemaKeys,
} from "../data";
import { toast } from "@/components/ui/use-toast";

const Filters = ({
  className,
  cardClassName,
  setRealEstates,
  setIsOpen,
}: {
  className?: string;
  cardClassName?: string;
  setRealEstates: React.Dispatch<
    React.SetStateAction<(RealEstateProps & UserDataProps)[]>
  >;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    mode: "all",
    defaultValues: DEFAULT_SEARCH_VALUES,
  });

  const onSelectChange = (field: SelectSearchSchemaKeys, num: number) => {
    form.setValue(field, num);
    form.watch(field, num);
  };

  async function onSubmit(data: SearchValues) {
    const filteredData = Object.keys(data).reduce((acc, key) => {
      const typedKey = key as keyof SearchValues;
      if (
        Array.isArray(data[typedKey]) &&
        Array.isArray(DEFAULT_SEARCH_VALUES[typedKey])
      ) {
        if (
          JSON.stringify(data[typedKey]) !==
          JSON.stringify(DEFAULT_SEARCH_VALUES[typedKey])
        ) {
          if (typedKey === "priceRange") {
            acc.minPrice = data.priceRange[0];
            acc.maxPrice = data.priceRange[1];
          } else if (typedKey === "sizeRange") {
            acc.minSize = data.sizeRange[0];
            acc.maxSize = data.sizeRange[1];
          } else {
            acc[typedKey] = data[typedKey];
          }
        }
      } else if (data[typedKey] !== DEFAULT_SEARCH_VALUES[typedKey]) {
        acc[typedKey] = data[typedKey];
      }
      return acc;
    }, {} as any);
    try {
      const response = await fetch(
        "http://localhost:8080/api/realEstates/filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filteredData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const filteredRealEstates = await response.json();
      setRealEstates(filteredRealEstates);
      if (setIsOpen) setIsOpen(false);
    } catch (error: any) {
      toast({
        description: error?.message || "An error occurred while filtering.",
        variant: "destructive",
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form
        className={cn("w-full flex flex-col gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className={cn("w-full", cardClassName)}>
          <CardHeader>
            <CardTitle>Find Instantly!</CardTitle>
            <CardDescription>
              Enter the title of your property and find it instantly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem className="relative flex-1">
                    <FormControl className="relative z-20">
                      <Input
                        type="search"
                        placeholder="Enter the title..."
                        className={cn(
                          "w-full appearance-none bg-transparent pl-8 shadow-none",
                          form.getFieldState("search").error &&
                            "border-destructive placeholder:text-destructive/60 text-destructive"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <Search className="absolute left-2.5 top-[3px] h-4 w-4 text-muted-foreground" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort By Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          className={cn(
                            "w-full mt-2",
                            form.getFieldState("type").error &&
                              "border-destructive placeholder:text-destructive/60 text-destructive"
                          )}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(realEstateTransactionType.Values).map(
                            (val) => (
                              <SelectItem value={val} key={val}>
                                {val}
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
              <h4 className="text-lg font-semibold mt-2">Search by Price</h4>
              <Ranger
                setMaxValue={(num: number) => {
                  onSelectChange("priceRange.1", num);
                }}
                setMinValue={(num: number) => {
                  onSelectChange("priceRange.0", num);
                }}
                minValue={"priceRange.0"}
                maxValue={"priceRange.1"}
                min={MIN_PRICE}
                max={MAX_PRICE}
                stepBy={1000}
              />
              <FormField
                control={form.control}
                name="sortPriceBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort By</FormLabel>
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
                            form.getFieldState("sortPriceBy").error &&
                              "border-destructive placeholder:text-destructive/60 text-destructive"
                          )}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ASC">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="DESC">
                            Price: High to Low
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h4 className="text-lg font-semibold mt-2">
                Filter by Size (m²)
              </h4>
              <FormField
                control={form.control}
                name="sortSizeBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort By</FormLabel>
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
                            form.getFieldState("sortSizeBy").error &&
                              "border-destructive placeholder:text-destructive/60 text-destructive"
                          )}
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ASC">Size: Low to High</SelectItem>
                          <SelectItem value="DESC">
                            Size: High to Low
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizeRange"
                render={({ field }) => {
                  const ITEMS = [
                    { value: "0-1000", label: "All" },
                    { value: "0-50", label: "-50 m²" },
                    { value: "50-100", label: "50 m² - 100 m²" },
                    { value: "100-200", label: "100 m² - 200 m²" },
                    { value: "200-500", label: "200 m² - 500 m²" },
                    { value: "500-1000", label: "+500 m²" },
                  ];
                  return (
                    <FormItem>
                      <FormLabel>Sort By Size</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(e) => {
                            field.onChange(e.split("-").map((el) => +el));
                          }}
                        >
                          <SelectTrigger
                            className={cn(
                              "w-full mt-2",
                              form.getFieldState("sizeRange").error &&
                                "border-destructive placeholder:text-destructive/60 text-destructive"
                            )}
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {ITEMS.map(({ label, value }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <h4 className="text-lg font-semibold mt-2">
                Filter by Categories
              </h4>
              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem className="grid grid-cols-2 gap-2 space-y-0">
                    {Object.keys(realEstateType.Values).map((val) => (
                      <FormField
                        key={val}
                        control={form.control}
                        name="categories"
                        render={({ field }) => {
                          return (
                            <FormItem key={val}>
                              <FormControl>
                                <Checkbox
                                  className="hidden"
                                  checked={field.value?.includes(val)}
                                  onCheckedChange={(checked: boolean) => {
                                    return checked
                                      ? field.onChange([...field.value, val])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== val
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel
                                className={cn(
                                  "flex flex-row justify-center items-center space-x-3 space-y-0 p-3 border rounded-md",
                                  field.value?.includes(val) &&
                                    "bg-primary border-primary"
                                )}
                              >
                                {val}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-1 mt-4">
            <Button variant={"ghost"}>Reset</Button>
            <Button type="submit">Search</Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Filters;
