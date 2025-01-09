import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Car,
  Wallet,
  FileText,
} from "lucide-react";

const AppSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="pb-12 w-64 border-r min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            <Link
              to="/"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 transition-all hover:text-accent-foreground",
                isActive("/")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/invoices"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 transition-all hover:text-accent-foreground",
                isActive("/invoices")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Receipt className="mr-2 h-4 w-4" />
              Notas Fiscais
            </Link>
            <Link
              to="/daily-rates"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 transition-all hover:text-accent-foreground",
                isActive("/daily-rates")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Car className="mr-2 h-4 w-4" />
              Diárias e Viagens
            </Link>
            <Link
              to="/reimbursements"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 transition-all hover:text-accent-foreground",
                isActive("/reimbursements")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Reembolsos
            </Link>
            <Link
              to="/reports"
              className={cn(
                "flex items-center rounded-lg px-3 py-2 transition-all hover:text-accent-foreground",
                isActive("/reports")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <FileText className="mr-2 h-4 w-4" />
              Relatórios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;