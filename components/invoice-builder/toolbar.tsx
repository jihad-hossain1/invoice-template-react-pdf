"use client";

import React from "react";
import { useDrag } from "react-dnd";
import { useInvoiceBuilder } from "./context";
import { ToolbarItem } from "./types";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Copy,
  Image,
  Layers,
  Layout,
  Lock,
  Minus,
  Square,
  Trash2,
  Type,
  Unlock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({ className }) => {
  const { selectedElement, updateElement, deleteElement, duplicateElement } =
    useInvoiceBuilder();

  // Define toolbar items
  const toolbarItems: ToolbarItem[] = [
    {
      id: "text",
      name: "Text",
      icon: <Type size={16} />,
      type: "text",
      defaultWidth: 150,
      defaultHeight: 40,
      defaultContent: "Text",
      defaultStyle: {
        fontSize: 14,
        color: "#000000",
      },
    },
    {
      id: "rectangle",
      name: "Rectangle",
      icon: <Square size={16} />,
      type: "rectangle",
      defaultWidth: 100,
      defaultHeight: 100,
      defaultStyle: {
        backgroundColor: "#f3f4f6",
        borderColor: "#d1d5db",
        borderWidth: 1,
        borderRadius: 4,
      },
    },
    {
      id: "line",
      name: "Line",
      icon: <Minus size={16} />,
      type: "line",
      defaultWidth: 200,
      defaultHeight: 2,
      defaultStyle: {
        borderColor: "#d1d5db",
        borderWidth: 1,
      },
    },
    {
      id: "image",
      name: "Image",
      icon: <Image size={16} />,
      type: "image",
      defaultWidth: 150,
      defaultHeight: 150,
    },
    {
      id: "logo",
      name: "Logo",
      icon: <Layout size={16} />,
      type: "logo",
      defaultWidth: 120,
      defaultHeight: 60,
    },
    {
      id: "businessInfo",
      name: "Business Info",
      icon: <Layers size={16} />,
      type: "businessInfo",
      defaultWidth: 200,
      defaultHeight: 120,
    },
    {
      id: "clientInfo",
      name: "Client Info",
      icon: <Layers size={16} />,
      type: "clientInfo",
      defaultWidth: 200,
      defaultHeight: 120,
    },
    {
      id: "invoiceDetails",
      name: "Invoice Details",
      icon: <Layers size={16} />,
      type: "invoiceDetails",
      defaultWidth: 200,
      defaultHeight: 100,
    },
    {
      id: "itemsTable",
      name: "Items Table",
      icon: <Layers size={16} />,
      type: "itemsTable",
      defaultWidth: 500,
      defaultHeight: 200,
    },
    {
      id: "totals",
      name: "Totals",
      icon: <Layers size={16} />,
      type: "totals",
      defaultWidth: 200,
      defaultHeight: 120,
    },
    {
      id: "notes",
      name: "Notes",
      icon: <Layers size={16} />,
      type: "notes",
      defaultWidth: 300,
      defaultHeight: 80,
    },
    {
      id: "terms",
      name: "Terms",
      icon: <Layers size={16} />,
      type: "terms",
      defaultWidth: 300,
      defaultHeight: 80,
    },
    {
      id: "signature",
      name: "Signature",
      icon: <Layers size={16} />,
      type: "signature",
      defaultWidth: 200,
      defaultHeight: 80,
    },
  ];

  // Handle text alignment change
  const handleAlignChange = (align: "left" | "center" | "right") => {
    if (!selectedElement) return;
    updateElement({
      ...selectedElement,
      style: {
        ...selectedElement.style,
        textAlign: align,
      },
    });
  };

  // Handle element locking/unlocking
  const handleLockToggle = () => {
    if (!selectedElement) return;
    updateElement({
      ...selectedElement,
      locked: !selectedElement.locked,
    });
  };

  // Handle element deletion
  const handleDelete = () => {
    if (!selectedElement) return;
    deleteElement(selectedElement.id);
  };

  // Handle element duplication
  const handleDuplicate = () => {
    if (!selectedElement) return;
    duplicateElement(selectedElement.id);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-3 gap-2">
        {toolbarItems.map((item) => (
          <DraggableToolbarItem key={item.id} item={item} />
        ))}
      </div>

      {selectedElement && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Element Options</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAlignChange("left")}
              className={cn(
                selectedElement.style.textAlign === "left" && "bg-blue-100"
              )}
            >
              <AlignLeft size={16} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAlignChange("center")}
              className={cn(
                selectedElement.style.textAlign === "center" && "bg-blue-100"
              )}
            >
              <AlignCenter size={16} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAlignChange("right")}
              className={cn(
                selectedElement.style.textAlign === "right" && "bg-blue-100"
              )}
            >
              <AlignRight size={16} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleLockToggle}
            >
              {selectedElement.locked ? (
                <Lock size={16} />
              ) : (
                <Unlock size={16} />
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDuplicate}
            >
              <Copy size={16} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDelete}
              className="text-red-500 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

interface DraggableToolbarItemProps {
  item: ToolbarItem;
}

const DraggableToolbarItem: React.FC<DraggableToolbarItemProps> = ({
  item,
}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "TOOLBAR_ITEM",
    item: { type: item.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Create a regular ref that we'll pass to the drag function
  const ref = React.useRef<HTMLDivElement>(null);
  
  // Connect the drag ref to our element ref
  React.useEffect(() => {
    if (ref.current) {
      dragRef(ref.current);
    }
  }, [dragRef]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center p-2 bg-white border rounded cursor-grab hover:bg-blue-50 transition-colors",
        isDragging && "opacity-100"
      )}
    >
      <div className="flex flex-col items-center gap-1 text-zinc-700">
        {item.icon}
        <span className="text-xs text-blue-500">{item.name}</span>
      </div>
    </div>
  );
};