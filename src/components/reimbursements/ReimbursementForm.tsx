import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reimbursement } from "@/types/reimbursement";

const formSchema = z.object({
  driverName: z.string().min(1, "Nome do motorista é obrigatório"),
  reimbursementDate: z.string().min(1, "Data do reembolso é obrigatória"),
  submissionDate: z.string().min(1, "Data do envio é obrigatória"),
  reason: z.string().min(1, "Motivo do reembolso é obrigatório"),
  amount: z.string().min(1, "Valor é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
});

interface ReimbursementFormProps {
  onSubmit: (data: Reimbursement) => void;
}

export function ReimbursementForm({ onSubmit }: ReimbursementFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      driverName: "",
      reimbursementDate: "",
      submissionDate: "",
      reason: "",
      amount: "",
      city: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const reimbursement: Reimbursement = {
      id: uuidv4(),
      driverName: values.driverName,
      reimbursementDate: values.reimbursementDate,
      submissionDate: values.submissionDate,
      reason: values.reason,
      amount: Number(values.amount),
      city: values.city,
    };

    onSubmit(reimbursement);
    form.reset();
    
    toast({
      title: "Reembolso registrado",
      description: `Valor: R$ ${values.amount}`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="driverName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Motorista</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reimbursementDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data do Reembolso</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="submissionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data do Envio</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo do Reembolso</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Registrar Reembolso
        </Button>
      </form>
    </Form>
  );
}