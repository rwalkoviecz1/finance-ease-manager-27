import { Layout } from "@/components/Layout";

const Invoices = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notas Fiscais</h1>
          <p className="text-muted-foreground">
            Gerencie suas notas fiscais de entrada e saída
          </p>
        </div>
        
        {/* TODO: Implementar formulário de cadastro e listagem de notas fiscais */}
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground">
            Em breve: Formulário para cadastro de notas fiscais e listagem dos registros.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Invoices;