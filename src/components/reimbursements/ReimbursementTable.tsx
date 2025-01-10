import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reimbursement } from "@/types/reimbursement";

interface ReimbursementTableProps {
  reimbursements: Reimbursement[];
}

export function ReimbursementTable({ reimbursements }: ReimbursementTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Motorista</TableHead>
          <TableHead>Data do Reembolso</TableHead>
          <TableHead>Data do Envio</TableHead>
          <TableHead>Motivo</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Cidade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reimbursements.map((reimbursement) => (
          <TableRow key={reimbursement.id}>
            <TableCell>{reimbursement.driverName}</TableCell>
            <TableCell>{reimbursement.reimbursementDate}</TableCell>
            <TableCell>{reimbursement.submissionDate}</TableCell>
            <TableCell>{reimbursement.reason}</TableCell>
            <TableCell>R$ {reimbursement.amount.toFixed(2)}</TableCell>
            <TableCell>{reimbursement.city}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}