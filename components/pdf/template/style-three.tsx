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

interface StyleThreeProps {
  invoice: TPdfData;
}

export const StyleThree: React.FC<StyleThreeProps> = (props: StyleThreeProps) => {
  const { invoice } = props;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Top Banner */}
        <View style={styles.topBanner}>
          <Text style={styles.invoiceTitle}>{invoice?.title}</Text>
        </View>

        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {invoice?.logoUrl && (
              <Image
                src={`/api/image?url=${encodeURIComponent(invoice?.logoUrl)}`}
                style={styles.logo}
              />
            )}
            <Text style={styles.companyName}>{invoice?.companyName}</Text>
            <Text style={styles.companyDetails}>{invoice?.companyAddress}</Text>
            <Text style={styles.companyDetails}>{invoice?.companyPhone}</Text>
            <Text style={styles.companyDetails}>{invoice?.companyEmail}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.invoiceNumberBox}>
              <Text style={styles.invoiceNumberLabel}>INVOICE NO.</Text>
              <Text style={styles.invoiceNumberValue}>#{invoice?.invoiceNumber}</Text>
            </View>
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>DATE</Text>
              <Text style={styles.dateValue}>{new Date(invoice?.date)?.toLocaleDateString()}</Text>
            </View>
          </View>
        </View>

        {/* Client Information */}
        <View style={styles.clientSection}>
          <View style={styles.clientBox}>
            <Text style={styles.clientLabel}>BILL TO</Text>
            <Text style={styles.clientName}>{invoice?.customerName}</Text>
            <Text style={styles.clientDetails}>{invoice?.customerAddress}</Text>
            <Text style={styles.clientDetails}>{invoice?.customerPhone}</Text>
            <Text style={styles.clientDetails}>{invoice?.customerEmail}</Text>
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
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.col1]}>
                {item?.product}
              </Text>
              <Text style={[styles.tableCell, styles.col2]}>
                {item?.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.col3]}>{item?.price}</Text>
              <Text style={[styles.tableCell, styles.col4]}>{item?.tax}</Text>
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
            {/* Notes Section */}
            <View style={styles.notesSection}>
              <Text style={styles.notesTitle}>NOTES</Text>
              <Text style={styles.notesText}>
                This {invoice?.title} was created on a computer and is valid without
                a signature and seal.
              </Text>
              <Text style={styles.notesText}>
                Thank you for your business!
              </Text>
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
          
          <View style={styles.summaryRight}>
            <View style={styles.summaryTable}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{invoice?.subtotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax</Text>
                <Text style={styles.summaryValue}>{invoice?.totalTax}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>{invoice?.shipping}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>TOTAL</Text>
                <Text style={styles.totalValue}>{invoice?.total}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Terms & Conditions */}
        {invoice?.terms && (
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>TERMS & CONDITIONS</Text>
            <Text style={styles.termsText}>{invoice?.terms || "N/A"}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 0,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },
  topBanner: {
    backgroundColor: "#3B82F6",
    padding: 20,
    marginBottom: 20,
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    textTransform: "uppercase",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  headerLeft: {
    flexDirection: "column",
    width: "50%",
  },
  headerRight: {
    flexDirection: "column",
    width: "40%",
    alignItems: "flex-end",
  },
  logo: {
    width: 80,
    height: 40,
    objectFit: "contain",
    marginBottom: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 5,
  },
  companyDetails: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 3,
  },
  invoiceNumberBox: {
    backgroundColor: "#EFF6FF",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    width: "100%",
  },
  invoiceNumberLabel: {
    fontSize: 8,
    color: "#3B82F6",
    fontWeight: "bold",
    marginBottom: 3,
  },
  invoiceNumberValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  dateBox: {
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 4,
    width: "100%",
  },
  dateLabel: {
    fontSize: 8,
    color: "#6B7280",
    fontWeight: "bold",
    marginBottom: 3,
  },
  dateValue: {
    fontSize: 12,
    color: "#111827",
  },
  clientSection: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  clientBox: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
    borderLeftStyle: "solid",
  },
  clientLabel: {
    fontSize: 8,
    color: "#6B7280",
    fontWeight: "bold",
    marginBottom: 5,
  },
  clientName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 5,
  },
  clientDetails: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 3,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#BFDBFE",
    borderBottomStyle: "solid",
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  tableContent: {
    paddingHorizontal: 30,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderBottomStyle: "solid",
  },
  tableCell: {
    fontSize: 10,
    color: "#4B5563",
  },
  col1: { width: "40%" },
  col2: { width: "15%" },
  col3: { width: "15%" },
  col4: { width: "15%" },
  col5: { width: "15%", textAlign: "right" },
  summarySection: {
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 30,
    marginBottom: 20,
  },
  summaryLeft: {
    width: "60%",
    paddingRight: 20,
  },
  summaryRight: {
    width: "40%",
  },
  notesSection: {
    marginBottom: 20,
  },
  notesTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#6B7280",
    marginBottom: 5,
  },
  notesText: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 5,
  },
  signatureSection: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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
  summaryTable: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 4,
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
    fontSize: 10,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 10,
    color: "#4B5563",
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3B82F6",
    textAlign: "right",
  },
  termsSection: {
    paddingHorizontal: 30,
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    borderTopStyle: "solid",
  },
  termsTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#6B7280",
    marginBottom: 5,
  },
  termsText: {
    fontSize: 9,
    color: "#4B5563",
  },
});