import { Layout } from "@/components/Layout";

const DailyRates = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diárias e Viagens</h1>
          <p className="text-muted-foreground">
            Registre e gerencie diárias e viagens dos colaboradores
          </p>
        </div>
        
        {/* TODO: Implementar formulário de cadastro e listagem de diárias */}
        <div className="rounded-lg border p-4">
          <p className="text-muted-foreground">
            Em breve: Formulário para cadastro de diárias e listagem dos registros.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DailyRates;