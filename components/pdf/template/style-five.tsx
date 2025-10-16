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

interface StyleFiveProps {
  invoice: TPdfData;
}

export const StyleFive: React.FC<StyleFiveProps> = (props: StyleFiveProps) => {
  const { invoice } = props;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* print at  */}
        <View style={{position: "absolute", top: 20, right: 30}}>
         <Text style={{fontSize: 6}}>Print At: {new Date().toLocaleDateString()} - {new Date().toLocaleTimeString()}</Text>
        </View>
        {/* Watermark */}
        {invoice?.companyName && invoice?.isWatermark !== false && (
          <View style={styles.watermarkContainer} fixed>
            <Text style={styles.watermarkText}>{invoice?.companyName}</Text>
          </View>
        )}

        {/* Header Section */}
        <View style={styles.header}>
          <View style={{ alignItems: "center", textAlign: "center" }}>
            {invoice?.logoUrl && (
              <Image
                src={`/api/image?url=${encodeURIComponent(invoice?.logoUrl)}`}
                style={styles.logo}
              />
            )}
            <Text style={{ fontSize: 10, textAlign: "center", marginBottom: 6 }}>{invoice?.companyName}</Text>
            <View style={{ display: "flex", gap: 4, flexWrap: "wrap", flexDirection: "row", alignItems: "center", justifyContent: "center", fontSize: 6, maxWidth: 300, textOverflow: "ellipsis" }}>
              <Text>{invoice?.companyAddress}</Text>
              <Text>{invoice?.companyPhone}</Text>
              <Text>{invoice?.companyEmail}</Text>
            </View>
          </View>
        </View>

        {/* Client and Invoice Information */}
        <View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>INVOICE TO</Text>
            <View style={{ display: "flex", gap: 4, flexDirection: "row", flexWrap: "wrap", maxWidth: 550, overflow: "hidden", textOverflow: "ellipsis", fontSize: 8 }}>
              <Text>{invoice?.customerName}, </Text>
              <Text>{invoice?.customerAddress}, </Text>
              <Text> {invoice?.customerPhone}, </Text>
              <Text>{invoice?.customerEmail} .</Text>
            </View>
            <View style={{ display: "flex", gap: 4, flexDirection: "row", marginTop: 10, fontSize: 8 }}>
              <Text><Text style={styles.fontBold}>INVOIC NO. #</Text>{invoice?.invoiceNumber}</Text>
              <Text><Text style={styles.fontBold}>Invoice Date: </Text>{new Date(invoice?.date)?.toLocaleDateString()}</Text>
              <Text><Text style={styles.fontBold}>Due Date: </Text>{new Date(invoice?.date)?.toLocaleDateString()}</Text>
              <Text><Text style={styles.fontBold}>Due Balance: </Text>{invoice?.total}</Text>
            </View>
          </View>

        </View>

        {/* Table Header */}
        <View style={{ ...styles.tableHeader, marginTop: 10, marginHorizontal: 32 }}>
          <Text style={[styles.tableHeaderCell, styles.colS]}>S/L</Text>
          <Text style={[styles.tableHeaderCell, styles.colDesc]}>PRODUCT DESCRIPTION</Text>
          <Text style={[styles.tableHeaderCell, styles.colQty]}>QTY</Text>
          <Text style={[styles.tableHeaderCell, styles.colPrice]}>UNITE PRICE</Text>
          <Text style={[styles.tableHeaderCell, styles.colAmount]}>AMOUNT</Text>
        </View>

        {/* Table Content */}
        <View style={{ ...styles.tableContent }}>
          {invoice?.items?.map((item: any, index: any) => (
            <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
              <Text style={[styles.tableCell, styles.colS]}>{index + 1}</Text>
              <Text style={[styles.tableCell, styles.colDesc]}>
                {item?.product}
              </Text>
              <Text style={[styles.tableCell, styles.colQty]}>
                {item?.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.colPrice]}>{item?.price}</Text>
              <Text style={[styles.tableCell, styles.colAmount]}>
                {item?.price * item?.quantity +
                  (item?.price * item?.quantity * item?.tax) / 100}
              </Text>
            </View>
          ))}
        </View>

        {/* Summary Section */}
        <View style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          marginTop: 20,
          marginBottom: 100,
          justifyContent: invoice?.isBankAccount ? "space-between" : "flex-end",
        }}>
          {
            invoice?.isBankAccount && (
              <View style={styles.bankingSection}>
                <Text style={styles.bankingTitle}>BANKING DETAILS</Text>
                <Text style={styles.bankingDetail}>XXXXXXXX</Text>
                <Text style={styles.bankingDetail}>Acct No: 0000000</Text>
                <Text style={styles.bankingDetail}>Sort Code: 00-00-00</Text>
                <Text style={styles.bankingDetail}>Acct Name: xxxxxxx Ltd</Text>
                <Text style={styles.bankingDetail}>Remittance Advice to: xxxxxxx@xxxxx.co.uk</Text>
                <Text style={styles.bankingDetail}>Company Registration No: 00000000</Text>
              </View>
            )
          }

          <View style={styles.summaryRight}>
            <View style={styles.summaryTable}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>SUB-TOTAL</Text>
                <Text style={styles.summaryValue}>{invoice?.subtotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>VAT%</Text>
                <Text style={styles.summaryValue}>{invoice?.totalTax}</Text>
              </View>
              <View style={{ ...styles.summaryRow, border: "0" }}>
                <Text style={styles.summaryLabel}>TOTAL</Text>
                <Text style={styles.summaryValue}>{invoice?.total}</Text>
              </View>
            </View>
          </View>
        </View>

          {/* footer section  */}
           
          <View style={{position: "absolute", bottom: 30, left: 30}}>
            {/* thank full message  */}
            <Text style={styles.termsText}>Thank you for your business.</Text>
          </View>
      </Page>
    </Document>
  );
};

// Create styles
const styles = StyleSheet.create({
  fontBold: {
    fontWeight: "semibold",
  },
  page: {
    flexDirection: "column",
    padding: 0,
    fontFamily: "Helvetica",
    // backgroundColor: "#FFFFFF",
    position: "relative",
  },
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
  },
  watermarkText: {
    fontSize: 60,
    color: "rgba(0, 77, 64, 0.1)", // Using the dark green color with low opacity
    transform: "rotate(-45deg)",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
  },

  headerCenter: {
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 40,
    objectFit: "contain",
    marginBottom: 5,
  },
  companyLogoText: {
    fontSize: 10,
    color: "#333333",
    marginTop: 5,
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  infoSection: {
    flexDirection: "column",
    // justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  infoColumn: {
    // width: "30%",
    marginLeft: 32,
  },
  infoColumnCenter: {
    // width: "30%",
    // alignItems: "center",
  },
  infoLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 2,
  },
  infoName: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 9,
    color: "#333333",
    marginBottom: 3,
  },
  invoiceNumberBox: {
    width: "100%",
    textAlign: "center",
  },
  invoiceNumberLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  invoiceDetailLabel: {
    fontSize: 9,
    marginBottom: 3,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    // paddingHorizontal: 30,
    borderBottomWidth: 0.5,
    // borderBottomColor: "#E5E7EB",
    borderBottomStyle: "solid",
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: "bold",
  },
  tableContent: {
    paddingHorizontal: 30,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    // borderBottomColor: "#E5E7EB",
    borderBottomStyle: "solid",
  },
  tableRowEven: {
    // backgroundColor: "#FFFFFF",
  },
  tableRowOdd: {
    // backgroundColor: "#F3F4F6",
  },
  tableCell: {
    fontSize: 9,
    color: "#333333",
  },
  colS: { width: "5%" },
  colDesc: { width: "45%" },
  colQty: { width: "10%", textAlign: "center" },
  colPrice: { width: "20%", textAlign: "center" },
  colAmount: { width: "20%", textAlign: "right" },

  bankingSection: {
    marginBottom: 20,
  },
  bankingTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  bankingDetail: {
    fontSize: 9,
    color: "#333333",
    marginBottom: 2,
  },
  termsSection: {
    marginTop: 20,
  },
  termsTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  termsText: {
    fontSize: 9,
    color: "#333333",
    lineHeight: 1.5,
  },
  summaryLeft: {
    width: "60%",
    paddingRight: 20,
  },
  summaryRight: {
    width: "40%",
  },
  summaryTable: {
    width: "100%",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomStyle: "solid",
  },
  summaryLabel: {
    fontSize: 9,
    color: "#333333",
  },
  summaryValue: {
    fontSize: 9,
    color: "#333333",
    textAlign: "right",
  },

});