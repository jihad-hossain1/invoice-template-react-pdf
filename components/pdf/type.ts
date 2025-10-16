import { ReactNode } from "react";

export type InvoiceItem = {
  product: string;
  quantity: number;
  price: string;
  tax: string;
  discount: string;
};

export type InvoiceHeader = {
  name: string;
  key: keyof InvoiceItem;
};

export type CompanyInfo = {
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
};

export type TPdfData = {
  title: string;
  logoUrl: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail?: string;
  items: InvoiceItem[];
  subtotal: string;
  totalTax: string;
  shipping: string;
  total: string;
  terms: string;
  itemsHead: InvoiceHeader[];
  watermark: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  icon?: ReactNode;
  signatureImage: string | null;
  isSignature?: boolean;
  isWatermark?: boolean;
  watermarkImage?: string;
  watermarkText?: string;
  isBankAccount?: boolean;
};