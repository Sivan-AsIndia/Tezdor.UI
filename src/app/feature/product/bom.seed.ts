import { BomNode } from "./bom";

const LAPTOP_BOM: BomNode[] = [
  {
    id: 1001, productId: 1, parentId: null, level: 1,
    itemName: 'Main Board Assembly', itemCode: 'CMP-MB-001',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 18000, isOptional: false,
    processingNotes: 'SMT soldering required', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 1002, productId: 1, parentId: 1001, level: 2,
    itemName: 'Intel i7 Processor (12th Gen)', itemCode: 'RM-CPU-012',
    rawMaterialId: 'RM-CPU-012', rawMaterialName: 'Intel i7-1255U',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 12000, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 1003, productId: 1, parentId: 1001, level: 2,
    itemName: 'DDR5 16GB RAM Module', itemCode: 'RM-RAM-016',
    rawMaterialId: 'RM-RAM-016', rawMaterialName: 'Samsung DDR5 16GB',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0.5, costPerUnit: 4500, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 1004, productId: 1, parentId: null, level: 1,
    itemName: 'Display Assembly (15.6" FHD)', itemCode: 'CMP-DSP-156',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 8000, isOptional: false,
    processingNotes: 'Handle with anti-static gloves', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 1005, productId: 1, parentId: 1004, level: 2,
    itemName: 'IPS Panel 15.6"', itemCode: 'RM-PNL-156',
    rawMaterialId: 'RM-PNL-156', rawMaterialName: 'BOE IPS 1920×1080',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 5500, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 1006, productId: 1, parentId: null, level: 1,
    itemName: '512GB NVMe SSD', itemCode: 'RM-SSD-512',
    rawMaterialId: 'RM-SSD-512', rawMaterialName: 'WD Blue SN570 512GB',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 3500, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 1007, productId: 1, parentId: null, level: 1,
    itemName: 'Laptop Chassis + Keyboard', itemCode: 'CMP-CHX-001',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 1.5, costPerUnit: 3200, isOptional: false,
    processingNotes: 'Aluminium alloy body', isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 1008, productId: 1, parentId: null, level: 1,
    itemName: '65W USB-C Charger', itemCode: 'CMP-CHR-65W',
    rawMaterialId: 'CMP-CHR-65W', rawMaterialName: 'GaN 65W Adapter',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 800, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
];

const MOUSE_BOM: BomNode[] = [
  {
    id: 2001, productId: 2, parentId: null, level: 1,
    itemName: 'Mouse Body (Top + Bottom Shell)', itemCode: 'CMP-MSH-001',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 180, isOptional: false,
    processingNotes: 'ABS plastic injection moulding', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 2002, productId: 2, parentId: 2001, level: 2,
    itemName: 'ABS Granules (Black)', itemCode: 'RM-ABS-BLK',
    rawMaterialId: 'RM-ABS-BLK', rawMaterialName: 'ABS Polymer granules',
    quantity: 0.08, unitId: 'kg', unitName: 'Kg',
    wastagePercent: 5, costPerUnit: 150, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 2003, productId: 2, parentId: null, level: 1,
    itemName: 'PCB Assembly (Wireless)', itemCode: 'CMP-PCB-MSE',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 420, isOptional: false,
    processingNotes: 'Includes 2.4GHz Nordic chip', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 2004, productId: 2, parentId: 2003, level: 2,
    itemName: 'Optical Sensor (PixArt 3395)', itemCode: 'RM-SNS-3395',
    rawMaterialId: 'RM-SNS-3395', rawMaterialName: 'PixArt PMW3395',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0.5, costPerUnit: 280, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 2005, productId: 2, parentId: 2003, level: 2,
    itemName: 'Omron Click Switch', itemCode: 'RM-SW-OMR',
    rawMaterialId: 'RM-SW-OMR', rawMaterialName: 'Omron D2FC-F-7N',
    quantity: 2, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 35, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 2006, productId: 2, parentId: null, level: 1,
    itemName: 'AA Battery (1.5V)', itemCode: 'RM-BAT-AA',
    rawMaterialId: 'RM-BAT-AA', rawMaterialName: 'Duracell AA',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 40, isOptional: false,
    processingNotes: 'Included in box', isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 2007, productId: 2, parentId: null, level: 1,
    itemName: 'USB Nano Receiver (2.4GHz)', itemCode: 'RM-RCV-24G',
    rawMaterialId: 'RM-RCV-24G', rawMaterialName: 'Nordic nRF24 dongle',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0.5, costPerUnit: 95, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 2008, productId: 2, parentId: null, level: 1,
    itemName: 'Retail Box + Insert', itemCode: 'PKG-MSE-001',
    rawMaterialId: 'PKG-MSE-001', rawMaterialName: 'Corrugated box + foam',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 28, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
];

const TSHIRT_BOM: BomNode[] = [
  {
    id: 3001, productId: 3, parentId: null, level: 1,
    itemName: 'Cotton Fabric (180 GSM)', itemCode: 'RM-FAB-COT',
    rawMaterialId: 'RM-FAB-COT', rawMaterialName: 'Combed cotton 180 GSM',
    quantity: 1.2, unitId: 'mtr', unitName: 'Meter',
    wastagePercent: 10, costPerUnit: 90, isOptional: false,
    processingNotes: 'Pre-shrunk, single jersey knit', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 3002, productId: 3, parentId: null, level: 1,
    itemName: 'Reactive Dye (Blue #5)', itemCode: 'RM-DYE-B05',
    rawMaterialId: 'RM-DYE-B05', rawMaterialName: 'Reactive blue dye',
    quantity: 0.02, unitId: 'kg', unitName: 'Kg',
    wastagePercent: 5, costPerUnit: 800, isOptional: false,
    processingNotes: 'OEKO-TEX certified', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 3003, productId: 3, parentId: null, level: 1,
    itemName: 'Sewing Thread (White)', itemCode: 'RM-THD-WHT',
    rawMaterialId: 'RM-THD-WHT', rawMaterialName: 'Polyester sewing thread',
    quantity: 50, unitId: 'mtr', unitName: 'Meter',
    wastagePercent: 8, costPerUnit: 0.5, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 3004, productId: 3, parentId: null, level: 1,
    itemName: 'Neck Ribbing + Tape', itemCode: 'RM-RIB-NEC',
    rawMaterialId: 'RM-RIB-NEC', rawMaterialName: 'Cotton rib tape 1"',
    quantity: 0.35, unitId: 'mtr', unitName: 'Meter',
    wastagePercent: 5, costPerUnit: 18, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 3005, productId: 3, parentId: null, level: 1,
    itemName: 'Woven Label + Hang Tag', itemCode: 'PKG-LBL-001',
    rawMaterialId: 'PKG-LBL-001', rawMaterialName: 'Woven brand label',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 4, isOptional: false,
    processingNotes: 'Brand label + size label + care label', isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
  {
    id: 3006, productId: 3, parentId: null, level: 1,
    itemName: 'Polybag (30 × 40 cm)', itemCode: 'PKG-PLY-001',
    rawMaterialId: 'PKG-PLY-001', rawMaterialName: 'LDPE polybag',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 2.5, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 6,
  },
];

const HONEY_BOM: BomNode[] = [
  {
    id: 4001, productId: 4, parentId: null, level: 1,
    itemName: 'Raw Organic Honey (Bulk)', itemCode: 'RM-HON-RAW',
    rawMaterialId: 'RM-HON-RAW', rawMaterialName: 'Raw wildflower honey',
    quantity: 0.55, unitId: 'kg', unitName: 'Kg',
    wastagePercent: 5, costPerUnit: 400, isOptional: false,
    processingNotes: 'Cold-extracted, moisture < 20%', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 4002, productId: 4, parentId: null, level: 1,
    itemName: 'Glass Jar 500ml (Borosilicate)', itemCode: 'PKG-JAR-500',
    rawMaterialId: 'PKG-JAR-500', rawMaterialName: 'Borosilicate glass jar',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 28, isOptional: false,
    processingNotes: 'Food grade', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 4003, productId: 4, parentId: null, level: 1,
    itemName: 'Metal Lid (63mm)', itemCode: 'PKG-LID-063',
    rawMaterialId: 'PKG-LID-063', rawMaterialName: 'Tin-coated steel lid',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 6, isOptional: false,
    processingNotes: 'BPA-free lining', isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 4004, productId: 4, parentId: null, level: 1,
    itemName: 'Paper Label (Front + Back)', itemCode: 'PKG-LBL-HON',
    rawMaterialId: 'PKG-LBL-HON', rawMaterialName: 'Kraft paper label',
    quantity: 2, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 3, isOptional: false,
    processingNotes: 'FSSAI, batch no, expiry printed', isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 4005, productId: 4, parentId: null, level: 1,
    itemName: 'Carton Box (6-jar master pack)', itemCode: 'PKG-CTN-006',
    rawMaterialId: 'PKG-CTN-006', rawMaterialName: '3-ply corrugated carton',
    quantity: 0.167, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 48, isOptional: false,
    processingNotes: '1/6th of a master carton', isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
];

const HAMMER_BOM: BomNode[] = [
  {
    id: 5001, productId: 5, parentId: null, level: 1,
    itemName: 'Hammer Head (500g Cast Steel)', itemCode: 'CMP-HMH-500',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 85, isOptional: false,
    processingNotes: 'Drop forged, heat-treated', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 5002, productId: 5, parentId: 5001, level: 2,
    itemName: 'Mild Steel Billet', itemCode: 'RM-STL-BLT',
    rawMaterialId: 'RM-STL-BLT', rawMaterialName: 'MS billet 42CrMo4',
    quantity: 0.6, unitId: 'kg', unitName: 'Kg',
    wastagePercent: 8, costPerUnit: 95, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 5003, productId: 5, parentId: null, level: 1,
    itemName: 'Hickory Wood Handle (350mm)', itemCode: 'CMP-HND-350',
    rawMaterialId: 'RM-WOD-HCK', rawMaterialName: 'Hickory hardwood',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 5, costPerUnit: 35, isOptional: false,
    processingNotes: 'Lacquer-coated; anti-slip grip wrap', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 5004, productId: 5, parentId: 5003, level: 2,
    itemName: 'Anti-slip Rubber Grip', itemCode: 'RM-GRP-RBR',
    rawMaterialId: 'RM-GRP-RBR', rawMaterialName: 'NBR rubber grip tape',
    quantity: 0.18, unitId: 'mtr', unitName: 'Meter',
    wastagePercent: 4, costPerUnit: 55, isOptional: true,
    processingNotes: 'Optional comfort grip', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 5005, productId: 5, parentId: null, level: 1,
    itemName: 'Steel Wedge Pin', itemCode: 'RM-WDG-STL',
    rawMaterialId: 'RM-WDG-STL', rawMaterialName: 'Hardened steel wedge',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 8, isOptional: false,
    processingNotes: 'Fixes handle to head', isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 5006, productId: 5, parentId: null, level: 1,
    itemName: 'Blister Card Packaging', itemCode: 'PKG-BLS-HMR',
    rawMaterialId: 'PKG-BLS-HMR', rawMaterialName: 'Blister card + cling',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 12, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
];

const PAPER_BOM: BomNode[] = [
  {
    id: 6001, productId: 6, parentId: null, level: 1,
    itemName: 'Wood Pulp (Bleached Kraft)', itemCode: 'RM-WDP-BLK',
    rawMaterialId: 'RM-WDP-BLK', rawMaterialName: 'NBKP wood pulp',
    quantity: 2.2, unitId: 'kg', unitName: 'Kg',
    wastagePercent: 10, costPerUnit: 55, isOptional: false,
    processingNotes: 'ISO brightness ≥ 92%', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 6002, productId: 6, parentId: null, level: 1,
    itemName: 'Calcium Carbonate (Filler)', itemCode: 'RM-CAC-FIL',
    rawMaterialId: 'RM-CAC-FIL', rawMaterialName: 'Ground calcium carbonate',
    quantity: 0.4, unitId: 'kg', unitName: 'Kg',
    wastagePercent: 3, costPerUnit: 12, isOptional: false,
    processingNotes: 'Improves opacity', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 6003, productId: 6, parentId: null, level: 1,
    itemName: 'Sizing Agent (AKD)', itemCode: 'RM-AKD-SIZ',
    rawMaterialId: 'RM-AKD-SIZ', rawMaterialName: 'Alkyl ketene dimer',
    quantity: 0.01, unitId: 'kg', unitName: 'Kg',
    wastagePercent: 2, costPerUnit: 380, isOptional: false,
    processingNotes: 'Water resistance sizing', isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 6004, productId: 6, parentId: null, level: 1,
    itemName: 'Shrink Wrap (Ream wrap)', itemCode: 'PKG-SRW-A4',
    rawMaterialId: 'PKG-SRW-A4', rawMaterialName: 'BOPP shrink wrap',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 5, isOptional: false,
    processingNotes: '500-sheet ream wrap', isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 6005, productId: 6, parentId: null, level: 1,
    itemName: 'Carton (10-ream master)', itemCode: 'PKG-CTN-A4',
    rawMaterialId: 'PKG-CTN-A4', rawMaterialName: '5-ply corrugated carton',
    quantity: 0.1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 120, isOptional: false,
    processingNotes: '1/10th of master carton', isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
];

const USB_CABLE_BOM: BomNode[] = [
  {
    id: 7001, productId: 7, parentId: null, level: 1,
    itemName: 'Type-C Connector (Male, 24-pin)', itemCode: 'RM-CON-TC24',
    rawMaterialId: 'RM-CON-TC24', rawMaterialName: 'USB-C 24-pin connector',
    quantity: 2, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 12, isOptional: false,
    processingNotes: 'Both ends; USB 3.2 Gen 2 rated', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 7002, productId: 7, parentId: null, level: 1,
    itemName: 'Braided Cable Core (1m)', itemCode: 'RM-CAB-COR',
    rawMaterialId: 'RM-CAB-COR', rawMaterialName: 'Oxygen-free copper 28AWG',
    quantity: 1.1, unitId: 'mtr', unitName: 'Meter',
    wastagePercent: 5, costPerUnit: 18, isOptional: false,
    processingNotes: 'OFC 28AWG + 20AWG power', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 7003, productId: 7, parentId: null, level: 1,
    itemName: 'Nylon Braiding Sleeve', itemCode: 'RM-NBR-SLV',
    rawMaterialId: 'RM-NBR-SLV', rawMaterialName: 'Nylon braid sleeve',
    quantity: 1, unitId: 'mtr', unitName: 'Meter',
    wastagePercent: 8, costPerUnit: 10, isOptional: true,
    processingNotes: 'Premium variant; standard uses PVC jacket', isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 7004, productId: 7, parentId: null, level: 1,
    itemName: 'TPE Strain Relief Boot', itemCode: 'RM-TPE-SRB',
    rawMaterialId: 'RM-TPE-SRB', rawMaterialName: 'TPE overmould boot',
    quantity: 2, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 5, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 7005, productId: 7, parentId: null, level: 1,
    itemName: 'Retail Blister Pack', itemCode: 'PKG-BLS-USB',
    rawMaterialId: 'PKG-BLS-USB', rawMaterialName: 'PET clamshell blister',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 6, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
];

const SERVICE_BOM: BomNode[] = [
  {
    id: 8001, productId: 8, parentId: null, level: 1,
    itemName: 'Skilled Technician (Labour)', itemCode: 'SRV-LAB-SKL',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 2, unitId: 'hr', unitName: 'Hour',
    wastagePercent: 0, costPerUnit: 200, isOptional: false,
    processingNotes: 'Level-2 certified technician', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 8002, productId: 8, parentId: null, level: 1,
    itemName: 'Consumables Kit (Cable ties, tape, screws)', itemCode: 'SRV-CSK-001',
    rawMaterialId: 'SRV-CSK-001', rawMaterialName: 'Installation consumables',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 50, isOptional: false,
    processingNotes: 'Used per job', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
];

const JEANS_BOM: BomNode[] = [
  {
    id: 9001, productId: 9, parentId: null, level: 1,
    itemName: 'Denim Fabric (12.5 oz)', itemCode: 'RM-FAB-DEN',
    rawMaterialId: 'RM-FAB-DEN', rawMaterialName: 'Raw black denim 12.5oz',
    quantity: 1.6, unitId: 'mtr', unitName: 'Meter',
    wastagePercent: 12, costPerUnit: 210, isOptional: false,
    processingNotes: '98% cotton, 2% elastane', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 9002, productId: 9, parentId: null, level: 1,
    itemName: 'Sewing Thread (Black + Grey)', itemCode: 'RM-THD-BLK',
    rawMaterialId: 'RM-THD-BLK', rawMaterialName: 'Polyester thread 80/2',
    quantity: 80, unitId: 'mtr', unitName: 'Meter',
    wastagePercent: 10, costPerUnit: 0.4, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 9003, productId: 9, parentId: null, level: 1,
    itemName: 'Waistband + Interfacing', itemCode: 'CMP-WSB-001',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 5, costPerUnit: 35, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 9004, productId: 9, parentId: 9003, level: 2,
    itemName: 'Woven Waistband Tape (1.5")', itemCode: 'RM-WSB-TAP',
    rawMaterialId: 'RM-WSB-TAP', rawMaterialName: 'Woven elastane tape',
    quantity: 0.4, unitId: 'mtr', unitName: 'Meter',
    wastagePercent: 3, costPerUnit: 40, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 9005, productId: 9, parentId: 9003, level: 2,
    itemName: 'Fusible Interfacing', itemCode: 'RM-INT-FUS',
    rawMaterialId: 'RM-INT-FUS', rawMaterialName: 'Non-woven fusible',
    quantity: 0.15, unitId: 'mtr', unitName: 'Meter',
    wastagePercent: 5, costPerUnit: 30, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 9006, productId: 9, parentId: null, level: 1,
    itemName: 'YKK Zip (15cm)', itemCode: 'RM-ZIP-YKK',
    rawMaterialId: 'RM-ZIP-YKK', rawMaterialName: 'YKK metal zip 15cm',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 22, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 9007, productId: 9, parentId: null, level: 1,
    itemName: 'Rivets + Metal Buttons (Set)', itemCode: 'RM-RVT-SET',
    rawMaterialId: 'RM-RVT-SET', rawMaterialName: 'Copper rivets + shank button',
    quantity: 1, unitId: 'set', unitName: 'Set',
    wastagePercent: 2, costPerUnit: 18, isOptional: false,
    processingNotes: '5 rivets + 1 shank button', isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
  {
    id: 9008, productId: 9, parentId: null, level: 1,
    itemName: 'Hang Tag + Barcode Sticker', itemCode: 'PKG-HNG-001',
    rawMaterialId: 'PKG-HNG-001', rawMaterialName: 'Brand hang tag + string',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 5, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 6,
  },
];

const SCREWDRIVER_BOM: BomNode[] = [
  {
    id: 10001, productId: 10, parentId: null, level: 1,
    itemName: 'Flathead Screwdriver 6" (SL6)', itemCode: 'CMP-SDF-006',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 2, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 22, isOptional: false,
    processingNotes: 'Tip hardened to HRC 58', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 10002, productId: 10, parentId: 10001, level: 2,
    itemName: 'CrV Steel Rod (Ø6mm × 200mm)', itemCode: 'RM-CRV-ROD',
    rawMaterialId: 'RM-CRV-ROD', rawMaterialName: 'Chrome vanadium rod',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 5, costPerUnit: 14, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 10003, productId: 10, parentId: 10001, level: 2,
    itemName: 'PP + TPR Bi-material Handle', itemCode: 'RM-HND-BIM',
    rawMaterialId: 'RM-HND-BIM', rawMaterialName: 'PP + TPR handle',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 8, isOptional: false,
    processingNotes: 'Injection moulded; 2-shot', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 10004, productId: 10, parentId: null, level: 1,
    itemName: 'Phillips Screwdriver PH2 6"', itemCode: 'CMP-SDP-PH2',
    rawMaterialId: 'RM-CRV-ROD', rawMaterialName: 'Chrome vanadium rod',
    quantity: 2, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 22, isOptional: false,
    processingNotes: 'PH1 + PH2 heads', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 10005, productId: 10, parentId: null, level: 1,
    itemName: 'Torx T10 + T20 Screwdrivers', itemCode: 'CMP-SDT-TX',
    rawMaterialId: 'RM-CRV-ROD', rawMaterialName: 'Chrome vanadium rod',
    quantity: 2, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 28, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 10006, productId: 10, parentId: null, level: 1,
    itemName: 'Blow-moulded Case + Clip', itemCode: 'PKG-BLW-SDR',
    rawMaterialId: 'PKG-BLW-SDR', rawMaterialName: 'PP blow-moulded case',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 35, isOptional: false,
    processingNotes: '6-slot clip tray', isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
];

const GREENTEA_BOM: BomNode[] = [
  {
    id: 11001, productId: 11, parentId: null, level: 1,
    itemName: 'Green Tea Leaf (Darjeeling, 2nd flush)', itemCode: 'RM-TEA-GRN',
    rawMaterialId: 'RM-TEA-GRN', rawMaterialName: 'Darjeeling green tea',
    quantity: 0.055, unitId: 'kg', unitName: 'Kg',
    wastagePercent: 5, costPerUnit: 1400, isOptional: false,
    processingNotes: '2.2g per bag × 25 bags + 5% waste', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 11002, productId: 11, parentId: null, level: 1,
    itemName: 'Non-woven Tea Bag (Pyramid)', itemCode: 'PKG-TBG-PYR',
    rawMaterialId: 'PKG-TBG-PYR', rawMaterialName: 'Nylon mesh pyramid bag',
    quantity: 25, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 0.6, isOptional: false,
    processingNotes: 'Heat-sealable; food grade', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 11003, productId: 11, parentId: null, level: 1,
    itemName: 'Inner Foil Pouch (Resealable)', itemCode: 'PKG-FLP-RSL',
    rawMaterialId: 'PKG-FLP-RSL', rawMaterialName: 'Alu-foil zip pouch',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 8, isOptional: false,
    processingNotes: 'Aroma lock; moisture barrier', isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 11004, productId: 11, parentId: null, level: 1,
    itemName: 'Printed Retail Box', itemCode: 'PKG-BOX-GTB',
    rawMaterialId: 'PKG-BOX-GTB', rawMaterialName: 'SBS board 350gsm box',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 9, isOptional: false,
    processingNotes: 'CMYK 4-colour print; tuck top', isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
];

const GELPEN_BOM: BomNode[] = [
  {
    id: 12001, productId: 12, parentId: null, level: 1,
    itemName: 'Gel Ink Cartridge (0.7mm, Blue)', itemCode: 'CMP-GIC-B07',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 2.5, isOptional: false,
    processingNotes: '800m write length; water-based ink', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 12002, productId: 12, parentId: 12001, level: 2,
    itemName: 'Gel Ink (Blue, water-based)', itemCode: 'RM-INK-GBL',
    rawMaterialId: 'RM-INK-GBL', rawMaterialName: 'Water-based gel ink',
    quantity: 0.8, unitId: 'ml', unitName: 'mL',
    wastagePercent: 3, costPerUnit: 1.2, isOptional: false,
    processingNotes: 'ISO 12757-2 compliant', isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 12003, productId: 12, parentId: 12001, level: 2,
    itemName: 'Tungsten Carbide Tip (0.7mm)', itemCode: 'RM-TIP-TC7',
    rawMaterialId: 'RM-TIP-TC7', rawMaterialName: 'WC ball tip',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 0.5, costPerUnit: 0.8, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 12004, productId: 12, parentId: null, level: 1,
    itemName: 'PP Barrel (Clear, 14cm)', itemCode: 'RM-BAR-PP',
    rawMaterialId: 'RM-BAR-PP', rawMaterialName: 'Polypropylene barrel',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 0.9, isOptional: false,
    processingNotes: 'Transparent; ink window visible', isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 12005, productId: 12, parentId: null, level: 1,
    itemName: 'Rubber Grip Ring', itemCode: 'RM-GRP-RNG',
    rawMaterialId: 'RM-GRP-RNG', rawMaterialName: 'TPE rubber grip',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 0.3, isOptional: true,
    processingNotes: 'Comfort grip; standard model omits this', isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 12006, productId: 12, parentId: null, level: 1,
    itemName: 'Clip + Cap (PP, Blue)', itemCode: 'CMP-CAP-BLU',
    rawMaterialId: 'RM-BAR-PP', rawMaterialName: 'Polypropylene',
    quantity: 1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 0.25, isOptional: false,
    processingNotes: '', isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 12007, productId: 12, parentId: null, level: 1,
    itemName: 'Retail Pouch (10-pen sleeve)', itemCode: 'PKG-SLV-10',
    rawMaterialId: 'PKG-SLV-10', rawMaterialName: 'OPP poly sleeve',
    quantity: 0.1, unitId: 'nos', unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 4, isOptional: false,
    processingNotes: '1 pen = 1/10th of sleeve pack', isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
];

export const INITIAL_BOM_NODES: BomNode[] = [
  ...LAPTOP_BOM,       
  ...MOUSE_BOM,    
  ...TSHIRT_BOM,   
  ...HONEY_BOM,   
  ...HAMMER_BOM,    
  ...PAPER_BOM,    
  ...USB_CABLE_BOM,
  ...SERVICE_BOM,  
  ...JEANS_BOM, 
  ...SCREWDRIVER_BOM,  
  ...GREENTEA_BOM, 
  ...GELPEN_BOM, 
];

export const INITIAL_BOM_NEXT_ID =
  Math.max(...INITIAL_BOM_NODES.map(n => n.id)) + 1;

export function getBomByProductId(productId: number): BomNode[] {
  return INITIAL_BOM_NODES.filter(n => n.productId === productId);
}

export function rolledUpBomCost(productId: number): number {
  return getBomByProductId(productId)
    .filter(n => n.costPerUnit !== null)
    .reduce((sum, n) => {
      const base = n.quantity * (n.costPerUnit ?? 0);
      const withWastage = base * (1 + n.wastagePercent / 100);
      return sum + withWastage;
    }, 0);
}