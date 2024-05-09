"use client";

import { LaboratoryWork, NewLaboratoryWorkParams, insertLaboratoryWorkParams } from "@/lib/db/schema/laboratoryWorks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LaboratoryWorkForm = ({
  laboratoryWork,
  closeModal,
}: {
  laboratoryWork?: LaboratoryWork;
  closeModal?: () => void;
}) => {
  const { data: courses } = trpc.courses.getCourses.useQuery();
  const editing = !!laboratoryWork?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertLaboratoryWorkParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertLaboratoryWorkParams),
    defaultValues: laboratoryWork ?? {
      courseId: "",
     name: "",
     description: "",
     order: 0,
     maxMark: 0,
     maxBonus: 0,
     penalty: 0
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.laboratoryWorks.getLaboratoryWorks.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Laboratory Work ${action}d!`);
  };

  const { mutate: createLaboratoryWork, isLoading: isCreating } =
    trpc.laboratoryWorks.createLaboratoryWork.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateLaboratoryWork, isLoading: isUpdating } =
    trpc.laboratoryWorks.updateLaboratoryWork.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteLaboratoryWork, isLoading: isDeleting } =
    trpc.laboratoryWorks.deleteLaboratoryWork.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewLaboratoryWorkParams) => {
    if (editing) {
      updateLaboratoryWork({ ...values, id: laboratoryWork.id });
    } else {
      createLaboratoryWork(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (<FormItem>
              <FormLabel>Course Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses?.courses.map((course) => (
                      <SelectItem key={course.course.id} value={course.course.id.toString()}>
                        {course.course.id}  {/* TODO: Replace with a field from the course model */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (<FormItem>
              <FormLabel>Description</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (<FormItem>
              <FormLabel>Order</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxMark"
          render={({ field }) => (<FormItem>
              <FormLabel>Max Mark</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxBonus"
          render={({ field }) => (<FormItem>
              <FormLabel>Max Bonus</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="penalty"
          render={({ field }) => (<FormItem>
              <FormLabel>Penalty</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteLaboratoryWork({ id: laboratoryWork.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LaboratoryWorkForm;
