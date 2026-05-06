import { PettyCashLine } from "./petty-cash-line";

export const PETTY_CASH_LINE_SEED: PettyCashLine[] = [

    // ===== PC1 (Fund Opening) =====
    {
        pettyCashLineId: 'PCL1',
        pettyCashId: 'PC1',

        requestedAmount: 50000,
        approvedAmount: 50000,
        disbursedAmount: 50000,

        expenseAmount: 0,
        taxAmount: 0,

        returnedAmount: 0,
        replenishmentAmount: 0,

        createdAt: '2026-04-01',
        createdByUserId: 'ADMIN',

        updatedAt: '2026-04-01',
        updatedByUserId: 'ADMIN',

        isDeleted: false
    },

    // ===== PC2 (Expense - Stationery) =====
    {
        pettyCashLineId: 'PCL2',
        pettyCashId: 'PC2',

        expenseAmount: 1200,
        taxAmount: 0,

        requestedAmount: 1200,
        approvedAmount: 1200,
        disbursedAmount: 1200,

        returnedAmount: 0,
        replenishmentAmount: 0,

        createdAt: '2026-04-02',
        createdByUserId: 'EMP1',

        isDeleted: false
    },

    // ===== PC3 (Duplicate Receipt) =====
    {
        pettyCashLineId: 'PCL3',
        pettyCashId: 'PC3',

        expenseAmount: 500,
        taxAmount: 0,

        requestedAmount: 500,
        approvedAmount: 0, // rejected

        disbursedAmount: 0,

        returnedAmount: 0,
        replenishmentAmount: 0,

        createdAt: '2026-04-03',
        createdByUserId: 'EMP3',

        isDeleted: false
    },

    // ===== PC4 (Missing Receipt) =====
    {
        pettyCashLineId: 'PCL4',
        pettyCashId: 'PC4',

        expenseAmount: 300,
        taxAmount: 0,

        requestedAmount: 300,
        approvedAmount: 300,
        disbursedAmount: 300,

        returnedAmount: 0,
        replenishmentAmount: 0,

        createdAt: '2026-04-04',
        createdByUserId: 'EMP4',

        isDeleted: false
    },

    // ===== EXTRA: REPLENISHMENT EXAMPLE =====
    {
        pettyCashLineId: 'PCL5',
        pettyCashId: 'PC2',

        replenishmentAmount: 5000,

        requestedAmount: 5000,
        approvedAmount: 5000,
        disbursedAmount: 5000,

        createdAt: '2026-04-05',
        createdByUserId: 'FIN1',

        isDeleted: false
    },

    // ===== EXTRA: RETURN CASH =====
    {
        pettyCashLineId: 'PCL6',
        pettyCashId: 'PC2',

        returnedAmount: 500,

        createdAt: '2026-04-06',
        createdByUserId: 'EMP1',

        isDeleted: false
    }

];