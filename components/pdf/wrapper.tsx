import dynamic from "next/dynamic";
import { TPdfData } from "./type";

const DynamicPrint = dynamic(() => import("./print"), { ssr: false });

const PdfWrapper = (props: { invoiceData: TPdfData }) => (
  <DynamicPrint {...props} />
);

export default PdfWrapper;