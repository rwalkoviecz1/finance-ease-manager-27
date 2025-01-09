import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const { toast } = useToast();

  const onSubmit = (data: Omit<Invoice, "id">) => {
    const newInvoice: Invoice = {
      ...data,
      id: crypto.randomUUID(),
    };

    setInvoices((prev) => [...prev, newInvoice]);

    toast({
      title: "Documento cadastrado com sucesso!",
      description: `${data.documentType === "nota_fiscal" ? "Nota fiscal" : "Boleto"} ${data.documentNumber} foi registrado no sistema.`,
    });
  };

  const generateReport = () => {
    if (invoices.length === 0) {
      toast({
        title: "Nenhum documento cadastrado",
        description: "Cadastre pelo menos um documento para gerar o relatório.",
        variant: "destructive",
      });
      return;
    }

    const reportContent = invoices
      .map(
        (invoice) => `
Documento #${invoice.documentNumber}
--------------------------------
Empresa: ${invoice.company}
Tipo: ${invoice.documentType === "nota_fiscal" ? "Nota Fiscal" : "Boleto"}
Data: ${new Date(invoice.date).toLocaleDateString()}
Valor: ${Number(invoice.value).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
Tipo: ${invoice.type === "entrada" ? "Entrada" : "Saída"}
Status: ${invoice.status}
`
      )
      .join("\n\n");

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio-documentos-${new Date()
      .toISOString()
      .split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Relatório gerado com sucesso!",
      description: "O relatório foi baixado automaticamente.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documentos Fiscais</h1>
          <p className="text-muted-foreground">
            Gerencie suas notas fiscais e boletos de entrada e saída
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Cadastrar Novo Documento</h2>
          <InvoiceForm onSubmit={onSubmit} />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Documentos Cadastrados</h2>
            <Button onClick={generateReport}>
              <FileText className="mr-2" />
              Finalizar e Gerar Relatório
            </Button>
          </div>
          <div className="rounded-lg border">
            <InvoiceTable invoices={invoices} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Invoices;