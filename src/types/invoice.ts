export type InvoiceStatus = "enviada" | "cancelada" | "substituida" | "aguardando_liberacao";
export type DocumentType = "nota_fiscal" | "boleto";

export interface Invoice {
  id: string;
  company: string;
  documentNumber: string;
  documentType: DocumentType;
  date: string;
  value: string;
  type: "entrada" | "saida";
  status: InvoiceStatus;
}