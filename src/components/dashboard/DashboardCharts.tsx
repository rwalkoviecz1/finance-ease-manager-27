import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface DashboardChartsProps {
  invoices: any[];
  dailyRates: any[];
  reimbursements: any[];
}

export function DashboardCharts({
  invoices,
  dailyRates,
  reimbursements,
}: DashboardChartsProps) {
  const [filterType, setFilterType] = useState("company");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const getFilteredData = () => {
    let data = [];
    switch (filterType) {
      case "company":
        data = invoices.reduce((acc: any[], curr: any) => {
          const existingItem = acc.find((item) => item.name === curr.company);
          if (existingItem) {
            existingItem.value += Number(curr.value);
          } else {
            acc.push({ name: curr.company, value: Number(curr.value) });
          }
          return acc;
        }, []);
        break;
      case "driver":
        data = [...dailyRates, ...reimbursements].reduce((acc: any[], curr: any) => {
          const existingItem = acc.find((item) => item.name === curr.driverName);
          if (existingItem) {
            existingItem.value += curr.totalTravelValue || curr.amount;
          } else {
            acc.push({
              name: curr.driverName,
              value: curr.totalTravelValue || curr.amount,
            });
          }
          return acc;
        }, []);
        break;
      case "type":
        const typeData = [
          {
            name: "Notas Fiscais",
            value: invoices.reduce(
              (sum, inv) => sum + Number(inv.value),
              0
            ),
          },
          {
            name: "Diárias",
            value: dailyRates.reduce(
              (sum, rate) => sum + rate.totalTravelValue,
              0
            ),
          },
          {
            name: "Reembolsos",
            value: reimbursements.reduce(
              (sum, reimb) => sum + reimb.amount,
              0
            ),
          },
        ];
        data = typeData;
        break;
    }

    // Sort by value in descending order
    return data.sort((a, b) => b.value - a.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select onValueChange={setFilterType} defaultValue={filterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o filtro" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="company">Por Empresa</SelectItem>
            <SelectItem value="driver">Por Motorista</SelectItem>
            <SelectItem value="type">Por Tipo</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <DatePicker
            selected={startDate}
            onSelect={setStartDate}
            placeholderText="Data inicial"
          />
          <DatePicker
            selected={endDate}
            onSelect={setEndDate}
            placeholderText="Data final"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <BarChart width={800} height={400} data={getFilteredData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            fill="#8884d8"
            name="Valor Total"
          />
        </BarChart>
      </div>
    </div>
  );
}