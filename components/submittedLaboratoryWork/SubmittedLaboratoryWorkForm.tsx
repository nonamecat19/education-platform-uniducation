"use client";

import { SubmittedLaboratoryWork, NewSubmittedLaboratoryWorkParams, insertSubmittedLaboratoryWorkParams } from "@/lib/db/schema/submittedLaboratoryWork";
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
import { trpcCSR } from '@/lib/trpc/client'
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SubmittedLaboratoryWorkForm = ({
  submittedLaboratoryWork,
  closeModal,
}: {
  submittedLaboratoryWork?: SubmittedLaboratoryWork;
  closeModal?: () => void;
}) => {
  const { data: students } = trpcCSR.students.getStudents.useQuery();
  const { data: laboratoryWorks } = trpcCSR.laboratoryWorks.getLaboratoryWorks.useQuery();
  const editing = !!submittedLaboratoryWork?.id;

  const router = useRouter();
  const utils = trpcCSR.useContext();

  const form = useForm<z.infer<typeof insertSubmittedLaboratoryWorkParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertSubmittedLaboratoryWorkParams),
    defaultValues: submittedLaboratoryWork ?? {
     studentId: "",
     laboratoryWorkId: "",
     status: "",
     mark: 0,
     studentComment: "",
     teacherComment: ""
    } as any,
  });

  const onSuccess = async (action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
        if (data?.error) {
      toast.error(data.error)
      return;
    }

    await utils.submittedLaboratoryWork.getSubmittedLaboratoryWork.invalidate();
    router.refresh();
    if (closeModal) closeModal();
        toast.success(`Submitted Laboratory Work ${action}d!`);
  };

  const { mutate: createSubmittedLaboratoryWork, isLoading: isCreating } =
    trpcCSR.submittedLaboratoryWork.createSubmittedLaboratoryWork.useMutation({
      onSuccess: (res) => onSuccess("create"),
      // onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateSubmittedLaboratoryWork, isLoading: isUpdating } =
    trpcCSR.submittedLaboratoryWork.updateSubmittedLaboratoryWork.useMutation({
      onSuccess: (res) => onSuccess("update"),
      // onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteSubmittedLaboratoryWork, isLoading: isDeleting } =
    trpcCSR.submittedLaboratoryWork.deleteSubmittedLaboratoryWork.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      // onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewSubmittedLaboratoryWorkParams) => {
    if (editing) {
      updateSubmittedLaboratoryWork({ ...values, id: submittedLaboratoryWork.id });
    } else {
      createSubmittedLaboratoryWork(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (<FormItem>
              <FormLabel>Student Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students?.students.map((student) => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.id}  {/* TODO: Replace with a field from the student model */}
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
          name="laboratoryWorkId"
          render={({ field }) => (<FormItem>
              <FormLabel>Laboratory Work Id</FormLabel>
                <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a laboratory work" />
                  </SelectTrigger>
                  <SelectContent>
                    {laboratoryWorks?.laboratoryWorks.map(({laboratoryWork}) => (
                      <SelectItem key={laboratoryWork.id} value={laboratoryWork.id.toString()}>
                        {laboratoryWork.id}  {/* TODO: Replace with a field from the laboratoryWork model */}
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
          name="status"
          render={({ field }) => (<FormItem>
              <FormLabel>Status</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mark"
          render={({ field }) => (<FormItem>
              <FormLabel>Mark</FormLabel>
                <FormControl>
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studentComment"
          render={({ field }) => (<FormItem>
              <FormLabel>Student Comment</FormLabel>
                <FormControl>
            {/* @ts-ignore */}
            <Input {...field} />
          </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teacherComment"
          render={({ field }) => (<FormItem>
              <FormLabel>Teacher Comment</FormLabel>
                <FormControl>
            {/* @ts-ignore */}
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
            onClick={() => deleteSubmittedLaboratoryWork({ id: submittedLaboratoryWork.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default SubmittedLaboratoryWorkForm;
