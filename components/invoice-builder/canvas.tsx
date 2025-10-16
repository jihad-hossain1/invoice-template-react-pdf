"use client";

import React, { useRef, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { useInvoiceBuilder } from "./context";
import { CanvasElement, ElementType } from "./types";
import { CanvasElementRenderer } from "./canvas-element";
import { cn } from "@/lib/utils";

interface CanvasProps {
  className?: string;
}

export const Canvas: React.FC<CanvasProps> = ({ className }) => {
  const {
    activeTemplate,
    selectedElement,
    setSelectedElement,
    addElement,
    updateElement,
    zoom,
  } = useInvoiceBuilder();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Set up drop target for new elements
  const [{ isOver }, drop] = useDrop({
    accept: "TOOLBAR_ITEM",
    drop: (item: { type: ElementType }, monitor) => {
      if (!canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const dropPoint = monitor.getClientOffset();

      if (dropPoint) {
        const x = (dropPoint.x - canvasRect.left) / zoom;
        const y = (dropPoint.y - canvasRect.top) / zoom;
        addElement(item.type, x, y);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  // Handle element selection
  const handleElementClick = (
    e: React.MouseEvent,
    element: CanvasElement
  ) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  // Handle canvas click to deselect
  const handleCanvasClick = () => {
    setSelectedElement(null);
  };

  // Handle element drag start
  const handleDragStart = (
    e: React.MouseEvent,
    element: CanvasElement
  ) => {
    if (element.locked) return;
    
    e.stopPropagation();
    setIsDragging(true);
    setSelectedElement(element);

    if (canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const offsetX = (e.clientX - canvasRect.left) / zoom - element.position.x;
      const offsetY = (e.clientY - canvasRect.top) / zoom - element.position.y;
      setDragOffset({ x: offsetX, y: offsetY });
    }
  };

  // Handle element dragging
  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - canvasRect.left) / zoom - dragOffset.x;
    const y = (e.clientY - canvasRect.top) / zoom - dragOffset.y;

    // Update element position
    updateElement({
      ...selectedElement,
      position: {
        ...selectedElement.position,
        x,
        y,
      },
    });
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Set up event listeners for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDrag(e as unknown as React.MouseEvent);
      }
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, selectedElement]);

  return (
    <div
      ref={(node) => {
        canvasRef.current = node;
        drop(node);
      }}
      className={cn(
        "relative bg-white shadow-md overflow-hidden",
        isOver && "ring-2 ring-blue-400",
        className
      )}
      style={{
        width: activeTemplate.width * zoom,
        height: activeTemplate.height * zoom,
        backgroundColor: activeTemplate.background || "#ffffff",
        transform: `scale(${zoom})`,
        transformOrigin: "top left",
      }}
      onClick={handleCanvasClick}
    >
      {activeTemplate.elements.map((element) => (
        <CanvasElementRenderer
          key={element.id}
          element={element}
          isSelected={selectedElement?.id === element.id}
          onClick={(e) => handleElementClick(e, element)}
          onDragStart={(e) => handleDragStart(e, element)}
          zoom={zoom}
        />
      ))}
    </div>
  );
};