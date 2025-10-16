"use client";

import React from "react";
import { useInvoiceBuilder } from "./context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PropertiesPanelProps {
  className?: string;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  className,
}) => {
  const { selectedElement, updateElement, invoiceData, setInvoiceData } =
    useInvoiceBuilder();

  // Handle element property changes
  const handleElementPropertyChange = (
    property: string,
    value: string | number
  ) => {
    if (!selectedElement) return;

    if (property.startsWith("position.")) {
      const positionProp = property.split(".")[1];
      updateElement({
        ...selectedElement,
        position: {
          ...selectedElement.position,
          [positionProp]: typeof value === "string" ? parseFloat(value) : value,
        },
      });
    } else if (property.startsWith("style.")) {
      const styleProp = property.split(".")[1];
      updateElement({
        ...selectedElement,
        style: {
          ...selectedElement.style,
          [styleProp]: value,
        },
      });
    } else if (property === "content") {
      updateElement({
        ...selectedElement,
        content: value as string,
      });
    }
  };

  // Handle invoice data changes
  const handleInvoiceDataChange = (
    section: string,
    field: string,
    value: string | number
  ) => {
    if (section === "business") {
      setInvoiceData({
        ...invoiceData,
        business: {
          ...invoiceData.business,
          [field]: value,
        },
      });
    } else if (section === "client") {
      setInvoiceData({
        ...invoiceData,
        client: {
          ...invoiceData.client,
          [field]: value,
        },
      });
    } else {
      setInvoiceData({
        ...invoiceData,
        [field]: value,
      });
    }
  };

  // Render element properties
  const renderElementProperties = () => {
    if (!selectedElement) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Element Properties</h3>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">X Position</label>
            <Input
              type="number"
              value={selectedElement.position.x}
              onChange={(e) =>
                handleElementPropertyChange(
                  "position.x",
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Y Position</label>
            <Input
              type="number"
              value={selectedElement.position.y}
              onChange={(e) =>
                handleElementPropertyChange(
                  "position.y",
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Width</label>
            <Input
              type="number"
              value={selectedElement.position.width}
              onChange={(e) =>
                handleElementPropertyChange(
                  "position.width",
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Height</label>
            <Input
              type="number"
              value={selectedElement.position.height}
              onChange={(e) =>
                handleElementPropertyChange(
                  "position.height",
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
        </div>

        {selectedElement.type === "text" && (
          <div>
            <label className="text-xs text-gray-500">Text Content</label>
            <Textarea
              value={selectedElement.content as string}
              onChange={(e) =>
                handleElementPropertyChange("content", e.target.value)
              }
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">Font Size</label>
            <Input
              type="number"
              value={selectedElement.style.fontSize || ""}
              onChange={(e) =>
                handleElementPropertyChange(
                  "style.fontSize",
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Font Weight</label>
            <Select
              value={selectedElement.style.fontWeight || "normal"}
              onValueChange={(value) =>
                handleElementPropertyChange("style.fontWeight", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
                <SelectItem value="lighter">Lighter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">Text Color</label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={selectedElement.style.color || "#000000"}
                onChange={(e) =>
                  handleElementPropertyChange("style.color", e.target.value)
                }
                className="w-10 h-10 p-1"
              />
              <Input
                type="text"
                value={selectedElement.style.color || "#000000"}
                onChange={(e) =>
                  handleElementPropertyChange("style.color", e.target.value)
                }
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500">Background Color</label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={selectedElement.style.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  handleElementPropertyChange(
                    "style.backgroundColor",
                    e.target.value
                  )
                }
                className="w-10 h-10 p-1"
              />
              <Input
                type="text"
                value={selectedElement.style.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  handleElementPropertyChange(
                    "style.backgroundColor",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">Border Color</label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={selectedElement.style.borderColor || "#000000"}
                onChange={(e) =>
                  handleElementPropertyChange(
                    "style.borderColor",
                    e.target.value
                  )
                }
                className="w-10 h-10 p-1"
              />
              <Input
                type="text"
                value={selectedElement.style.borderColor || "#000000"}
                onChange={(e) =>
                  handleElementPropertyChange(
                    "style.borderColor",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500">Border Width</label>
            <Input
              type="number"
              value={selectedElement.style.borderWidth || "0"}
              onChange={(e) =>
                handleElementPropertyChange(
                  "style.borderWidth",
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">Border Radius</label>
            <Input
              type="number"
              value={selectedElement.style.borderRadius || "0"}
              onChange={(e) =>
                handleElementPropertyChange(
                  "style.borderRadius",
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Opacity</label>
            <Input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={selectedElement.style.opacity || "1"}
              onChange={(e) =>
                handleElementPropertyChange(
                  "style.opacity",
                  parseFloat(e.target.value)
                )
              }
            />
          </div>
        </div>
      </div>
    );
  };

  // Render invoice data form
  const renderInvoiceDataForm = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Invoice Data</h3>

        <div className="space-y-2">
          <label className="text-xs text-gray-500">Invoice Number</label>
          <Input
            value={invoiceData.number}
            onChange={(e) =>
              handleInvoiceDataChange("invoice", "number", e.target.value)
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">Date</label>
            <Input
              type="date"
              value={invoiceData.date}
              onChange={(e) =>
                handleInvoiceDataChange("invoice", "date", e.target.value)
              }
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Due Date</label>
            <Input
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) =>
                handleInvoiceDataChange("invoice", "dueDate", e.target.value)
              }
            />
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-gray-500 mb-2">
            Business Information
          </h4>
          <div className="space-y-2">
            <Input
              placeholder="Business Name"
              value={invoiceData.business.name}
              onChange={(e) =>
                handleInvoiceDataChange("business", "name", e.target.value)
              }
            />
            <Input
              placeholder="Address"
              value={invoiceData.business.address}
              onChange={(e) =>
                handleInvoiceDataChange("business", "address", e.target.value)
              }
            />
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="City"
                value={invoiceData.business.city}
                onChange={(e) =>
                  handleInvoiceDataChange("business", "city", e.target.value)
                }
              />
              <Input
                placeholder="State"
                value={invoiceData.business.state}
                onChange={(e) =>
                  handleInvoiceDataChange("business", "state", e.target.value)
                }
              />
              <Input
                placeholder="ZIP"
                value={invoiceData.business.zip}
                onChange={(e) =>
                  handleInvoiceDataChange("business", "zip", e.target.value)
                }
              />
            </div>
            <Input
              placeholder="Country"
              value={invoiceData.business.country}
              onChange={(e) =>
                handleInvoiceDataChange("business", "country", e.target.value)
              }
            />
            <Input
              placeholder="Phone"
              value={invoiceData.business.phone}
              onChange={(e) =>
                handleInvoiceDataChange("business", "phone", e.target.value)
              }
            />
            <Input
              placeholder="Email"
              value={invoiceData.business.email}
              onChange={(e) =>
                handleInvoiceDataChange("business", "email", e.target.value)
              }
            />
            <Input
              placeholder="Website"
              value={invoiceData.business.website || ""}
              onChange={(e) =>
                handleInvoiceDataChange("business", "website", e.target.value)
              }
            />
            <Input
              placeholder="Tax ID"
              value={invoiceData.business.taxId || ""}
              onChange={(e) =>
                handleInvoiceDataChange("business", "taxId", e.target.value)
              }
            />
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-gray-500 mb-2">
            Client Information
          </h4>
          <div className="space-y-2">
            <Input
              placeholder="Client Name"
              value={invoiceData.client.name}
              onChange={(e) =>
                handleInvoiceDataChange("client", "name", e.target.value)
              }
            />
            <Input
              placeholder="Address"
              value={invoiceData.client.address}
              onChange={(e) =>
                handleInvoiceDataChange("client", "address", e.target.value)
              }
            />
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="City"
                value={invoiceData.client.city}
                onChange={(e) =>
                  handleInvoiceDataChange("client", "city", e.target.value)
                }
              />
              <Input
                placeholder="State"
                value={invoiceData.client.state}
                onChange={(e) =>
                  handleInvoiceDataChange("client", "state", e.target.value)
                }
              />
              <Input
                placeholder="ZIP"
                value={invoiceData.client.zip}
                onChange={(e) =>
                  handleInvoiceDataChange("client", "zip", e.target.value)
                }
              />
            </div>
            <Input
              placeholder="Country"
              value={invoiceData.client.country}
              onChange={(e) =>
                handleInvoiceDataChange("client", "country", e.target.value)
              }
            />
            <Input
              placeholder="Phone"
              value={invoiceData.client.phone || ""}
              onChange={(e) =>
                handleInvoiceDataChange("client", "phone", e.target.value)
              }
            />
            <Input
              placeholder="Email"
              value={invoiceData.client.email || ""}
              onChange={(e) =>
                handleInvoiceDataChange("client", "email", e.target.value)
              }
            />
          </div>
        </div>

        <div>
          <h4 className="text-xs font-medium text-gray-500 mb-2">
            Notes & Terms
          </h4>
          <div className="space-y-2">
            <Textarea
              placeholder="Notes"
              value={invoiceData.notes || ""}
              onChange={(e) =>
                handleInvoiceDataChange("invoice", "notes", e.target.value)
              }
            />
            <Textarea
              placeholder="Terms & Conditions"
              value={invoiceData.terms || ""}
              onChange={(e) =>
                handleInvoiceDataChange("invoice", "terms", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("h-full overflow-y-auto p-4", className)}>
      {selectedElement ? renderElementProperties() : renderInvoiceDataForm()}
    </div>
  );
};