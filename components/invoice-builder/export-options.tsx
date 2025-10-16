"use client";

import React, { useRef } from "react";
import { useInvoiceBuilder } from "./context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import { ExportFormat } from "./types";

interface ExportOptionsProps {
  className?: string;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({
  className,
  canvasRef,
}) => {
  const { invoiceData, activeTemplate } = useInvoiceBuilder();

  const handleExport = async (format: ExportFormat) => {
    if (!canvasRef.current) return;

    const fileName = `invoice_${invoiceData.number || "template"}`;

    try {
      switch (format) {
        case "pdf":
          const pngDataUrl = await toPng(canvasRef.current, {
            quality: 1,
            pixelRatio: 2,
          });
          
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: [activeTemplate.width, activeTemplate.height],
          });
          
          pdf.addImage(
            pngDataUrl,
            "PNG",
            0,
            0,
            activeTemplate.width,
            activeTemplate.height
          );
          
          pdf.save(`${fileName}.pdf`);
          break;

        case "png":
          const pngData = await toPng(canvasRef.current, {
            quality: 1,
            pixelRatio: 2,
          });
          
          saveAs(pngData, `${fileName}.png`);
          break;

        case "docx":
          // For DOCX, we would typically use a server-side conversion
          // This is a simplified approach using HTML content
          alert("DOCX export would require server-side processing. This is a placeholder.");
          break;
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-medium mb-3">Export Options</h3>

      <div className="grid grid-cols-3 gap-3">
        <Card
          className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
          onClick={() => handleExport("pdf")}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <FileText className="h-8 w-8 text-blue-500 mb-2" />
            <p className="text-xs font-medium">PDF</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
          onClick={() => handleExport("png")}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <ImageIcon className="h-8 w-8 text-green-500 mb-2" />
            <p className="text-xs font-medium">PNG</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
          onClick={() => handleExport("docx")}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <FileText className="h-8 w-8 text-indigo-500 mb-2" />
            <p className="text-xs font-medium">DOCX</p>
          </CardContent>
        </Card>
      </div>

      <Button
        className="w-full mt-4"
        leftIcon={<Download className="h-4 w-4 mr-2" />}
        onClick={() => handleExport("pdf")}
      >
        Download Invoice
      </Button>
    </div>
  );
};