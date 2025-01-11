import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { setDatabasePath, getDatabasePath } from "@/lib/indexedDB";

export function DatabaseConfig() {
  const [dbPath, setDbPath] = useState(getDatabasePath() || "");

  const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDbPath(event.target.value);
  };

  const handleSave = () => {
    if (!dbPath) {
      toast({
        title: "Erro",
        description: "Por favor, insira um diretório válido para o banco de dados.",
        variant: "destructive",
      });
      return;
    }

    setDatabasePath(dbPath);
    toast({
      title: "Configuração salva",
      description: "O diretório do banco de dados foi atualizado com sucesso.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="dbPath" className="text-sm font-medium">
          Diretório do Banco de Dados
        </label>
        <div className="flex space-x-2">
          <Input
            id="dbPath"
            value={dbPath}
            onChange={handlePathChange}
            placeholder="C:\MeuApp\Database"
            className="flex-1"
          />
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>
    </div>
  );
}