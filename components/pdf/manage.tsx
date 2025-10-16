"use client";

import { StyleOne } from "./template/style-one";
import { StyleFour } from "./template/style-four";
import { StyleFive } from "./template/style-five";

type TTheme =
  | "StyleOne"
  | "StyleTwo"
  | "StyleThree"
  | "StyleFour"
  | "StyleFive"
  | "StyleSix"
  | "StyleSeven"
  | "StyleEight";
type THasLogo = "ENABLE" | "DISABLE";

const InvoiceDocument = ({ invoice }: { invoice: any }) => {

  function rendererPdf(
    theme: TTheme = "StyleOne",
    hasLogo: THasLogo = "ENABLE"
  ) {

    switch (theme) {
      case "StyleOne":
        return <StyleOne invoice={invoice} />;
      case "StyleFour":
        return <StyleFour invoice={invoice} />;
      case "StyleFive":
        return <StyleFive invoice={invoice} />;
      default:
        return <StyleOne invoice={invoice} />;
    }
  }

  return <>{rendererPdf(invoice?.theme as TTheme, invoice?.hasLogo)}</>;
};

export default InvoiceDocument;