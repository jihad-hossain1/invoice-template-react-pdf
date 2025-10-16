"use client";

import React from "react";
import Manage from "./manage";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { TPdfData } from "./type";
import { Download } from "lucide-react";

const Print = ({ invoiceData }: { invoiceData: TPdfData }) => {
  return (
    <>
      <PDFDownloadLink
        document={<Manage invoice={invoiceData} />}
        fileName={`invoice_${invoiceData.invoiceNumber || ""}.pdf`}
        className=""
      >
        {({ loading }) =>
          loading ? (
            "Loading..."
          ) : (
            <span className="flex items-center gap-2">
              <Download className="h-4 2xl:h-5 w-4 2xl:w-5" />
            </span>
          )
        }
      </PDFDownloadLink>
    </>
  );
};

export default Print;