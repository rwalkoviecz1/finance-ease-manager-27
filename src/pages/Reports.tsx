import { Layout } from "@/components/Layout";

const Reports = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Gere relatórios personalizados
          </p>
        </div>
        
        {/* TODO: Implementar geração de relatórios */}
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground">
            Em breve: Opções para gerar relatórios personalizados por período e categoria.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;