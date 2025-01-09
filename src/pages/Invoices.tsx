import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { Invoice } from "@/types/invoice";

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

        <div className="rounded-lg border">
          <InvoiceTable invoices={invoices} />
        </div>
      </div>
    </Layout>
  );
};

export default Invoices;