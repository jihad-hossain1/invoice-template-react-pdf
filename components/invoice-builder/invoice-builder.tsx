"use client";

import React, { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { InvoiceBuilderProvider, useInvoiceBuilder } from "./context";
import { Canvas } from "./canvas";
import { Toolbar } from "./toolbar";
import { PropertiesPanel } from "./properties-panel";
import { TemplateSelector } from "./template-selector";
import { ExportOptions } from "./export-options";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Download,
  Layers,
  LayoutTemplate,
  Minus,
  Plus,
  Save,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InvoiceBuilderProps {
  className?: string;
}

export const InvoiceBuilder: React.FC<InvoiceBuilderProps> = ({
  className,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("design");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if we're on mobile
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Choose the appropriate backend based on device
  const dndBackend = isMobile ? TouchBackend : HTML5Backend;

  return (
    <InvoiceBuilderProvider>
      <DndProvider backend={dndBackend}>
        <div className={cn("flex flex-col h-full", className)}>
          <div className="border-b p-4">
            <h1 className="text-xl font-bold">Invoice Template Builder</h1>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-64 border-r bg-gray-50">
              <Tabs
                defaultValue="design"
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full flex flex-col"
              >
                <TabsList className="w-full justify-start px-2 pt-2 ">
                  <TabsTrigger value="design" className="flex-1">
                    <Layers className="h-4 w-4 mr-2" />
                    Design
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="flex-1">
                    <LayoutTemplate className="h-4 w-4 mr-2" />
                    Templates
                  </TabsTrigger>
                  <TabsTrigger value="export" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-y-auto p-4">
                  <TabsContent value="design" className="mt-0 h-full">
                    <Toolbar />
                  </TabsContent>

                  <TabsContent value="templates" className="mt-0 h-full">
                    <TemplateSelector />
                  </TabsContent>

                  <TabsContent value="export" className="mt-0 h-full">
                    <ExportOptions canvasRef={canvasRef} />
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Canvas Area */}
              <ZoomableCanvas canvasRef={canvasRef} />

              {/* Properties Panel */}
              <div className="w-full md:w-72 border-l bg-gray-50 overflow-y-auto">
                <PropertiesPanel />
              </div>
            </div>
          </div>
        </div>
      </DndProvider>
    </InvoiceBuilderProvider>
  );
};

interface ZoomableCanvasProps {
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

const ZoomableCanvas: React.FC<ZoomableCanvasProps> = ({ canvasRef }) => {
  const { zoom, setZoom, saveTemplate } = useInvoiceBuilder();

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleZoomOut}
            className="p-1 h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleZoomReset}
            className="px-2 h-8"
          >
            {Math.round(zoom * 100)}%
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleZoomIn}
            className="p-1 h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          size="sm"
          onClick={saveTemplate}
          leftIcon={<Save className="h-4 w-4 mr-2" />}
        >
          Save Template
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-8 bg-gray-100">
        <div className="flex justify-center">
          <div ref={canvasRef}>
            <Canvas className="shadow-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};