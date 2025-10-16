# Invoice Template Builder

A comprehensive invoice template builder with Canva-like functionality. This module provides a drag-and-drop interface for designing custom invoice templates with real-time preview and multiple export options.

## Features

- **Drag-and-Drop Interface**: Easily design custom invoice templates by dragging and dropping elements onto the canvas.
- **Pre-designed Templates**: Choose from a selection of professional template options to get started quickly.
- **Customizable Fields**:
  - Business information
  - Client details
  - Itemized services/products
  - Tax calculations
  - Payment terms
- **Real-time Preview**: See your changes instantly as you design your invoice template.
- **Export Options**: Export your invoice in multiple formats (PDF, PNG, DOCX).
- **Responsive Design**: Works across devices, from desktop to mobile.
- **Template Management**: Save and manage your custom templates for future use.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/invoice-template-builder.git
   cd invoice-template-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Creating a New Template

1. Click on the "Templates" tab and select "Start with Blank Template" or choose one of the pre-designed templates.
2. Use the elements in the "Design" tab to add components to your invoice.
3. Customize the properties of each element using the properties panel on the right.
4. Fill in your business and client information in the properties panel when no element is selected.

### Saving a Template

1. Click the "Save Template" button at the top of the canvas.
2. Your template will be saved locally and will appear in the "Your Saved Templates" section of the Templates tab.

### Exporting an Invoice

1. Click on the "Export" tab.
2. Choose your preferred export format (PDF, PNG, or DOCX).
3. Click the "Download Invoice" button to download your invoice.

## Technologies Used

- React.js
- Next.js
- React DnD (Drag and Drop)
- React PDF
- TailwindCSS
- HTML-to-Image
- jsPDF
- File Saver

## Project Structure

- `/components/invoice-builder`: Contains all the invoice builder components
  - `/context.tsx`: Provides state management for the invoice builder
  - `/canvas.tsx`: Main canvas component for the drag-and-drop interface
  - `/canvas-element.tsx`: Renders individual elements on the canvas
  - `/toolbar.tsx`: Contains tools for adding elements to the canvas
  - `/properties-panel.tsx`: Allows customization of selected elements
  - `/template-selector.tsx`: Provides pre-designed template options
  - `/export-options.tsx`: Handles exporting invoices in different formats
  - `/types.ts`: TypeScript type definitions for the invoice builder

## Learn More

This project is built with Next.js. To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
