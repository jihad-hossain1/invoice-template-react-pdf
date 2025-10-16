"use client";

import React from "react";
import { useInvoiceBuilder } from "./context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  className?: string;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  className,
}) => {
  const { templatePresets, applyTemplate, savedTemplates, loadTemplate } =
    useInvoiceBuilder();

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-sm font-medium mb-3">Pre-designed Templates</h3>
        <div className="grid grid-cols-2 gap-3">
          {templatePresets.map((preset) => (
            <Card
              key={preset.id}
              className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
              onClick={() => applyTemplate(preset.id)}
            >
              <div className="aspect-[3/4] bg-gray-100 relative">
                {preset.thumbnail ? (
                  <img
                    src={preset.thumbnail}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Preview
                  </div>
                )}
              </div>
              <CardContent className="p-2">
                <p className="text-xs font-medium text-center">{preset.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {savedTemplates.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-3">Your Saved Templates</h3>
          <div className="grid grid-cols-2 gap-3">
            {savedTemplates.map((template) => (
              <Card
                key={template.id}
                className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                onClick={() => loadTemplate(template.id)}
              >
                <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                  <div className="text-xs text-gray-500">{template.name}</div>
                </div>
                <CardContent className="p-2">
                  <p className="text-xs font-medium text-center">
                    {template.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => applyTemplate("blank")}
        >
          Start with Blank Template
        </Button>
      </div>
    </div>
  );
};