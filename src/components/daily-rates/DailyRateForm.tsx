import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CURITIBA_DAILY_VALUE = 305.13;
const OTHER_CITIES_DAILY_VALUE = 261.55;

const formSchema = z.object({
  driverName: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  issueDate: z.date(),
  travelDate: z.date(),
  dailyQuantity: z.string().refine((val) => {
    const num = parseFloat(val);
    return num >= 0.5 && num % 0.5 === 0;
  }, "Quantidade deve ser múltiplo de 0.5 e maior ou igual a 0.5"),
  destination: z.string().min(1, "Selecione um destino"),
  vehicle: z.string().min(3, "Veículo deve ter no mínimo 3 caracteres"),
});

interface DailyRateFormProps {
  onSubmit: (data: any) => void;
}

export function DailyRateForm({ onSubmit }: DailyRateFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      driverName: "",
      vehicle: "",
    },
  });

  const calculateTotalValues = (data: z.infer<typeof formSchema>) => {
    const dailyValue = data.destination.toLowerCase() === "curitiba" 
      ? CURITIBA_DAILY_VALUE 
      : OTHER_CITIES_DAILY_VALUE;
    
    const dailyQuantity = parseFloat(data.dailyQuantity);
    const totalDailyValue = dailyValue * dailyQuantity;
    
    return {
      ...data,
      dailyValue,
      totalDailyValue,
      totalTravelValue: totalDailyValue, // For now, total travel value equals total daily value
      id: crypto.randomUUID(),
    };
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const calculatedData = calculateTotalValues(data);
    onSubmit(calculatedData);
    form.reset();
    toast({
      title: "Diária registrada com sucesso!",
      description: `Valor total: ${calculatedData.totalTravelValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="issueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Emissão</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="travelDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data da Viagem</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destino</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o destino" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="curitiba">Curitiba (R$ 305,13)</SelectItem>
                    <SelectItem value="outras">Outras Cidades (R$ 261,55)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dailyQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade de Diárias</FormLabel>
                <FormControl>
                  <Input {...field} type="number" step="0.5" min="0.5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="vehicle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Veículo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Registrar Diária</Button>
      </form>
    </Form>
  );
}