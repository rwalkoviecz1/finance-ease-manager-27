import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Invoice } from "@/types/invoice";

interface InvoiceTableProps {
  invoices: Invoice[];
}

const documentTypeLabels = {
  nota_fiscal: "Nota Fiscal",
  boleto: "Boleto",
};

const statusLabels = {
  enviada: "Enviada",
  cancelada: "Cancelada",
  substituida: "Substituída",
  aguardando_liberacao: "Aguardando Liberação",
};

export function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Empresa</TableHead>
          <TableHead>Tipo Doc.</TableHead>
          <TableHead>Número</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Nenhum documento cadastrado
            </TableCell>
          </TableRow>
        ) : (
          invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.company}</TableCell>
              <TableCell>{documentTypeLabels[invoice.documentType]}</TableCell>
              <TableCell>{invoice.documentNumber}</TableCell>
              <TableCell>
                {new Date(invoice.date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {Number(invoice.value).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell className="capitalize">{invoice.type}</TableCell>
              <TableCell>{statusLabels[invoice.status]}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}