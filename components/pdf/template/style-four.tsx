/* eslint-disable jsx-a11y/alt-text */

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet
} from "@react-pdf/renderer";
import { TPdfData } from "../type";

interface StyleFourProps {
  invoice: TPdfData;
  logoBase64?: string | null;
}

export const StyleFour: React.FC<StyleFourProps> = (props: StyleFourProps) => {
  const { invoice, logoBase64 } = props;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.invoiceTitle}>Invoice</Text>
            <View style={styles.invoiceInfoBox}>
              <View style={styles.invoiceInfoItem}>
                <Text style={styles.invoiceInfoLabel}>INVOICE #</Text>
                <Text style={styles.invoiceInfoValue}>{invoice?.invoiceNumber}</Text>
              </View>
              <View style={styles.invoiceInfoItem}>
                <Text style={styles.invoiceInfoLabel}>INVOICE DATE</Text>
                <Text style={styles.invoiceInfoValue}>{new Date(invoice?.date)?.toLocaleDateString()}</Text>
              </View>
              <View style={styles.invoiceInfoItem}>
                <Text style={styles.invoiceInfoLabel}>DUE AMOUNT</Text>
                <Text style={styles.invoiceInfoValue}>{invoice?.total}</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            {invoice?.logoUrl && (
              <Image
                src={`/api/image?url=${encodeURIComponent(invoice?.logoUrl)}`}
                style={styles.logo}
              />
            )}
            <Text style={styles.companyName}>{invoice?.companyName}</Text>
            <Text style={styles.companyDetails}>{invoice?.companyAddress}</Text>
          </View>
        </View>

        {/* Client and Company Information */}
        <View style={styles.infoSection}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>BILLED TO</Text>
            <Text style={styles.infoName}>{invoice?.customerName}</Text>
            <Text style={styles.infoValue}>{invoice?.customerAddress}</Text>
            <Text style={styles.infoValue}>{invoice?.customerPhone}</Text>
            <Text style={styles.infoValue}>{invoice?.customerEmail}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>FROM</Text>
            <Text style={styles.infoName}>{invoice?.companyName || "N/A"}</Text>
            <Text style={styles.infoValue}>{invoice?.companyAddress || "N/A"}</Text>
            <Text style={styles.infoValue}>{invoice?.companyPhone || "N/A"}</Text>
            <Text style={styles.infoValue}>{invoice?.companyEmail || "N/A"}</Text>
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          {invoice?.itemsHead?.map((head: any, index: any) => (
            <Text
              key={index}
              style={[
                styles.tableHeaderCell,
                index === 0
                  ? styles.col1
                  : index === 1
                  ? styles.col2
                  : index === 2
                  ? styles.col3
                  : index === 3
                  ? styles.col4
                  : styles.col5,
              ]}
            >
              {head?.name}
            </Text>
          ))}
        </View>

        {/* Table Content */}
        <View style={styles.tableContent}>
          {invoice?.items?.map((item: any, index: any) => (
            <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
              <Text style={[styles.tableCell, styles.col1]}>
                {item?.product}
              </Text>
              <Text style={[styles.tableCell, styles.col2]}>
                {item?.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.col3]}>{item?.price}</Text>
              <Text style={[styles.tableCell, styles.col4]}>{item?.tax}%</Text>
              <Text style={[styles.tableCell, styles.col5]}>
                {item?.price * item?.quantity +
                  (item?.price * item?.quantity * item?.tax) / 100}
              </Text>
            </View>
          ))}
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <View style={styles.summaryLeft}>
            {/* Payment Information */}
            <View style={styles.paymentSection}>
              <Text style={styles.paymentTitle}>BANK & PAYMENT DETAILS</Text>
              <View style={styles.paymentDetails}>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Account Holder Name</Text>
                  <Text style={styles.paymentValue}>{invoice?.companyName}</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Account Number</Text>
                  <Text style={styles.paymentValue}>XXXXXXXXXX</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>IFSC</Text>
                  <Text style={styles.paymentValue}>XXXXXXXXXX</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Account Type</Text>
                  <Text style={styles.paymentValue}>Savings</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Bank</Text>
                  <Text style={styles.paymentValue}>State Bank of India</Text>
                </View>
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>UPI</Text>
                  <Text style={styles.paymentValue}>example@upi</Text>
                </View>
              </View>
            </View>

            {/* Terms & Conditions */}
            {invoice?.terms && (
              <View style={styles.termsSection}>
                <Text style={styles.termsTitle}>TERMS AND CONDITIONS</Text>
                <Text style={styles.termsText}>{invoice?.terms || "N/A"}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.summaryRight}>
            <View style={styles.summaryTable}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Sub Total</Text>
                <Text style={styles.summaryValue}>{invoice?.subtotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount(10%)</Text>
                <Text style={styles.summaryValue}>₹0.00</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Taxable Amount</Text>
                <Text style={styles.summaryValue}>{invoice?.totalTax}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>CGST</Text>
                <Text style={styles.summaryValue}>₹0.00</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>SGST</Text>
                <Text style={styles.summaryValue}>₹0.00</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Due</Text>
                <Text style={styles.totalValue}>{invoice?.total}</Text>
              </View>
            </View>

            {/* Invoice Total in Words */}
            <View style={styles.totalInWords}>
              <Text style={styles.totalInWordsLabel}>Invoice total in words</Text>
              <Text style={styles.totalInWordsValue}>Forty Two thousand Four Hundred and Eighty</Text>
            </View>

            {/* Signature Section */}
            {invoice?.isSignature && (
              <View style={styles.signatureSection}>
                {invoice?.signatureImage && (
                  <Image
                    src={`/api/image?url=${encodeURIComponent(
                      invoice?.signatureImage
                    )}`}
                    style={styles.signatureImage}
                  />
                )}
                <Text style={styles.signatureLine}>____________________</Text>
                <Text style={styles.signatureText}>Authorized Signature</Text>
              </View>
            )}
          </View>
        </View>

        {/* Footer Notes */}
        <View style={styles.footerNotes}>
          <Text style={styles.footerText}>
            This {invoice?.title} was created on a computer and is valid without a signature and seal.
          </Text>
          <Text style={styles.footerText}>
            Thank you for your business!
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerLeft: {
    flexDirection: "column",
    width: "60%",
  },
  headerRight: {
    flexDirection: "column",
    width: "35%",
    alignItems: "flex-end",
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 15,
  },
  invoiceInfoBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  invoiceInfoItem: {
    marginRight: 20,
    marginBottom: 10,
  },
  invoiceInfoLabel: {
    fontSize: 8,
    color: "#6B7280",
    fontWeight: "bold",
    marginBottom: 3,
  },
  invoiceInfoValue: {
    fontSize: 10,
    color: "#111827",
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: 40,
    objectFit: "contain",
    marginBottom: 10,
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 5,
    textAlign: "right",
  },
  companyDetails: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 3,
    textAlign: "right",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    padding: 15,
  },
  infoColumn: {
    width: "48%",
  },
  infoLabel: {
    fontSize: 8,
    color: "#6B7280",
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 3,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  tableContent: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 30,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableRowEven: {
    backgroundColor: "#F9FAFB",
  },
  tableRowOdd: {
    backgroundColor: "#FFFFFF",
  },
  tableCell: {
    fontSize: 9,
    color: "#4B5563",
  },
  col1: { width: "40%" },
  col2: { width: "15%" },
  col3: { width: "15%" },
  col4: { width: "15%" },
  col5: { width: "15%", textAlign: "right" },
  summarySection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryLeft: {
    width: "48%",
  },
  summaryRight: {
    width: "48%",
  },
  paymentSection: {
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 10,
  },
  paymentDetails: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    padding: 10,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  paymentLabel: {
    fontSize: 8,
    color: "#6B7280",
    width: "40%",
  },
  paymentValue: {
    fontSize: 8,
    color: "#111827",
    width: "60%",
  },
  termsSection: {
    marginTop: 20,
  },
  termsTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 10,
  },
  termsText: {
    fontSize: 8,
    color: "#4B5563",
    lineHeight: 1.5,
  },
  summaryTable: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderBottomStyle: "solid",
  },
  summaryLabel: {
    fontSize: 9,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 9,
    color: "#4B5563",
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4F46E5",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4F46E5",
    textAlign: "right",
  },
  totalInWords: {
    marginBottom: 20,
  },
  totalInWordsLabel: {
    fontSize: 8,
    color: "#6B7280",
    marginBottom: 3,
  },
  totalInWordsValue: {
    fontSize: 9,
    fontStyle: "italic",
    color: "#4B5563",
  },
  signatureSection: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  signatureImage: {
    width: 120,
    height: 40,
    objectFit: "contain",
    marginBottom: 5,
  },
  signatureLine: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 9,
    color: "#6B7280",
  },
  footerNotes: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    borderTopStyle: "solid",
    paddingTop: 15,
    alignItems: "center",
  },
  footerText: {
    fontSize: 8,
    color: "#6B7280",
    marginBottom: 5,
    textAlign: "center",
  },
});