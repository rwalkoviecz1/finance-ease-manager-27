import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

const Reports = () => {
  const { toast } = useToast();

  const generateReport = () => {
    const now = new Date();
    const formattedDate = now.toLocaleString();

    // Create new PDF document
    const doc = new jsPDF();
    
    // Add logo
    const logoImg = new Image();
    logoImg.src = "/lovable-uploads/b3a70041-3d27-488b-9c16-aa504f409497.png";
    doc.addImage(logoImg, "PNG", 87.5, 10, 35, 35); // Centered the logo and adjusted size

    // Add header text
    doc.setFontSize(16);
    doc.text("Prefeitura de Marmeleiro", 105, 55, { align: "center" }); // Adjusted position after logo
    doc.setFontSize(10);
    doc.text("Estado do Paraná - CNPJ 76.205.665/0001-01", 105, 62, { align: "center" });
    doc.text("Av. Macali, 255 - Caixa Postal 24 - Fone/Fax (46) 3525-8100 - CEP 85.615-000", 105, 68, { align: "center" });

    // Add separator line
    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);

    // Add report content
    doc.setFontSize(12);
    doc.text(`Data e hora de emissão: ${formattedDate}`, 20, 90);
    doc.text("Setor: CONTABILIDADE", 20, 100);

    // Add table headers
    doc.setFontSize(11);
    const headers = ["EMPRESA/MOTORISTA", "TIPO DOCUMENTO", "NÚMERO/QUANTIDADE"];
    let y = 120;
    doc.text(headers[0], 20, y);
    doc.text(headers[1], 90, y);
    doc.text(headers[2], 160, y);

    // Add separator line below headers
    doc.line(20, y + 2, 190, y + 2);

    // Add space for data (example data line)
    y += 15;
    doc.setFontSize(10);
    doc.text("Exemplo Transportes", 20, y);
    doc.text("NF-e", 90, y);
    doc.text("123456", 160, y);

    // Add signature field at the bottom
    y = 250;
    doc.line(60, y, 150, y); // Signature line
    doc.setFontSize(10);
    doc.text("Recebido por:", 60, y - 5);
    doc.text("Nome e assinatura", 85, y + 10);

    // Save the PDF
    const fileName = `relatorio-${now.toISOString().split("T")[0]}.pdf`;
    doc.save(fileName);

    toast({
      title: "Relatório gerado com sucesso!",
      description: "O relatório foi baixado automaticamente em formato PDF.",
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