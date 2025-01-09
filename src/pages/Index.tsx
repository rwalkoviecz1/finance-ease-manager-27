import { Card } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { ArrowDownIcon, ArrowUpIcon, CarIcon, WalletIcon } from "lucide-react";

const stats = [
  {
    name: "Notas de Entrada",
    value: "R$ 24.500",
    change: "+4.75%",
    changeType: "positive",
    icon: ArrowDownIcon,
  },
  {
    name: "Notas de Saída",
    value: "R$ 18.300",
    change: "-2.25%",
    changeType: "negative",
    icon: ArrowUpIcon,
  },
  {
    name: "Diárias",
    value: "R$ 3.850",
    change: "+12.5%",
    changeType: "positive",
    icon: CarIcon,
  },
  {
    name: "Reembolsos",
    value: "R$ 1.250",
    change: "-0.5%",
    changeType: "negative",
    icon: WalletIcon,
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral das suas operações financeiras
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div
                  className={`rounded-full p-2 ${
                    stat.changeType === "positive"
                      ? "bg-success/20 text-success"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground">
                  {" "}
                  em relação ao mês anterior
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;