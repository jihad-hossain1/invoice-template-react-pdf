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

interface StyleTwoProps {
  invoice: TPdfData;
}

export const StyleTwo: React.FC<StyleTwoProps> = (props: StyleTwoProps) => {
  const { invoice } = props
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {invoice?.logoUrl && (
              <Image
                src={`/api/image?url=${encodeURIComponent(invoice?.logoUrl)}`}
                style={styles.logo}
                // eslint-disable-next-line jsx-a11y/alt-text
              />
            )}
            <Text style={styles.companyName}>{invoice?.companyName}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>{invoice?.title}</Text>
            <Text style={styles.invoiceDetails}>
              {invoice?.title?.slice(0, 3)} No. #{invoice?.invoiceNumber}
            </Text>
            <Text style={styles.invoiceDetails}>
              Issue Date: {new Date(invoice?.date)?.toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Bill To</Text>
            <Text style={styles.infoValue}>{invoice?.customerName}</Text>
            <Text style={styles.infoValue}>{invoice?.customerAddress}</Text>

            <Text style={styles.infoLabel}>Contact</Text>
            <Text style={styles.infoValue}>{invoice?.customerPhone}</Text>
            <Text style={styles.infoValue}>{invoice?.customerEmail}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>From</Text>
            <Text style={styles.infoValue}>
              {invoice?.companyName || "N/A"}
            </Text>
            <Text style={styles.infoValue}>
              {invoice?.companyAddress || "N/A"}
            </Text>
            <Text style={styles.infoValue}>
              {invoice?.companyEmail || "N/A"}
            </Text>
            <Text style={styles.infoValue}>
              {invoice?.companyPhone || "N/A"}
            </Text>

            {/* <Text style={styles.infoLabel}>Payment Details</Text>
            <Text style={styles.infoValue}>Due Date: {new Date(invoice?.dueDate).toLocaleDateString() || "N/A"}</Text> */}
          </View>
        </View>

        <View style={styles.table}>
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

          {invoice?.items?.map((item: any, index: any) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.col1]}>
                {item?.product}
              </Text>
              <Text style={[styles.tableCell, styles.col3]}>{item?.price}</Text>
              <Text style={[styles.tableCell, styles.col2]}>
                {item?.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.col4]}>{item?.tax}</Text>
              <Text style={[styles.tableCell, styles.col5]}>
                {item?.price * item?.quantity +
                  (item?.price * item?.quantity * item?.tax) / 100}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.summarySection}>
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
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{invoice?.total}</Text>
            </View>
          </View>
        </View>
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

        {/* notes  */}
        <View style={styles.notesSection}>
          <Text style={styles.footerText}>
            This {invoice?.title} was created on a computer and is valid without
            a signature and seal.
          </Text>
          <Text style={styles.footerText}>
            {"Thank you for your business!"}
          </Text>
        </View>
        {invoice?.terms && <View style={styles.footer}>
          <Text style={styles.footerTitle}>Terms & Conditions</Text>
          <Text style={styles.footerText}>{invoice?.terms || "N/A"}</Text>
        </View>}
      </Page>
    </Document>
  );
};

// Create styles
const styles = StyleSheet.create({
  signatureSection: {
    marginTop: 30,
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  signatureImage: {
    width: 150,
    height: 50,
    objectFit: "contain",
    marginBottom: 5,
  },
  signatureLine: {
    fontSize: 12,
    color: "#333333",
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    color: "#666666",
  },
  notesSection: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    flexDirection: "column",
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingBottom: 20,
    borderBottom: "0.5px solid #E0E0E0",
  },
  headerLeft: {
    flexDirection: "column",
  },
  headerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  logo: {
    width: 70,
    height: 35,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
  invoiceDetails: {
    fontSize: 10,
    color: "#666666",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  infoColumn: {
    width: "48%",
  },
  infoLabel: {
    fontSize: 9,
    color: "#999999",
    marginBottom: 3,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 11,
    color: "#333333",
    marginBottom: 10,
  },
  table: {
    display: "flex",
    width: "100%",
    marginTop: 20,
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
    borderBottomStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
    borderBottomStyle: "solid",
  },
  tableHeaderCell: {
    fontSize: 9,
    color: "#999999",
    textTransform: "uppercase",
  },
  tableCell: {
    fontSize: 10,
    color: "#333333",
  },
  col1: { width: "40%" },
  col2: { width: "15%" },
  col3: { width: "15%" },
  col4: { width: "15%" },
  col5: { width: "15%", textAlign: "right" },
  summarySection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  summaryTable: {
    width: "40%",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  summaryLabel: {
    fontSize: 10,
    color: "#666666",
  },
  summaryValue: {
    fontSize: 10,
    color: "#333333",
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginTop: 5,
    borderTopWidth: 0.5,
    borderTopColor: "#E0E0E0",
    borderTopStyle: "solid",
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
  },
  totalValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "right",
  },
  footer: {
    marginTop: 40,
    borderTopWidth: 0.5,
    borderTopColor: "#E0E0E0",
    borderTopStyle: "solid",
    paddingTop: 20,
  },
  footerTitle: {
    fontSize: 9,
    color: "#999999",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  footerText: {
    fontSize: 9,
    color: "#666666",
    marginBottom: 10,
  },
  thankYou: {
    fontSize: 11,
    color: "#333333",
    marginTop: 20,
    textAlign: "center",
  },
});