import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();

  const generateReport = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString();

    const reportContent = `
╔════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║                          ENVIADO EM: ${formattedDate}                         ║
║                          PARA O SETOR DE: CONTABILIDADE                        ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════╝

EMPRESA/MOTORISTA              TIPO DOCUMENTO              NÚMERO/QUANTIDADE
──────────────────────────────────────────────────────────────────────────────────

// Aqui seriam listados os dados...


──────────────────────────────────────────────────────────────────────────────────

Data e hora da impressão: ${formattedDate}


Recebido por: __________________
              Nome e assinatura
`;

    // Create a blob and trigger download
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio-${now.toISOString().split("T")[0]}.txt`;
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
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Gere relatórios personalizados
          </p>
        </div>
        
        <div className="rounded-lg border p-4">
          <Button onClick={generateReport}>
            Finalizar e Gerar Relatório
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;