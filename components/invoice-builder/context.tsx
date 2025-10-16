"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CanvasElement,
  ElementType,
  InvoiceData,
  TemplateData,
  TemplatePreset,
} from "./types";
import { generateId } from "@/lib/utils";

// Sample invoice data
const defaultInvoiceData: InvoiceData = {
  id: generateId(),
  number: "INV-001",
  date: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  business: {
    name: "Your Business Name",
    address: "123 Business St",
    city: "Business City",
    state: "BS",
    zip: "12345",
    country: "USA",
    phone: "(123) 456-7890",
    email: "contact@yourbusiness.com",
    website: "www.yourbusiness.com",
    taxId: "TAX-123456789",
  },
  client: {
    name: "Client Name",
    address: "456 Client Ave",
    city: "Client City",
    state: "CL",
    zip: "67890",
    country: "USA",
    phone: "(098) 765-4321",
    email: "client@example.com",
  },
  items: [
    {
      id: generateId(),
      description: "Product or Service 1",
      quantity: 2,
      price: 100,
      tax: 10,
      discount: 5,
      total: 210,
    },
    {
      id: generateId(),
      description: "Product or Service 2",
      quantity: 1,
      price: 50,
      tax: 10,
      discount: 0,
      total: 55,
    },
  ],
  notes: "Thank you for your business!",
  terms: "Payment due within 30 days.",
  subtotal: 250,
  taxTotal: 25,
  discountTotal: 10,
  shipping: 15,
  total: 280,
  currency: "USD",
  status: "draft",
};

// Default blank template
const defaultTemplate: TemplateData = {
  id: generateId(),
  name: "Blank Template",
  elements: [],
  width: 595, // A4 width in points
  height: 842, // A4 height in points
  background: "#ffffff",
};

// Template presets
const templatePresets: TemplatePreset[] = [
  {
    id: "modern",
    name: "Modern",
    thumbnail: "/templates/modern.png",
    template: {
      id: "modern",
      name: "Modern Template",
      width: 595,
      height: 842,
      background: "#ffffff",
      elements: [
        // Logo
        {
          id: generateId(),
          type: "logo",
          position: { x: 40, y: 40, width: 120, height: 60 },
          style: {},
        },
        // Business Info
        {
          id: generateId(),
          type: "businessInfo",
          position: { x: 40, y: 110, width: 200, height: 100 },
          style: {
            fontSize: 10,
            color: "#555555",
          },
        },
        // Invoice Title
        {
          id: generateId(),
          type: "text",
          position: { x: 40, y: 40, width: 515, height: 50 },
          style: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#333333",
            textAlign: "right",
          },
          content: "INVOICE",
        },
        // Invoice Details
        {
          id: generateId(),
          type: "invoiceDetails",
          position: { x: 355, y: 100, width: 200, height: 100 },
          style: {
            fontSize: 10,
            color: "#555555",
            textAlign: "right",
          },
        },
        // Client Info
        {
          id: generateId(),
          type: "clientInfo",
          position: { x: 40, y: 230, width: 200, height: 100 },
          style: {
            fontSize: 10,
            color: "#555555",
          },
        },
        // Items Table
        {
          id: generateId(),
          type: "itemsTable",
          position: { x: 40, y: 350, width: 515, height: 200 },
          style: {
            fontSize: 10,
            color: "#333333",
            borderColor: "#dddddd",
            borderWidth: 1,
          },
        },
        // Totals
        {
          id: generateId(),
          type: "totals",
          position: { x: 355, y: 570, width: 200, height: 100 },
          style: {
            fontSize: 10,
            color: "#333333",
            textAlign: "right",
          },
        },
        // Notes
        {
          id: generateId(),
          type: "notes",
          position: { x: 40, y: 650, width: 250, height: 80 },
          style: {
            fontSize: 10,
            color: "#555555",
          },
        },
        // Terms
        {
          id: generateId(),
          type: "terms",
          position: { x: 40, y: 740, width: 515, height: 60 },
          style: {
            fontSize: 9,
            color: "#777777",
            borderTopWidth: 1,
            borderTopColor: "#dddddd",
            paddingTop: 10,
          },
        },
      ],
    },
  },
  {
    id: "professional",
    name: "Professional",
    thumbnail: "/templates/professional.png",
    template: {
      id: "professional",
      name: "Professional Template",
      width: 595,
      height: 842,
      background: "#ffffff",
      elements: [
        // Header Rectangle
        {
          id: generateId(),
          type: "rectangle",
          position: { x: 0, y: 0, width: 595, height: 120 },
          style: {
            backgroundColor: "#2c3e50",
          },
        },
        // Logo
        {
          id: generateId(),
          type: "logo",
          position: { x: 40, y: 30, width: 120, height: 60 },
          style: {},
        },
        // Invoice Title
        {
          id: generateId(),
          type: "text",
          position: { x: 355, y: 40, width: 200, height: 40 },
          style: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "right",
          },
          content: "INVOICE",
        },
        // Business Info
        {
          id: generateId(),
          type: "businessInfo",
          position: { x: 40, y: 140, width: 200, height: 100 },
          style: {
            fontSize: 10,
            color: "#555555",
          },
        },
        // Invoice Details
        {
          id: generateId(),
          type: "invoiceDetails",
          position: { x: 355, y: 140, width: 200, height: 100 },
          style: {
            fontSize: 10,
            color: "#555555",
            textAlign: "right",
          },
        },
        // Client Info Box
        {
          id: generateId(),
          type: "rectangle",
          position: { x: 40, y: 260, width: 515, height: 80 },
          style: {
            backgroundColor: "#f5f5f5",
            borderRadius: 4,
          },
        },
        // Client Info
        {
          id: generateId(),
          type: "clientInfo",
          position: { x: 55, y: 270, width: 485, height: 60 },
          style: {
            fontSize: 10,
            color: "#555555",
          },
        },
        // Items Table
        {
          id: generateId(),
          type: "itemsTable",
          position: { x: 40, y: 360, width: 515, height: 200 },
          style: {
            fontSize: 10,
            color: "#333333",
            borderColor: "#dddddd",
            borderWidth: 1,
          },
        },
        // Totals
        {
          id: generateId(),
          type: "totals",
          position: { x: 355, y: 580, width: 200, height: 100 },
          style: {
            fontSize: 10,
            color: "#333333",
            textAlign: "right",
          },
        },
        // Notes
        {
          id: generateId(),
          type: "notes",
          position: { x: 40, y: 660, width: 250, height: 80 },
          style: {
            fontSize: 10,
            color: "#555555",
          },
        },
        // Footer Rectangle
        {
          id: generateId(),
          type: "rectangle",
          position: { x: 0, y: 782, width: 595, height: 60 },
          style: {
            backgroundColor: "#2c3e50",
          },
        },
        // Terms
        {
          id: generateId(),
          type: "terms",
          position: { x: 40, y: 792, width: 515, height: 40 },
          style: {
            fontSize: 9,
            color: "#ffffff",
            paddingTop: 10,
          },
        },
      ],
    },
  },
  {
    id: "creative",
    name: "Creative",
    thumbnail: "/templates/creative.png",
    template: {
      id: "creative",
      name: "Creative Template",
      width: 595,
      height: 842,
      background: "#ffffff",
      elements: [
        // Side Rectangle
        {
          id: generateId(),
          type: "rectangle",
          position: { x: 0, y: 0, width: 180, height: 842 },
          style: {
            backgroundColor: "#9b59b6",
          },
        },
        // Logo
        {
          id: generateId(),
          type: "logo",
          position: { x: 30, y: 40, width: 120, height: 60 },
          style: {},
        },
        // Business Info
        {
          id: generateId(),
          type: "businessInfo",
          position: { x: 30, y: 120, width: 140, height: 150 },
          style: {
            fontSize: 9,
            color: "#ffffff",
          },
        },
        // Invoice Title
        {
          id: generateId(),
          type: "text",
          position: { x: 210, y: 40, width: 345, height: 50 },
          style: {
            fontSize: 28,
            fontWeight: "bold",
            color: "#9b59b6",
          },
          content: "INVOICE",
        },
        // Invoice Details
        {
          id: generateId(),
          type: "invoiceDetails",
          position: { x: 210, y: 100, width: 345, height: 100 },
          style: {
            fontSize: 10,
            color: "#555555",
          },
        },
        // Client Info
        {
          id: generateId(),
          type: "clientInfo",
          position: { x: 210, y: 220, width: 345, height: 100 },
          style: {
            fontSize: 10,
            color: "#555555",
          },
        },
        // Items Table
        {
          id: generateId(),
          type: "itemsTable",
          position: { x: 210, y: 340, width: 345, height: 200 },
          style: {
            fontSize: 10,
            color: "#333333",
            borderColor: "#dddddd",
            borderWidth: 1,
          },
        },
        // Totals
        {
          id: generateId(),
          type: "totals",
          position: { x: 355, y: 560, width: 200, height: 100 },
          style: {
            fontSize: 10,
            color: "#333333",
            textAlign: "right",
          },
        },
        // Notes
        {
          id: generateId(),
          type: "notes",
          position: { x: 210, y: 670, width: 345, height: 80 },
          style: {
            fontSize: 10,
            color: "#555555",
          },
        },
        // Terms
        {
          id: generateId(),
          type: "terms",
          position: { x: 210, y: 760, width: 345, height: 60 },
          style: {
            fontSize: 9,
            color: "#777777",
            borderTopWidth: 1,
            borderTopColor: "#dddddd",
            paddingTop: 10,
          },
        },
      ],
    },
  },
];

type InvoiceBuilderContextType = {
  activeTemplate: TemplateData;
  setActiveTemplate: (template: TemplateData) => void;
  invoiceData: InvoiceData;
  setInvoiceData: (data: InvoiceData) => void;
  selectedElement: CanvasElement | null;
  setSelectedElement: (element: CanvasElement | null) => void;
  addElement: (type: ElementType, x: number, y: number) => void;
  updateElement: (element: CanvasElement) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  templatePresets: TemplatePreset[];
  applyTemplate: (templateId: string) => void;
  saveTemplate: () => void;
  loadTemplate: (id: string) => void;
  savedTemplates: TemplateData[];
  zoom: number;
  setZoom: (zoom: number) => void;
};

const InvoiceBuilderContext = createContext<InvoiceBuilderContextType | null>(
  null
);

export const useInvoiceBuilder = () => {
  const context = useContext(InvoiceBuilderContext);
  if (!context) {
    throw new Error(
      "useInvoiceBuilder must be used within an InvoiceBuilderProvider"
    );
  }
  return context;
};

export const InvoiceBuilderProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeTemplate, setActiveTemplate] =
    useState<TemplateData>(defaultTemplate);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoiceData);
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(
    null
  );
  const [savedTemplates, setSavedTemplates] = useState<TemplateData[]>([]);
  const [zoom, setZoom] = useState<number>(1);

  // Load saved templates from localStorage on mount
  useEffect(() => {
    const savedTemplatesJson = localStorage.getItem("savedTemplates");
    if (savedTemplatesJson) {
      try {
        const templates = JSON.parse(savedTemplatesJson);
        setSavedTemplates(templates);
      } catch (error) {
        console.error("Failed to parse saved templates:", error);
      }
    }
  }, []);

  const addElement = (type: ElementType, x: number, y: number) => {
    const newElement: CanvasElement = {
      id: generateId(),
      type,
      position: {
        x,
        y,
        width: 100,
        height: 40,
      },
      style: {
        fontSize: 12,
        color: "#000000",
      },
      content: type === "text" ? "Text" : undefined,
    };

    setActiveTemplate((prev) => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));

    setSelectedElement(newElement);
  };

  const updateElement = (updatedElement: CanvasElement) => {
    setActiveTemplate((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === updatedElement.id ? updatedElement : el
      ),
    }));

    if (selectedElement?.id === updatedElement.id) {
      setSelectedElement(updatedElement);
    }
  };

  const deleteElement = (id: string) => {
    setActiveTemplate((prev) => ({
      ...prev,
      elements: prev.elements.filter((el) => el.id !== id),
    }));

    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  };

  const duplicateElement = (id: string) => {
    const elementToDuplicate = activeTemplate.elements.find(
      (el) => el.id === id
    );
    if (!elementToDuplicate) return;

    const newElement: CanvasElement = {
      ...elementToDuplicate,
      id: generateId(),
      position: {
        ...elementToDuplicate.position,
        x: elementToDuplicate.position.x + 20,
        y: elementToDuplicate.position.y + 20,
      },
    };

    setActiveTemplate((prev) => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));

    setSelectedElement(newElement);
  };

  const applyTemplate = (templateId: string) => {
    const preset = templatePresets.find((p) => p.id === templateId);
    if (preset) {
      setActiveTemplate(preset.template);
    }
  };

  const saveTemplate = () => {
    const templateToSave = {
      ...activeTemplate,
      id: activeTemplate.id || generateId(),
    };

    setSavedTemplates((prev) => {
      const updated = prev.some((t) => t.id === templateToSave.id)
        ? prev.map((t) => (t.id === templateToSave.id ? templateToSave : t))
        : [...prev, templateToSave];

      // Save to localStorage
      localStorage.setItem("savedTemplates", JSON.stringify(updated));
      return updated;
    });
  };

  const loadTemplate = (id: string) => {
    const template = savedTemplates.find((t) => t.id === id);
    if (template) {
      setActiveTemplate(template);
    }
  };

  return (
    <InvoiceBuilderContext.Provider
      value={{
        activeTemplate,
        setActiveTemplate,
        invoiceData,
        setInvoiceData,
        selectedElement,
        setSelectedElement,
        addElement,
        updateElement,
        deleteElement,
        duplicateElement,
        templatePresets,
        applyTemplate,
        saveTemplate,
        loadTemplate,
        savedTemplates,
        zoom,
        setZoom,
      }}
    >
      {children}
    </InvoiceBuilderContext.Provider>
  );
};