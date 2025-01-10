import { useState } from "react";
import { Layout } from "@/components/Layout";
import { DailyRateForm } from "@/components/daily-rates/DailyRateForm";
import { DailyRateTable } from "@/components/daily-rates/DailyRateTable";
import { DailyRate } from "@/types/daily-rate";

const DailyRates = () => {
  const [dailyRates, setDailyRates] = useState<DailyRate[]>([]);

  const handleSubmit = (data: DailyRate) => {
    setDailyRates((prev) => [data, ...prev]);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diárias e Viagens</h1>
          <p className="text-muted-foreground">
            Registre e gerencie diárias e viagens dos colaboradores
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <DailyRateForm onSubmit={handleSubmit} />
          </div>

          <div className="rounded-lg border">
            <DailyRateTable dailyRates={dailyRates} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DailyRates;