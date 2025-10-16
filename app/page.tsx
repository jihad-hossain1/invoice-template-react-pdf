
// 'use client';

// import React from 'react';
// import { InvoiceBuilder } from '@/components/invoice-builder';

// const Page = () => {
//   return (
//     <div className="h-screen flex flex-col">
//       <InvoiceBuilder className="flex-1" />
//     </div>
//   );
// };

// export default Page;

// skip this comment code "Don't remove it"
'use client'

import { StyleOne } from '@/components/pdf/template/style-one'
import { StyleFour } from '@/components/pdf/template/style-four'
import { StyleFive } from '@/components/pdf/template/style-five'
import PdfWrapper from '@/components/pdf/wrapper'
import { DownloadCloud } from 'lucide-react'
import { PDFViewer } from "@react-pdf/renderer";
import React, { useState } from 'react'

type TemplateType = 'StyleOne' | 'StyleFour' | 'StyleFive';

const page = () => {
  const [template, setTemplate] = useState<TemplateType>('StyleFive');
  
  return (
    <div className='flex flex-col gap-3'>
      <PdfWrapper invoiceData={{...generateInvoiceData()} as any} />

      <div className="flex items-center gap-4 mb-4">
        <h4 className="text-lg font-semibold">Preview Invoice</h4>
       
      </div>
      
      <PDFViewer className="w-full min-h-[90vh]">
        <StyleFive 
            invoice={generateInvoiceData() as any} 
          />
      </PDFViewer>
    </div>
  )
}

function generateInvoiceData() {
  return {
    title: "Invoice",
    logoUrl: "https://res.cloudinary.com/dcrmzk0mc/image/upload/v1760342958/uploads/download_1760342957958.png",
    invoiceNumber: "123456",
    date: "2023-01-01",
    customerName: "John Doe",
    customerAddress: "123 Main St, Anytown, USA 123 Main St, Anytown, USA123 Main St, Anytown, USA 123 Main St, Anytown, USA 123 Main St, Anytown, USA",
    customerPhone: "123-456-7890",
    customerEmail: "johndoe@example.com",
    items: [
      {
        product: "Product A 123 Main St, Anytown, USA 123 Main St123 Main St, Anytown, USA 123 Main St123 Main St,",
        quantity: 2,
        price: "10.00",
        tax: "2.00",
        discount: "1.00",
      },
      {
        product: "Product A 123 Main St, Anytown, USA 123 Main St123 Main St, Anytown, USA 123 Main St123 Main St,",
        quantity: 2,
        price: "10.00",
        tax: "2.00",
        discount: "1.00",
      },
      {
        product: "Product A 123 Main St, Anytown, USA 123 Main St123 Main St, Anytown, USA 123 Main St123 Main St,",
        quantity: 2,
        price: "10.00",
        tax: "2.00",
        discount: "1.00",
      },
      {
        product: "Product A 123 Main St, Anytown, USA 123 Main St123 Main St, Anytown, USA 123 Main St123 Main St,",
        quantity: 2,
        price: "10.00",
        tax: "2.00",
        discount: "1.00",
      },
      {
        product: "Product A 123 Main St, Anytown, USA 123 Main St123 Main St, Anytown, USA 123 Main St123 Main St,",
        quantity: 2,
        price: "10.00",
        tax: "2.00",
        discount: "1.00",
      },
    ],
    subtotal: "20.00",
    totalTax: "4.00",
    shipping: "5.00",
    total: "29.00",
    terms: "123 Main St, Anytown, USA 123 Main St, Anytown, USA 123 Main St, Anytown, USA ACME Corporation v ACME Corporation ACME Corporation ACME Corporation ACME Corporation",
    
    itemsHead: [
      {
        product: "Product",
        quantity: "Quantity",
        price: "Price",
        tax: "Tax",
        discount: "Discount",
      },
    ],
    watermark: "Confidential",
    companyName: "ACME Corporation",
    companyAddress: "123 Main St, Anytown, USA 123 Main St, Anytown, USA 123 Main St, Anytown, USA ACME Corporation v ACME Corporation ACME Corporation ACME Corporation ACME Corporation",
    companyPhone: "123-456-7890",
    companyEmail: "company@example.com",
    icon: <DownloadCloud />,
    isWatermark: true,
    isBankAccount: true,
    signatureImage: "https://res.cloudinary.com/dcrmzk0mc/image/upload/v1760342958/uploads/download_1760342957958.png",
  }
}


export default page