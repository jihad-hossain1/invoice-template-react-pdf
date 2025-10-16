import { ReactNode } from "react";

export type ElementType =
  | "text"
  | "image"
  | "rectangle"
  | "line"
  | "table"
  | "signature"
  | "logo"
  | "businessInfo"
  | "clientInfo"
  | "invoiceDetails"
  | "itemsTable"
  | "totals"
  | "notes"
  | "terms";

export type ElementPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
};

export type ElementStyle = {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  paddingTop?: number;
  textAlign?: "left" | "center" | "right" | "justify";
  lineHeight?: number;
  opacity?: number;
  borderTopWidth?: number;
  borderTopColor?: string;
};

export type CanvasElement = {
  id: string;
  type: ElementType;
  position: ElementPosition;
  style: ElementStyle;
  content?: string | string[];
  src?: string;
  locked?: boolean;
  hidden?: boolean;
};

export type TemplateData = {
  id: string;
  name: string;
  elements: CanvasElement[];
  width: number;
  height: number;
  background?: string;
};

export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
  tax?: number;
  discount?: number;
  total: number;
};

export type BusinessInfo = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  taxId?: string;
  logo?: string;
};

export type ClientInfo = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  email?: string;
};

export type InvoiceData = {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  business: BusinessInfo;
  client: ClientInfo;
  items: InvoiceItem[];
  notes?: string;
  terms?: string;
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  shipping?: number;
  total: number;
  currency: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  paymentMethod?: string;
  signature?: string;
};

export type TemplatePreset = {
  id: string;
  name: string;
  thumbnail: string;
  template: TemplateData;
};

export type ExportFormat = "pdf" | "png" | "docx";

export type ToolbarItem = {
  id: string;
  name: string;
  icon: ReactNode;
  type: ElementType;
  defaultWidth: number;
  defaultHeight: number;
  defaultContent?: string | string[];
  defaultStyle?: Partial<ElementStyle>;
};