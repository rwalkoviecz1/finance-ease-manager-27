import { Layout } from "@/components/Layout";

const Reimbursements = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reembolsos</h1>
          <p className="text-muted-foreground">
            Gerencie solicitações de reembolso
          </p>
        </div>
        
        {/* TODO: Implementar formulário de cadastro e listagem de reembolsos */}
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground">
            Em breve: Formulário para cadastro de reembolsos e listagem dos registros.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Reimbursements;