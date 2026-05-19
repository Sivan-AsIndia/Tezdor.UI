import { BomNode } from './product-bom';

// ═══════════════════════════════════════════════════════════════
// Product 1 — Yashika 3+1+1 Sofa Set
// ═══════════════════════════════════════════════════════════════
const YASHIKA_BOM: BomNode[] = [
  // ── L1: 3-Seater Sofa ──
  {
    id: 1001, productId: 1, parentId: null, level: 1,
    itemName: '3-Seater Sofa', itemCode: 'CMP-3S-01',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: null, isOptional: false,
    processingNotes: 'Main 3-seat unit; assembled in carpentry & upholstery',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 1002, productId: 1, parentId: 1001, level: 2,
    itemName: 'Wooden Frame (Sheesham)', itemCode: 'RM-WD-204',
    rawMaterialId: 'RM-WD-001', rawMaterialName: 'Sheesham Wood Plank',
    quantity: 1, unitId: 4, unitName: 'Set',
    wastagePercent: 2, costPerUnit: 3200, isOptional: false,
    processingNotes: 'Cut to 6×2.5 ft; sand grade 220; mortise-tenon joints',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 1003, productId: 1, parentId: 1002, level: 3,
    itemName: 'Plywood Sheet (12mm)', itemCode: 'RM-PW-018',
    rawMaterialId: 'RM-PW-001', rawMaterialName: 'Plywood Sheet 12mm (8×4 ft)',
    quantity: 2, unitId: 6, unitName: 'Sheet',
    wastagePercent: 5, costPerUnit: 1450, isOptional: false,
    processingNotes: 'Base panel + arm panels',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 1004, productId: 1, parentId: 1001, level: 2,
    itemName: 'Foam Cushion (HD-32 density)', itemCode: 'RM-FM-007',
    rawMaterialId: 'RM-FM-001', rawMaterialName: 'PU Foam Block HD-32 (Seat)',
    quantity: 3,  unitId: 1, unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 850, isOptional: false,
    processingNotes: 'Cut to seat profile 22×22×4 in',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 1005, productId: 1, parentId: 1001, level: 2,
    itemName: 'Fabric Cover (Beige Linen)', itemCode: 'RM-FB-112',
    rawMaterialId: 'RM-FB-001', rawMaterialName: 'Linen Fabric (Beige)',
    quantity: 5, unitId: 5, unitName: 'Meter',
    wastagePercent: 7, costPerUnit: 420, isOptional: false,
    processingNotes: 'Pattern-cut; lockstitch seam',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 1006, productId: 1, parentId: 1001, level: 2,
    itemName: 'Serpentine Spring Strip', itemCode: 'RM-SP-101',
    rawMaterialId: 'RM-SP-001', rawMaterialName: 'Serpentine Spring Strip (Zig-Zag)',
    quantity: 3, unitId: 5, unitName: 'Meter',
    wastagePercent: 2, costPerUnit: 95, isOptional: false,
    processingNotes: 'Zig-zag clip on frame',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 1007, productId: 1, parentId: 1001, level: 2,
    itemName: 'Screws M6 × 50mm', itemCode: 'RM-HW-303',
    rawMaterialId: 'RM-HW-001', rawMaterialName: 'M6 × 50mm Wood Screw',
    quantity: 24,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 3.6, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
  // ── L1: 1-Seater Sofa #1 ──
  {
    id: 1008, productId: 1, parentId: null, level: 1,
    itemName: '1-Seater Sofa #1', itemCode: 'CMP-1S-01',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: null, isOptional: false,
    processingNotes: 'Single-seat armchair — same frame style as 3-seater',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 1009, productId: 1, parentId: 1008, level: 2,
    itemName: 'Wooden Frame (Sheesham)', itemCode: 'RM-WD-205',
    rawMaterialId: 'RM-WD-001', rawMaterialName: 'Sheesham Wood Plank',
    quantity: 1, unitId: 4, unitName: 'Set',
    wastagePercent: 2, costPerUnit: 1800, isOptional: false,
    processingNotes: 'Single-seat frame 3×2.5 ft',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 1010, productId: 1, parentId: 1008, level: 2,
    itemName: 'Foam Cushion (HD-32)', itemCode: 'RM-FM-008',
    rawMaterialId: 'RM-FM-001', rawMaterialName: 'PU Foam Block HD-32 (Seat)',
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 850, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 1011, productId: 1, parentId: 1008, level: 2,
    itemName: 'Fabric Cover (Beige Linen)', itemCode: 'RM-FB-113',
    rawMaterialId: 'RM-FB-001', rawMaterialName: 'Linen Fabric (Beige)',
    quantity: 2.5, unitId: 5, unitName: 'Meter',
    wastagePercent: 7, costPerUnit: 420, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  // ── L1: 1-Seater Sofa #2 ──
  {
    id: 1012, productId: 1, parentId: null, level: 1,
    itemName: '1-Seater Sofa #2', itemCode: 'CMP-1S-02',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: null, isOptional: false,
    processingNotes: 'Identical to 1-Seater #1',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 1013, productId: 1, parentId: 1012, level: 2,
    itemName: 'Wooden Frame (Sheesham)', itemCode: 'RM-WD-206',
    rawMaterialId: 'RM-WD-001', rawMaterialName: 'Sheesham Wood Plank',
    quantity: 1, unitId: 4, unitName: 'Set',
    wastagePercent: 2, costPerUnit: 1800, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 1014, productId: 1, parentId: 1012, level: 2,
    itemName: 'Foam Cushion (HD-32)', itemCode: 'RM-FM-009',
    rawMaterialId: 'RM-FM-001', rawMaterialName: 'PU Foam Block HD-32 (Seat)',
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 850, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 1015, productId: 1, parentId: 1012, level: 2,
    itemName: 'Fabric Cover (Beige Linen)', itemCode: 'RM-FB-114',
    rawMaterialId: 'RM-FB-001', rawMaterialName: 'Linen Fabric (Beige)',
    quantity: 2.5, unitId: 5, unitName: 'Meter',
    wastagePercent: 7, costPerUnit: 420, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  // ── L1: Sofa Legs Set ──
  {
    id: 1016, productId: 1, parentId: null, level: 1,
    itemName: 'Wooden Sofa Legs (Set of 20)', itemCode: 'RM-HW-LG4',
    rawMaterialId: 'RM-HW-003', rawMaterialName: 'Sofa Leg (Wooden, 4 in)',
    quantity: 20,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 85, isOptional: false,
    processingNotes: '4 per 1-seater (×2), 4 per 3-seater, 8 spare',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  // ── L1: Packaging ──
  {
    id: 1017, productId: 1, parentId: null, level: 1,
    itemName: 'Packaging (3 cartons)', itemCode: 'PKG-SOF-311',
    rawMaterialId: 'PKG-CB-001', rawMaterialName: 'Corrugated Carton (Sofa)',
    quantity: 3,  unitId: 1, unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 350, isOptional: false,
    processingNotes: 'One carton per piece; corner protectors included',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
];

// ═══════════════════════════════════════════════════════════════
// Product 2 — Royal Single Recliner
// ═══════════════════════════════════════════════════════════════
const RECLINER_BOM: BomNode[] = [
  {
    id: 2001, productId: 2, parentId: null, level: 1,
    itemName: 'Steel Frame Assembly', itemCode: 'CMP-RCL-FRM',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: null, isOptional: false,
    processingNotes: 'Welded mild steel frame with recliner mechanism',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 2002, productId: 2, parentId: 2001, level: 2,
    itemName: 'Recliner Mechanism (Manual)', itemCode: 'RM-MC-101',
    rawMaterialId: 'RM-MC-001', rawMaterialName: 'Recliner Mechanism (Manual)',
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0.5, costPerUnit: 3500, isOptional: false,
    processingNotes: '3-position lock; rated 120 kg',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 2003, productId: 2, parentId: 2001, level: 2,
    itemName: 'Plywood Base Board (18mm)', itemCode: 'RM-PW-019',
    rawMaterialId: 'RM-PW-002', rawMaterialName: 'Plywood Sheet 18mm (8×4 ft)',
    quantity: 1, unitId: 6, unitName: 'Sheet',
    wastagePercent: 4, costPerUnit: 1850, isOptional: false,
    processingNotes: 'Cut to seat + back profiles',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 2004, productId: 2, parentId: null, level: 1,
    itemName: 'Moulded Foam Set', itemCode: 'CMP-RCL-FM',
    rawMaterialId: 'RM-FM-003', rawMaterialName: 'Recliner Moulded Foam',
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 1200, isOptional: false,
    processingNotes: 'Seat + back + armrest foam set',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 2005, productId: 2, parentId: null, level: 1,
    itemName: 'Leatherette Upholstery (Brown)', itemCode: 'RM-FB-LTH',
    rawMaterialId: 'RM-FB-003', rawMaterialName: 'Leatherette (Brown)',
    quantity: 4.5, unitId: 5, unitName: 'Meter',
    wastagePercent: 8, costPerUnit: 380, isOptional: false,
    processingNotes: 'Double-stitch pattern',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 2006, productId: 2, parentId: null, level: 1,
    itemName: 'Chrome Sofa Legs (Set of 4)', itemCode: 'RM-HW-CHR4',
    rawMaterialId: 'RM-HW-004', rawMaterialName: 'Sofa Leg (Chrome, 3 in)',
    quantity: 4,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 120, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 2007, productId: 2, parentId: null, level: 1,
    itemName: 'Packaging', itemCode: 'PKG-RCL-001',
    rawMaterialId: 'PKG-CB-001', rawMaterialName: 'Corrugated Carton (Sofa)',
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 1, costPerUnit: 350, isOptional: false,
    processingNotes: 'With bubble wrap and corner protectors',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
];

// ═══════════════════════════════════════════════════════════════
// Product 3 — Milano L-Shape Sofa
// ═══════════════════════════════════════════════════════════════
const MILANO_BOM: BomNode[] = [
  {
    id: 3001, productId: 3, parentId: null, level: 1,
    itemName: 'Main Section (3-Seater)', itemCode: 'CMP-LS-MAIN',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: null, isOptional: false,
    processingNotes: 'Primary section with Silver Oak frame',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 3002, productId: 3, parentId: 3001, level: 2,
    itemName: 'Silver Oak Frame', itemCode: 'RM-WD-SOK',
    rawMaterialId: 'RM-WD-002', rawMaterialName: 'Silver Oak Wood Plank',
    quantity: 1, unitId: 4, unitName: 'Set',
    wastagePercent: 3, costPerUnit: 2800, isOptional: false,
    processingNotes: 'L-shape main section; dowel joints',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 3003, productId: 3, parentId: 3001, level: 2,
    itemName: 'Pocket Spring Unit', itemCode: 'RM-SP-PKT',
    rawMaterialId: 'RM-SP-002', rawMaterialName: 'Pocket Spring Unit (3-Seater)',
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 2400, isOptional: false,
    processingNotes: 'Individual pocketed coils for premium comfort',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 3004, productId: 3, parentId: 3001, level: 2,
    itemName: 'Velvet Fabric (Royal Blue)', itemCode: 'RM-FB-VEL',
    rawMaterialId: 'RM-FB-002', rawMaterialName: 'Velvet Fabric (Royal Blue)',
    quantity: 6, unitId: 5, unitName: 'Meter',
    wastagePercent: 8, costPerUnit: 550, isOptional: false,
    processingNotes: 'Premium velvet; anti-pill treated',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 3005, productId: 3, parentId: null, level: 1,
    itemName: 'Chaise Section', itemCode: 'CMP-LS-CHS',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: null, isOptional: false,
    processingNotes: 'Chaise / lounger section',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 3006, productId: 3, parentId: 3005, level: 2,
    itemName: 'Silver Oak Frame (Chaise)', itemCode: 'RM-WD-SOK2',
    rawMaterialId: 'RM-WD-002', rawMaterialName: 'Silver Oak Wood Plank',
    quantity: 1, unitId: 4, unitName: 'Set',
    wastagePercent: 3, costPerUnit: 2200, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 3007, productId: 3, parentId: 3005, level: 2,
    itemName: 'HD-32 Foam (Seat)', itemCode: 'RM-FM-LS1',
    rawMaterialId: 'RM-FM-001', rawMaterialName: 'PU Foam Block HD-32 (Seat)',
    quantity: 2,  unitId: 1, unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 850, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 3008, productId: 3, parentId: 3005, level: 2,
    itemName: 'Velvet Fabric (Chaise)', itemCode: 'RM-FB-VEL2',
    rawMaterialId: 'RM-FB-002', rawMaterialName: 'Velvet Fabric (Royal Blue)',
    quantity: 4, unitId: 5, unitName: 'Meter',
    wastagePercent: 8, costPerUnit: 550, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 3009, productId: 3, parentId: null, level: 1,
    itemName: 'Chrome Legs (Set of 10)', itemCode: 'RM-HW-CHR10',
    rawMaterialId: 'RM-HW-004', rawMaterialName: 'Sofa Leg (Chrome, 3 in)',
    quantity: 10,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 120, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 3010, productId: 3, parentId: null, level: 1,
    itemName: 'Scatter Cushions (Set of 4)', itemCode: 'CMP-LS-CSH',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 4,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 450, isOptional: true,
    processingNotes: 'Decorative throw cushions; optional upgrade',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
];

// ═══════════════════════════════════════════════════════════════
// Product 4 — Heritage 6-Seater Dining Set
// ═══════════════════════════════════════════════════════════════
const DINING_BOM: BomNode[] = [
  {
    id: 4001, productId: 4, parentId: null, level: 1,
    itemName: 'Dining Table (Sheesham, 6-seater)', itemCode: 'CMP-DT-6S',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: null, isOptional: false,
    processingNotes: 'Solid sheesham top with trestle base',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 4002, productId: 4, parentId: 4001, level: 2,
    itemName: 'Sheesham Plank Set (Table Top)', itemCode: 'RM-WD-DT1',
    rawMaterialId: 'RM-WD-001', rawMaterialName: 'Sheesham Wood Plank',
    quantity: 2, unitId: 4, unitName: 'Set',
    wastagePercent: 4, costPerUnit: 3200, isOptional: false,
    processingNotes: 'Edge-joined plank; sanded to 320 grit',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 4003, productId: 4, parentId: 4001, level: 2,
    itemName: 'Teak Oil Finish', itemCode: 'RM-PO-TK1',
    rawMaterialId: 'RM-PO-002', rawMaterialName: 'Teak Oil Finish',
    quantity: 1.5, unitId: 3, unitName: 'Litre',
    wastagePercent: 5, costPerUnit: 350, isOptional: false,
    processingNotes: '3 coats; 24h cure between coats',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 4004, productId: 4, parentId: null, level: 1,
    itemName: 'Dining Chair (Cushioned)', itemCode: 'CMP-DC-01',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 6,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: null, isOptional: false,
    processingNotes: 'Sheesham frame with fabric seat pad',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 4005, productId: 4, parentId: 4004, level: 2,
    itemName: 'Chair Frame (Sheesham)', itemCode: 'RM-WD-DC1',
    rawMaterialId: 'RM-WD-001', rawMaterialName: 'Sheesham Wood Plank',
    quantity: 1, unitId: 4, unitName: 'Set',
    wastagePercent: 3, costPerUnit: 1200, isOptional: false,
    processingNotes: 'Ladder-back style',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 4006, productId: 4, parentId: 4004, level: 2,
    itemName: 'Seat Cushion Pad', itemCode: 'RM-FM-DC1',
    rawMaterialId: 'RM-FM-002', rawMaterialName: 'PU Foam Block HD-28 (Back)',
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 650, isOptional: false,
    processingNotes: 'Covered with chenille fabric',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
];

// ═══════════════════════════════════════════════════════════════
// Product 5 — Luxe King Bed with Storage
// ═══════════════════════════════════════════════════════════════
const BED_BOM: BomNode[] = [
  {
    id: 5001, productId: 5, parentId: null, level: 1,
    itemName: 'Bed Frame (Engineered Wood)', itemCode: 'CMP-BED-FRM',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: null, isOptional: false,
    processingNotes: 'King-size 6×6.5 ft with hydraulic storage',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 5002, productId: 5, parentId: 5001, level: 2,
    itemName: 'MDF Board 16mm', itemCode: 'RM-MDF-001',
    rawMaterialId: 'RM-PW-003', rawMaterialName: 'MDF Board 16mm (8×4 ft)',
    quantity: 4, unitId: 6, unitName: 'Sheet',
    wastagePercent: 5, costPerUnit: 1100, isOptional: false,
    processingNotes: 'Side panels, headboard substrate, base',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 5003, productId: 5, parentId: 5001, level: 2,
    itemName: 'Plywood 18mm (Base)', itemCode: 'RM-PW-BED',
    rawMaterialId: 'RM-PW-002', rawMaterialName: 'Plywood Sheet 18mm (8×4 ft)',
    quantity: 2, unitId: 6, unitName: 'Sheet',
    wastagePercent: 3, costPerUnit: 1850, isOptional: false,
    processingNotes: 'Mattress support base',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 5004, productId: 5, parentId: null, level: 1,
    itemName: 'Upholstered Headboard', itemCode: 'CMP-BED-HB',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: null, isOptional: false,
    processingNotes: 'Tufted cushion headboard',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 5005, productId: 5, parentId: 5004, level: 2,
    itemName: 'Foam Block (HD-28)', itemCode: 'RM-FM-HB1',
    rawMaterialId: 'RM-FM-002', rawMaterialName: 'PU Foam Block HD-28 (Back)',
    quantity: 2,  unitId: 1, unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 650, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 5006, productId: 5, parentId: 5004, level: 2,
    itemName: 'Velvet Fabric (Grey)', itemCode: 'RM-FB-HB1',
    rawMaterialId: 'RM-FB-005', rawMaterialName: 'Chenille Fabric (Grey)',
    quantity: 3, unitId: 5, unitName: 'Meter',
    wastagePercent: 6, costPerUnit: 480, isOptional: false,
    processingNotes: 'Diamond tufting pattern',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 5007, productId: 5, parentId: null, level: 1,
    itemName: 'PU Polish (Matte Finish)', itemCode: 'RM-PO-BED',
    rawMaterialId: 'RM-PO-001', rawMaterialName: 'PU Polish (Matte)',
    quantity: 2, unitId: 3, unitName: 'Litre',
    wastagePercent: 5, costPerUnit: 480, isOptional: false,
    processingNotes: '2 coats on all visible wood surfaces',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
];

// ═══════════════════════════════════════════════════════════════
// Product 7 — Comfort 2-Seater Loveseat
// ═══════════════════════════════════════════════════════════════
const LOVESEAT_BOM: BomNode[] = [
  {
    id: 7001, productId: 7, parentId: null, level: 1,
    itemName: 'Wooden Frame (Silver Oak)', itemCode: 'CMP-LS2-FRM',
    rawMaterialId: 'RM-WD-002', rawMaterialName: 'Silver Oak Wood Plank',
    quantity: 1, unitId: 4, unitName: 'Set',
    wastagePercent: 2, costPerUnit: 2200, isOptional: false,
    processingNotes: '2-seat frame; compact design',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 7002, productId: 7, parentId: null, level: 1,
    itemName: 'HD-32 Seat Cushions (×2)', itemCode: 'RM-FM-LS2',
    rawMaterialId: 'RM-FM-001', rawMaterialName: 'PU Foam Block HD-32 (Seat)',
    quantity: 2,  unitId: 1, unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 850, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 7003, productId: 7, parentId: null, level: 1,
    itemName: 'HD-28 Back Cushions (×2)', itemCode: 'RM-FM-LS3',
    rawMaterialId: 'RM-FM-002', rawMaterialName: 'PU Foam Block HD-28 (Back)',
    quantity: 2,  unitId: 1, unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 650, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 7004, productId: 7, parentId: null, level: 1,
    itemName: 'Chenille Fabric (Grey)', itemCode: 'RM-FB-LS2',
    rawMaterialId: 'RM-FB-005', rawMaterialName: 'Chenille Fabric (Grey)',
    quantity: 4, unitId: 5, unitName: 'Meter',
    wastagePercent: 7, costPerUnit: 480, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 7005, productId: 7, parentId: null, level: 1,
    itemName: 'Wooden Legs (Set of 4)', itemCode: 'RM-HW-LGS4',
    rawMaterialId: 'RM-HW-003', rawMaterialName: 'Sofa Leg (Wooden, 4 in)',
    quantity: 4,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 85, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
];

// ═══════════════════════════════════════════════════════════════
// Product 8 — Sofa Assembly & Delivery (Service — Labour BOM)
// ═══════════════════════════════════════════════════════════════
const SERVICE_BOM: BomNode[] = [
  {
    id: 8001, productId: 8, parentId: null, level: 1,
    itemName: 'Skilled Assembler (Labour)', itemCode: 'SRV-LAB-ASM',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 2,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 500, isOptional: false,
    processingNotes: 'Per-job labour cost; 2 personnel',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 8002, productId: 8, parentId: null, level: 1,
    itemName: 'Transport & Handling', itemCode: 'SRV-TRN-001',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 800, isOptional: false,
    processingNotes: 'Includes vehicle, fuel, toll',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
];

// ═══════════════════════════════════════════════════════════════
// Product 9 — Throne Motorised Recliner
// ═══════════════════════════════════════════════════════════════
const MOTORISED_RECLINER_BOM: BomNode[] = [
  {
    id: 9001, productId: 9, parentId: null, level: 1,
    itemName: 'Steel Frame with Motorised Mechanism', itemCode: 'CMP-MRC-FRM',
    rawMaterialId: null, rawMaterialName: null,
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: null, isOptional: false,
    processingNotes: 'Heavy-duty welded frame; rated 150 kg',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 9002, productId: 9, parentId: 9001, level: 2,
    itemName: 'Motorised Recliner Mechanism', itemCode: 'RM-MC-201',
    rawMaterialId: 'RM-MC-002', rawMaterialName: 'Recliner Mechanism (Motorised)',
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 8500, isOptional: false,
    processingNotes: '24V DC motor; with USB port; remote control',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 9003, productId: 9, parentId: 9001, level: 2,
    itemName: 'Plywood Seat Board (18mm)', itemCode: 'RM-PW-MR1',
    rawMaterialId: 'RM-PW-002', rawMaterialName: 'Plywood Sheet 18mm (8×4 ft)',
    quantity: 1, unitId: 6, unitName: 'Sheet',
    wastagePercent: 4, costPerUnit: 1850, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 9004, productId: 9, parentId: null, level: 1,
    itemName: 'Memory Foam Headrest', itemCode: 'RM-FM-MFH',
    rawMaterialId: 'RM-FM-003', rawMaterialName: 'Recliner Moulded Foam',
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 2, costPerUnit: 1200, isOptional: false,
    processingNotes: 'Contoured headrest with neck support',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 9005, productId: 9, parentId: null, level: 1,
    itemName: 'Genuine Leather (Tan)', itemCode: 'RM-FB-GTL',
    rawMaterialId: 'RM-FB-004', rawMaterialName: 'Genuine Leather (Tan)',
    quantity: 5, unitId: 5, unitName: 'Meter',
    wastagePercent: 10, costPerUnit: 1800, isOptional: false,
    processingNotes: 'Full-grain aniline leather',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 9006, productId: 9, parentId: null, level: 1,
    itemName: 'Seat Foam (HD-32)', itemCode: 'RM-FM-MR2',
    rawMaterialId: 'RM-FM-001', rawMaterialName: 'PU Foam Block HD-32 (Seat)',
    quantity: 1,  unitId: 1, unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 850, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
];

// ═══════════════════════════════════════════════════════════════
// Product 10 — Classic 3-Seater Chesterfield
// ═══════════════════════════════════════════════════════════════
const CHESTERFIELD_BOM: BomNode[] = [
  {
    id: 10001, productId: 10, parentId: null, level: 1,
    itemName: 'Sheesham Hardwood Frame', itemCode: 'CMP-CHF-FRM',
    rawMaterialId: 'RM-WD-001', rawMaterialName: 'Sheesham Wood Plank',
    quantity: 2, unitId: 4, unitName: 'Set',
    wastagePercent: 3, costPerUnit: 3200, isOptional: false,
    processingNotes: 'Kiln-dried; scroll-arm profile',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 1,
  },
  {
    id: 10002, productId: 10, parentId: null, level: 1,
    itemName: 'Genuine Leather (Tan)', itemCode: 'RM-FB-CHF',
    rawMaterialId: 'RM-FB-004', rawMaterialName: 'Genuine Leather (Tan)',
    quantity: 8, unitId: 5, unitName: 'Meter',
    wastagePercent: 12, costPerUnit: 1800, isOptional: false,
    processingNotes: 'Hand-tufted diamond pattern; brass studs',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 2,
  },
  {
    id: 10003, productId: 10, parentId: null, level: 1,
    itemName: 'HD-32 Foam (Seat + Arms)', itemCode: 'RM-FM-CHF',
    rawMaterialId: 'RM-FM-001', rawMaterialName: 'PU Foam Block HD-32 (Seat)',
    quantity: 4,  unitId: 1, unitName: 'Nos',
    wastagePercent: 3, costPerUnit: 850, isOptional: false,
    processingNotes: '',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 3,
  },
  {
    id: 10004, productId: 10, parentId: null, level: 1,
    itemName: 'Jute Webbing', itemCode: 'RM-WB-CHF',
    rawMaterialId: 'RM-WB-001', rawMaterialName: 'Jute Webbing (3 in)',
    quantity: 8, unitId: 5, unitName: 'Meter',
    wastagePercent: 5, costPerUnit: 22, isOptional: false,
    processingNotes: 'Traditional hand-tied springs on jute web',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 4,
  },
  {
    id: 10005, productId: 10, parentId: null, level: 1,
    itemName: 'Turned Wooden Legs (Set of 4)', itemCode: 'RM-HW-TRN',
    rawMaterialId: 'RM-HW-003', rawMaterialName: 'Sofa Leg (Wooden, 4 in)',
    quantity: 4, unitId: 1, unitName: 'Nos',
    wastagePercent: 0, costPerUnit: 85, isOptional: false,
    processingNotes: 'Turned on lathe; polished walnut stain',
    isExpanded: true, isEditing: false, hasError: false, sortOrder: 5,
  },
];

export const INITIAL_BOM_NODES: BomNode[] = [
  ...YASHIKA_BOM,
  ...RECLINER_BOM,
  ...MILANO_BOM,
  ...DINING_BOM,
  ...BED_BOM,
  ...LOVESEAT_BOM,
  ...SERVICE_BOM,
  ...MOTORISED_RECLINER_BOM,
  ...CHESTERFIELD_BOM,
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
