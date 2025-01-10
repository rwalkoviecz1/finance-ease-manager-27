import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DailyRate } from "@/types/daily-rate";

interface DailyRateTableProps {
  dailyRates: DailyRate[];
}

export function DailyRateTable({ dailyRates }: DailyRateTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Motorista</TableHead>
          <TableHead>Data da Viagem</TableHead>
          <TableHead>Destino</TableHead>
          <TableHead>Veículo</TableHead>
          <TableHead>Qtd. Diárias</TableHead>
          <TableHead>Valor Diária</TableHead>
          <TableHead>Total Diárias</TableHead>
          <TableHead>Total Viagem</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dailyRates.map((rate) => (
          <TableRow key={rate.id}>
            <TableCell>{rate.driverName}</TableCell>
            <TableCell>{new Date(rate.travelDate).toLocaleDateString()}</TableCell>
            <TableCell>{rate.destination}</TableCell>
            <TableCell>{rate.vehicle}</TableCell>
            <TableCell>{rate.dailyQuantity}</TableCell>
            <TableCell>
              {rate.dailyValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </TableCell>
            <TableCell>
              {rate.totalDailyValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </TableCell>
            <TableCell>
              {rate.totalTravelValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}