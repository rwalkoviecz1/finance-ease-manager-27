import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ReimbursementForm } from "@/components/reimbursements/ReimbursementForm";
import { ReimbursementTable } from "@/components/reimbursements/ReimbursementTable";
import { Reimbursement } from "@/types/reimbursement";

const Reimbursements = () => {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);

  const handleSubmit = (data: Reimbursement) => {
    setReimbursements((prev) => [data, ...prev]);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reembolsos</h1>
          <p className="text-muted-foreground">
            Gerencie solicitações de reembolso
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <ReimbursementForm onSubmit={handleSubmit} />
          </div>

          <div className="rounded-lg border">
            <ReimbursementTable reimbursements={reimbursements} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reimbursements;