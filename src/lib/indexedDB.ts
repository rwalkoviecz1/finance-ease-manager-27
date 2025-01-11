import { openDB } from 'idb';
import { DailyRate } from '@/types/daily-rate';
import { Invoice } from '@/types/invoice';
import { Reimbursement } from '@/types/reimbursement';
import { toast } from '@/components/ui/use-toast';

const DB_NAME = 'marmeleiroDB';
const DB_VERSION = 1;
const DB_PATH_KEY = 'dbPath';

export const getDatabasePath = () => {
  return localStorage.getItem(DB_PATH_KEY);
};

export const setDatabasePath = (path: string) => {
  localStorage.setItem(DB_PATH_KEY, path);
};

export const initDB = async () => {
  const dbPath = getDatabasePath();
  if (!dbPath) {
    toast({
      title: "Configuração necessária",
      description: "Por favor, configure o diretório do banco de dados nas configurações.",
      variant: "destructive",
    });
    return null;
  }

  toast({
    title: "Bom dia pra você!",
    description: "Ótimo trabalho! Banco de dados carregando...",
  });

  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('dailyRates')) {
        db.createObjectStore('dailyRates', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('invoices')) {
        db.createObjectStore('invoices', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('reimbursements')) {
        db.createObjectStore('reimbursements', { keyPath: 'id' });
      }
    },
  });

  toast({
    title: "Pronto!",
    description: "Banco de dados carregado com sucesso!",
  });

  return db;
};

// Daily Rates
export const addDailyRate = async (dailyRate: DailyRate) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.add('dailyRates', dailyRate);
};

export const getDailyRates = async () => {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.getAll('dailyRates');
};

// Invoices
export const addInvoice = async (invoice: Invoice) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.add('invoices', invoice);
};

export const getInvoices = async () => {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.getAll('invoices');
};

// Reimbursements
export const addReimbursement = async (reimbursement: Reimbursement) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.add('reimbursements', reimbursement);
};

export const getReimbursements = async () => {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.getAll('reimbursements');
};

// Export data to CSV
export const exportToCSV = async () => {
  const db = await openDB(DB_NAME, DB_VERSION);
  const dailyRates = await db.getAll('dailyRates');
  const invoices = await db.getAll('invoices');
  const reimbursements = await db.getAll('reimbursements');

  const data = {
    dailyRates,
    invoices,
    reimbursements
  };

  const blob = new Blob([JSON.stringify(data)], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `marmeleiro-data-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

// Import data from CSV
export const importFromCSV = async (file: File) => {
  const text = await file.text();
  const data = JSON.parse(text);
  
  const db = await openDB(DB_NAME, DB_VERSION);
  const tx = db.transaction(['dailyRates', 'invoices', 'reimbursements'], 'readwrite');
  
  // Clear existing data
  await tx.objectStore('dailyRates').clear();
  await tx.objectStore('invoices').clear();
  await tx.objectStore('reimbursements').clear();
  
  // Add new data
  for (const dailyRate of data.dailyRates) {
    await tx.objectStore('dailyRates').add(dailyRate);
  }
  for (const invoice of data.invoices) {
    await tx.objectStore('invoices').add(invoice);
  }
  for (const reimbursement of data.reimbursements) {
    await tx.objectStore('reimbursements').add(reimbursement);
  }
  
  await tx.done;
};