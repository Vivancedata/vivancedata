export interface Partner {
  name: string;
  industry: string;
}

// The sectors we work in. Not named companies — see clients.ts for the same
// rule: nothing here implies an engagement that did not happen.
export const partners: Partner[] = [
  { name: "Construction", industry: "General & Trade Contractors" },
  { name: "HVAC & Trades", industry: "Field Service" },
  { name: "Logistics & Fleet", industry: "Carriers & Dispatch" },
  { name: "Manufacturing", industry: "Production & Maintenance" },
];
