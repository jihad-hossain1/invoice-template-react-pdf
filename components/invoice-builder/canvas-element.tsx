"use client";

import React from "react";
import { CanvasElement, ElementType } from "./types";
import { useInvoiceBuilder } from "./context";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";

interface CanvasElementRendererProps {
  element: CanvasElement;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
  onDragStart: (e: React.MouseEvent) => void;
  zoom: number;
}

export const CanvasElementRenderer: React.FC<CanvasElementRendererProps> = ({
  element,
  isSelected,
  onClick,
  onDragStart,
  zoom,
}) => {
  const { invoiceData } = useInvoiceBuilder();

  // Common element styles
  const elementStyle = {
    left: element.position.x,
    top: element.position.y,
    width: element.position.width,
    height: element.position.height,
    transform: element.position.rotation
      ? `rotate(${element.position.rotation}deg)`
      : undefined,
    fontSize: element.style.fontSize ? `${element.style.fontSize}px` : undefined,
    fontFamily: element.style.fontFamily,
    fontWeight: element.style.fontWeight,
    color: element.style.color,
    backgroundColor: element.style.backgroundColor,
    borderColor: element.style.borderColor,
    borderWidth: element.style.borderWidth,
    borderRadius: element.style.borderRadius,
    padding: element.style.padding,
    textAlign: element.style.textAlign,
    lineHeight: element.style.lineHeight,
    opacity: element.style.opacity,
    cursor: element.locked ? "default" : "move",
    display: element.hidden ? "none" : "block",
  };

  // Render different elements based on type
  const renderElement = () => {
    switch (element.type) {
      case "text":
        return <div className="w-full h-full">{element.content}</div>;

      case "image":
        return element.src ? (
          <img
            src={element.src}
            alt="Element"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
        );

      case "rectangle":
        return <div className="w-full h-full" />;

      case "line":
        return (
          <div
            className="absolute"
            style={{
              left: 0,
              top: "50%",
              width: "100%",
              height: element.style.borderWidth || 1,
              backgroundColor: element.style.borderColor || "#000000",
            }}
          />
        );

      case "logo":
        return invoiceData.business.logo ? (
          <img
            src={invoiceData.business.logo}
            alt="Company Logo"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-500 text-xs">Logo</span>
          </div>
        );

      case "businessInfo":
        return (
          <div className="w-full h-full overflow-hidden text-left">
            <div className="font-bold">{invoiceData.business.name}</div>
            <div>{invoiceData.business.address}</div>
            <div>
              {invoiceData.business.city}, {invoiceData.business.state}{" "}
              {invoiceData.business.zip}
            </div>
            <div>{invoiceData.business.country}</div>
            <div>{invoiceData.business.phone}</div>
            <div>{invoiceData.business.email}</div>
            {invoiceData.business.website && (
              <div>{invoiceData.business.website}</div>
            )}
            {invoiceData.business.taxId && (
              <div>Tax ID: {invoiceData.business.taxId}</div>
            )}
          </div>
        );

      case "clientInfo":
        return (
          <div className="w-full h-full overflow-hidden text-left">
            <div className="font-bold mb-1">BILL TO:</div>
            <div className="font-semibold">{invoiceData.client.name}</div>
            <div>{invoiceData.client.address}</div>
            <div>
              {invoiceData.client.city}, {invoiceData.client.state}{" "}
              {invoiceData.client.zip}
            </div>
            <div>{invoiceData.client.country}</div>
            {invoiceData.client.phone && <div>{invoiceData.client.phone}</div>}
            {invoiceData.client.email && <div>{invoiceData.client.email}</div>}
          </div>
        );

      case "invoiceDetails":
        return (
          <div className="w-full h-full overflow-hidden">
            <table className="w-full text-left">
              <tbody>
                <tr>
                  <td className="font-semibold">Invoice #:</td>
                  <td>{invoiceData.number}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Date:</td>
                  <td>{invoiceData.date}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Due Date:</td>
                  <td>{invoiceData.dueDate}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Status:</td>
                  <td className="capitalize">{invoiceData.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "itemsTable":
        return (
          <div className="w-full h-full overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-1 border border-gray-300 text-left">Description</th>
                  <th className="p-1 border border-gray-300 text-right">Qty</th>
                  <th className="p-1 border border-gray-300 text-right">Price</th>
                  <th className="p-1 border border-gray-300 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item) => (
                  <tr key={item.id}>
                    <td className="p-1 border border-gray-300">{item.description}</td>
                    <td className="p-1 border border-gray-300 text-right">{item.quantity}</td>
                    <td className="p-1 border border-gray-300 text-right">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: invoiceData.currency,
                      }).format(item.price)}
                    </td>
                    <td className="p-1 border border-gray-300 text-right">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: invoiceData.currency,
                      }).format(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "totals":
        return (
          <div className="w-full h-full overflow-hidden">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="text-right font-semibold">Subtotal:</td>
                  <td className="text-right pl-4">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: invoiceData.currency,
                    }).format(invoiceData.subtotal)}
                  </td>
                </tr>
                {invoiceData.discountTotal > 0 && (
                  <tr>
                    <td className="text-right font-semibold">Discount:</td>
                    <td className="text-right pl-4">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: invoiceData.currency,
                      }).format(invoiceData.discountTotal)}
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="text-right font-semibold">Tax:</td>
                  <td className="text-right pl-4">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: invoiceData.currency,
                    }).format(invoiceData.taxTotal)}
                  </td>
                </tr>
                {invoiceData.shipping !== undefined && (
                  <tr>
                    <td className="text-right font-semibold">Shipping:</td>
                    <td className="text-right pl-4">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: invoiceData.currency,
                      }).format(invoiceData.shipping)}
                    </td>
                  </tr>
                )}
                <tr className="font-bold">
                  <td className="text-right">Total:</td>
                  <td className="text-right pl-4">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: invoiceData.currency,
                    }).format(invoiceData.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case "notes":
        return (
          <div className="w-full h-full overflow-hidden">
            <div className="font-semibold mb-1">Notes:</div>
            <div>{invoiceData.notes}</div>
          </div>
        );

      case "terms":
        return (
          <div className="w-full h-full overflow-hidden">
            <div className="font-semibold mb-1">Terms & Conditions:</div>
            <div>{invoiceData.terms}</div>
          </div>
        );

      case "signature":
        return (
          <div className="w-full h-full flex flex-col items-start justify-end">
            {invoiceData.signature ? (
              <img
                src={invoiceData.signature}
                alt="Signature"
                className="max-h-[60%] object-contain mb-1"
              />
            ) : (
              <div className="w-full border-b border-gray-400 mb-1"></div>
            )}
            <div className="text-sm">Authorized Signature</div>
          </div>
        );

      default:
        return <div className="w-full h-full">Unknown Element Type</div>;
    }
  };

  return (
    <div
      className={cn(
        "absolute select-none",
        isSelected && "ring-2 ring-blue-500"
      )}
      style={elementStyle}
      onClick={onClick}
      onMouseDown={onDragStart}
    >
      {renderElement()}
      
      {/* Resize handles (only shown when selected) */}
      {isSelected && !element.locked && (
        <>
          <div className="absolute w-2 h-2 bg-blue-500 top-0 left-0 cursor-nwse-resize" />
          <div className="absolute w-2 h-2 bg-blue-500 top-0 right-0 cursor-nesw-resize" />
          <div className="absolute w-2 h-2 bg-blue-500 bottom-0 left-0 cursor-nesw-resize" />
          <div className="absolute w-2 h-2 bg-blue-500 bottom-0 right-0 cursor-nwse-resize" />
        </>
      )}
    </div>
  );
};