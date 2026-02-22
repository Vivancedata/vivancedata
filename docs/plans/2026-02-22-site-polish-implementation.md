# Site Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all bugs, remove dead ends, and build 5 missing industry pages in parallel waves.

**Architecture:** Wave 1 is three independent bug fixes. Wave 2 builds 5 industry pages each following the exact `financial-services` pattern (page.tsx + client.tsx). Wave 3 audits and deploys.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lucide icons

---

## Wave 1 — Bug Fixes (all independent, can be done in parallel)

---

### Task 1: Fix broken integration logo slugs

**Files:**
- Modify: `src/constants/integrations.ts`

The jsDelivr URL pattern is `https://cdn.jsdelivr.net/npm/simple-icons@13/icons/{slug}.svg`.
Some slugs don't match the actual Simple Icons package names.

**Step 1: Verify which URLs are broken**

Run this in the browser console on `http://localhost:3000` to test each URL:
```js
const slugs = ['amazonaws', 'microsoftazure', 'dynamics365', 'microsoftteams', 'cohere']
const base = 'https://cdn.jsdelivr.net/npm/simple-icons@13/icons'
slugs.forEach(s => fetch(`${base}/${s}.svg`).then(r => console.log(s, r.status)))
```
Any 404s need a slug fix.

**Step 2: Apply known correct slugs**

Open `src/constants/integrations.ts` and update:
- `dynamics365.svg` → `microsoftdynamics365.svg`
- If `cohere.svg` returns 404: remove the `logo` field from the cohere entry (the styled letter fallback "CO" looks intentional)
- If `amazonaws.svg` returns 404: try `amazonwebservices.svg`
- If `microsoftazure.svg` returns 404: try `azure.svg`
- If `microsoftteams.svg` returns 404: try `teams.svg`

**Step 3: Verify in browser**

Navigate to `http://localhost:3000`, scroll to "Seamless Integrations" section.
All 20 cards should show actual SVG logos — no letter fallbacks.

**Step 4: Commit**

```bash
git add src/constants/integrations.ts
git commit -m "fix: correct broken integration logo slugs"
```

---

### Task 2: Remove dead "Read Full Case Study" buttons

**Files:**
- Modify: `src/app/case-studies/page.tsx`

**Step 1: Find and remove the buttons**

Open `src/app/case-studies/page.tsx`. Search for `Read Full Case Study`.
Delete the entire `<Button>` block containing it (including the `<CardFooter>` or wrapper `div` it's in).
There are 3 instances — one per case study card.

**Step 2: Verify**

Run `http://localhost:3000/case-studies` and confirm no dead buttons appear on the page.

**Step 3: Commit**

```bash
git add src/app/case-studies/page.tsx
git commit -m "fix: remove dead Read Full Case Study buttons"
```

---

### Task 3: Remove 404 blog posts from constants

**Files:**
- Modify: `src/constants/blog.ts`

The blog listing links to slugs that have no MDX files, producing 404s:
- `ai-ethics-guide` — no `page.mdx` in `src/app/blog/posts/ai-ethics-guide/`
- `ai-customer-service` — no directory at all

**Step 1: Remove the two entries**

Open `src/constants/blog.ts`. Delete the full objects for:
- `id: "ai-ethics-guide"` (entire object)
- `id: "ai-customer-service"` (entire object)

4 posts remain: `future-of-generative-ai`, `ai-implementation-guide`, `ai-roi-business-case`, `data-preparation-for-ai`.

**Step 2: Verify**

Navigate to `http://localhost:3000/blog`. Confirm only 4 cards appear and clicking each goes to a working post.

**Step 3: Commit**

```bash
git add src/constants/blog.ts
git commit -m "fix: remove blog entries that have no MDX content"
```

---

## Wave 2 — Industry Pages (5 pages, same pattern each)

Each page is two files: `page.tsx` (server component with metadata + data) and `client.tsx` (interactive UI).
Follow the exact `financial-services` pattern. The `/industries` listing page already links to these routes — they just 404 today.

---

### Task 4: Healthcare industry page

**Files:**
- Create: `src/app/industries/healthcare/page.tsx`
- Create: `src/app/industries/healthcare/client.tsx`

**Step 1: Create client.tsx**

Copy `src/app/industries/financial-services/client.tsx` to `src/app/industries/healthcare/client.tsx`.

Rename the exported function and props interface:
- `FinancialServicesClientProps` → `HealthcareClientProps`
- `FinancialServicesClient` → `HealthcareClient`

Update the hero section label from `Financial Services` to `Healthcare`.

Update the inline dashboard illustration (the `aspect-video bg-slate-900` block) to be healthcare-themed:
```tsx
<div className="text-primary/60 text-xs font-mono mb-4">Clinical Workflow Intelligence</div>
<div className="grid grid-cols-2 gap-3 mb-4">
  <div className="bg-white/5 rounded-lg p-3">
    <div className="text-white/40 text-xs mb-1">Chart Review Time</div>
    <div className="text-2xl font-bold text-primary">↓ 40%</div>
    <div className="text-white/30 text-xs">per encounter</div>
  </div>
  <div className="bg-white/5 rounded-lg p-3">
    <div className="text-white/40 text-xs mb-1">Documentation Accuracy</div>
    <div className="text-2xl font-bold text-blue-400">97.3%</div>
    <div className="text-white/30 text-xs">structured capture</div>
  </div>
</div>
<div className="space-y-2">
  {[
    { label: "HIPAA-compliant data processing", color: "bg-primary" },
    { label: "NLP-assisted clinical summarization", color: "bg-blue-400" },
    { label: "Human-in-the-loop review workflows", color: "bg-purple-400" },
  ].map((item) => (
    <div key={item.label} className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
      <span className="text-white/60 text-xs">{item.label}</span>
    </div>
  ))}
</div>
```

Update the intro copy (the two `<p>` paragraphs) to healthcare context:
```
"Healthcare organizations face mounting pressure to improve outcomes, reduce costs, and navigate complex compliance requirements. AI is transforming how clinical teams access information, document care, and make decisions."

"At VivanceData, we design AI workflows that support clinicians — not replace them — with a focus on HIPAA compliance, human oversight, and measurable workflow improvement."
```

Update the CTA button text: `"Discuss Your Healthcare AI Needs"`

Update the bottom CTA section heading: `"Ready to Transform Your Healthcare Workflows?"`

**Step 2: Create page.tsx**

```tsx
import { Metadata } from "next";
import { Brain, FileText, Shield, Users, Activity } from "lucide-react";
import HealthcareClient from "./client";

export const metadata: Metadata = {
  title: "AI Solutions for Healthcare - VivanceData",
  description: "Improve clinical workflows, documentation quality, and patient outcomes with AI-assisted tools designed for healthcare compliance and scale.",
  keywords: ["healthcare AI", "clinical NLP", "HIPAA AI", "medical AI", "clinical documentation", "healthcare workflow automation"],
  openGraph: {
    title: "AI Solutions for Healthcare - VivanceData",
    description: "AI-assisted clinical workflows, documentation support, and decision intelligence for healthcare teams.",
    type: "website",
    url: "https://vivancedata.com/industries/healthcare",
  },
};

export default function HealthcarePage() {
  const solutions = [
    {
      title: "Clinical Documentation Support",
      description: "NLP-assisted summarization and extraction workflows that surface relevant patient context faster while keeping clinicians in control.",
      icon: <FileText className="h-6 w-6 text-primary" />,
      benefits: [
        "Faster retrieval of key chart history",
        "Reduced repetitive note review effort",
        "More consistent structured data capture",
        "Human review always in the loop"
      ]
    },
    {
      title: "Clinical Decision Intelligence",
      description: "Pattern recognition tools that flag relevant alerts and surface evidence-based guidance at the point of care.",
      icon: <Brain className="h-6 w-6 text-primary" />,
      benefits: [
        "Relevant alert surfacing for care teams",
        "Evidence-based guidance integration",
        "Reduced alert fatigue",
        "Audit trail for clinical decisions"
      ]
    },
    {
      title: "HIPAA-Compliant AI Infrastructure",
      description: "AI pipelines designed from the ground up for healthcare compliance — encrypted, audited, and governed.",
      icon: <Shield className="h-6 w-6 text-primary" />,
      benefits: [
        "End-to-end encryption and access controls",
        "Audit logging for all AI interactions",
        "BAA-ready cloud infrastructure",
        "De-identification and privacy tooling"
      ]
    },
    {
      title: "Patient Engagement Automation",
      description: "Intelligent routing and triage workflows for patient communications, reducing manual queue pressure on support staff.",
      icon: <Users className="h-6 w-6 text-primary" />,
      benefits: [
        "Faster first-response on routine requests",
        "Consistent escalation to care teams",
        "Reduced administrative queue pressure",
        "Improved patient satisfaction tracking"
      ]
    },
    {
      title: "Operational Analytics",
      description: "Workflow and capacity analytics that surface bottlenecks and improvement opportunities across clinical and administrative operations.",
      icon: <Activity className="h-6 w-6 text-primary" />,
      benefits: [
        "Real-time throughput visibility",
        "Bottleneck identification across departments",
        "Staffing and capacity optimization signals",
        "Outcome trend monitoring"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "Clinical Notes Summarization Support",
      client: "Illustrative Healthcare Network",
      challenge: "Clinical teams were spending significant time navigating fragmented records and repetitive note review.",
      solution: "Built NLP-assisted summarization and extraction workflows to surface relevant context faster while keeping human review in the loop.",
      results: [
        "Faster retrieval of relevant patient context",
        "Reduced repetitive documentation effort",
        "Higher consistency in structured data capture",
        "Improved clinician workflow satisfaction"
      ]
    },
    {
      title: "Patient Support Routing Automation",
      client: "Illustrative Health System",
      challenge: "Patient support queues were overwhelmed by routine requests, causing long response times and inconsistent handoffs to clinical staff.",
      solution: "Implemented intent classification and automated routing for routine patient requests with clear escalation paths.",
      results: [
        "Faster first-response for common inquiries",
        "More consistent escalation to care teams",
        "Reduced manual queue management effort",
        "Improved support quality visibility"
      ]
    },
    {
      title: "Operational Capacity Analytics",
      client: "Illustrative Regional Hospital",
      challenge: "Leadership lacked visibility into throughput and capacity constraints across departments, making planning reactive rather than proactive.",
      solution: "Deployed workflow analytics dashboards surfacing real-time throughput, wait times, and bottleneck signals across clinical operations.",
      results: [
        "Improved scheduling and capacity utilization",
        "Faster identification of operational bottlenecks",
        "Data-driven staffing adjustments",
        "Reduced reactive decision-making"
      ]
    }
  ];

  const stats = [
    { value: "40%", label: "Reduction in chart review time" },
    { value: "97%", label: "Documentation accuracy rate" },
    { value: "100%", label: "HIPAA-compliant by design" },
    { value: "3×", label: "Faster patient context retrieval" }
  ];

  return <HealthcareClient solutions={solutions} caseStudies={caseStudies} stats={stats} />;
}
```

**Step 3: Verify**

Navigate to `http://localhost:3000/industries/healthcare`. Page should render with hero, solution cards, stats bar, case studies, and CTA.

**Step 4: Commit**

```bash
git add src/app/industries/healthcare/
git commit -m "feat: add healthcare industry page"
```

---

### Task 5: Retail industry page

**Files:**
- Create: `src/app/industries/retail/page.tsx`
- Create: `src/app/industries/retail/client.tsx`

**Step 1: Create client.tsx**

Copy `financial-services/client.tsx` to `retail/client.tsx`.
Rename exports: `RetailClientProps`, `RetailClient`.
Label: `Retail & E-commerce`.

Dashboard illustration:
```tsx
<div className="text-primary/60 text-xs font-mono mb-4">Inventory Intelligence</div>
<div className="grid grid-cols-2 gap-3 mb-4">
  <div className="bg-white/5 rounded-lg p-3">
    <div className="text-white/40 text-xs mb-1">Stockout Risk</div>
    <div className="text-2xl font-bold text-primary">↓ 28%</div>
    <div className="text-white/30 text-xs">pilot categories</div>
  </div>
  <div className="bg-white/5 rounded-lg p-3">
    <div className="text-white/40 text-xs mb-1">Planning Speed</div>
    <div className="text-2xl font-bold text-blue-400">↑ 35%</div>
    <div className="text-white/30 text-xs">replenishment cycles</div>
  </div>
</div>
<div className="space-y-2">
  {[
    { label: "Demand forecasting with seasonality signals", color: "bg-primary" },
    { label: "Inventory risk scoring by category", color: "bg-blue-400" },
    { label: "Promotion and markdown optimization", color: "bg-orange-400" },
  ].map((item) => ( ... ))}
</div>
```

Intro copy: Focus on inventory planning, demand forecasting, and personalized customer experience.
CTA button: `"Discuss Your Retail AI Needs"`

**Step 2: Create page.tsx**

```tsx
import { Metadata } from "next";
import { BarChart3, ShoppingCart, Tag, Users, Truck } from "lucide-react";
import RetailClient from "./client";

export const metadata: Metadata = {
  title: "AI Solutions for Retail & E-commerce - VivanceData",
  description: "Improve inventory planning, demand forecasting, and customer personalization with AI solutions built for retail and commerce teams.",
  keywords: ["retail AI", "e-commerce AI", "demand forecasting", "inventory optimization", "personalization AI", "merchandising AI"],
  openGraph: {
    title: "AI Solutions for Retail & E-commerce - VivanceData",
    description: "AI-powered inventory planning, demand forecasting, and personalized customer experiences for retail teams.",
    type: "website",
    url: "https://vivancedata.com/industries/retail",
  },
};

export default function RetailPage() {
  const solutions = [
    {
      title: "Demand Forecasting",
      description: "Forecasting workflows that combine historical sales, seasonality, promotions, and external signals to improve planning confidence.",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      benefits: [
        "Lower stockout frequency in pilot categories",
        "Reduced excess inventory carrying pressure",
        "Improved replenishment confidence",
        "Clear KPI tracking for ongoing iteration"
      ]
    },
    {
      title: "Inventory Decision Support",
      description: "AI-assisted dashboards that surface inventory risk, replenishment signals, and category-level anomalies for planning teams.",
      icon: <ShoppingCart className="h-6 w-6 text-primary" />,
      benefits: [
        "Unified view of inventory risk by category",
        "Automated replenishment signals",
        "Cross-location visibility and alerts",
        "Planner-friendly explanation of recommendations"
      ]
    },
    {
      title: "Promotion & Pricing Optimization",
      description: "ML-driven promotion and markdown optimization that balances revenue, margin, and inventory clearance goals.",
      icon: <Tag className="h-6 w-6 text-primary" />,
      benefits: [
        "Higher promotion ROI through better targeting",
        "Faster markdown decision cycles",
        "Margin-aware pricing recommendations",
        "A/B testing framework for price experiments"
      ]
    },
    {
      title: "Customer Personalization",
      description: "Recommendation and segmentation models that personalize the shopping experience at scale across channels.",
      icon: <Users className="h-6 w-6 text-primary" />,
      benefits: [
        "Higher conversion from personalized recommendations",
        "Improved repeat purchase rates",
        "Cross-channel consistency",
        "Real-time behavioral signal integration"
      ]
    },
    {
      title: "Supply Chain Visibility",
      description: "AI-powered supply chain analytics that improve lead time accuracy and vendor performance tracking.",
      icon: <Truck className="h-6 w-6 text-primary" />,
      benefits: [
        "Better lead time prediction and buffer planning",
        "Vendor performance scorecards",
        "Early warning on supply disruptions",
        "Integrated view across suppliers and DCs"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "Inventory Planning Optimization",
      client: "Illustrative Retail Operator",
      challenge: "Teams were balancing frequent stockouts with excess inventory and lacked confidence in planning decisions across locations.",
      solution: "Implemented demand forecasting workflows that combine historical transactions, seasonality, and external signals to improve planning accuracy.",
      results: [
        "Lower stockout frequency in pilot categories",
        "Reduced excess inventory carrying pressure",
        "Improved replenishment confidence for planners",
        "Clear KPI tracking for ongoing iteration"
      ]
    },
    {
      title: "Promotion Performance Analytics",
      client: "Illustrative Multi-Channel Retailer",
      challenge: "Promotion decisions were driven by intuition and lagging reports, making it difficult to optimize spend or learn quickly across campaigns.",
      solution: "Built a promotion analytics dashboard with near-real-time performance tracking and cross-campaign attribution modeling.",
      results: [
        "Faster campaign performance feedback loops",
        "Improved targeting for future promotions",
        "Reduced waste on underperforming segments",
        "Better budget allocation across channels"
      ]
    },
    {
      title: "Customer Segment Intelligence",
      client: "Illustrative E-commerce Platform",
      challenge: "Marketing and merchandising teams lacked a shared view of customer segments, leading to disconnected personalization efforts.",
      solution: "Developed a unified customer data layer with behavioral segmentation and next-best-action recommendations.",
      results: [
        "Higher conversion on personalized recommendations",
        "Improved repeat purchase rates",
        "Shared segment definitions across teams",
        "Faster experiment-to-insight cycles"
      ]
    }
  ];

  const stats = [
    { value: "28%", label: "Average reduction in stockout risk" },
    { value: "35%", label: "Improvement in planning speed" },
    { value: "2×", label: "Faster promotion feedback loops" },
    { value: "15%", label: "Lift in personalized recommendation conversion" }
  ];

  return <RetailClient solutions={solutions} caseStudies={caseStudies} stats={stats} />;
}
```

**Step 3: Verify**

Navigate to `http://localhost:3000/industries/retail`. Full page renders.

**Step 4: Commit**

```bash
git add src/app/industries/retail/
git commit -m "feat: add retail industry page"
```

---

### Task 6: Manufacturing industry page

**Files:**
- Create: `src/app/industries/manufacturing/page.tsx`
- Create: `src/app/industries/manufacturing/client.tsx`

**Step 1: Create client.tsx**

Copy `financial-services/client.tsx`. Rename: `ManufacturingClientProps`, `ManufacturingClient`.
Label: `Manufacturing`.

Dashboard illustration:
```tsx
<div className="text-primary/60 text-xs font-mono mb-4">Predictive Maintenance Monitor</div>
<div className="grid grid-cols-2 gap-3 mb-4">
  <div className="bg-white/5 rounded-lg p-3">
    <div className="text-white/40 text-xs mb-1">Unplanned Downtime</div>
    <div className="text-2xl font-bold text-primary">↓ 32%</div>
    <div className="text-white/30 text-xs">vs. prior year</div>
  </div>
  <div className="bg-white/5 rounded-lg p-3">
    <div className="text-white/40 text-xs mb-1">OEE Score</div>
    <div className="text-2xl font-bold text-blue-400">↑ 18%</div>
    <div className="text-white/30 text-xs">pilot lines</div>
  </div>
</div>
<div className="space-y-2">
  {[
    { label: "Sensor anomaly detection in real-time", color: "bg-primary" },
    { label: "Maintenance schedule optimization", color: "bg-blue-400" },
    { label: "Quality defect prediction pipeline", color: "bg-yellow-400" },
  ].map( ... )}
</div>
```

CTA button: `"Discuss Your Manufacturing AI Needs"`

**Step 2: Create page.tsx**

```tsx
import { Metadata } from "next";
import { Activity, Settings, Shield, BarChart3, Wrench } from "lucide-react";
import ManufacturingClient from "./client";

export const metadata: Metadata = {
  title: "AI Solutions for Manufacturing - VivanceData",
  description: "Reduce unplanned downtime, improve quality control, and optimize production with AI solutions built for manufacturing operations.",
  keywords: ["manufacturing AI", "predictive maintenance", "quality control AI", "OEE optimization", "industrial AI", "IIoT analytics"],
  openGraph: {
    title: "AI Solutions for Manufacturing - VivanceData",
    description: "AI-powered predictive maintenance, quality inspection, and production optimization for manufacturing teams.",
    type: "website",
    url: "https://vivancedata.com/industries/manufacturing",
  },
};

export default function ManufacturingPage() {
  const solutions = [
    {
      title: "Predictive Maintenance",
      description: "Sensor-driven anomaly detection that identifies equipment failure patterns before they cause unplanned downtime.",
      icon: <Wrench className="h-6 w-6 text-primary" />,
      benefits: [
        "Earlier failure detection from sensor signals",
        "Optimized maintenance scheduling",
        "Reduced unplanned downtime",
        "Improved asset lifecycle planning"
      ]
    },
    {
      title: "Quality Defect Detection",
      description: "Computer vision and statistical process control models that flag quality issues at the line level before they propagate.",
      icon: <Shield className="h-6 w-6 text-primary" />,
      benefits: [
        "Faster detection of out-of-spec production",
        "Reduced rework and scrap rates",
        "Root cause traceability",
        "Integration with existing QC workflows"
      ]
    },
    {
      title: "OEE & Production Analytics",
      description: "Real-time dashboards and ML models that identify throughput bottlenecks and optimize overall equipment effectiveness.",
      icon: <Activity className="h-6 w-6 text-primary" />,
      benefits: [
        "Real-time OEE visibility by line and shift",
        "Bottleneck identification and simulation",
        "Shift-level performance benchmarking",
        "Improvement opportunity prioritization"
      ]
    },
    {
      title: "Supply Chain & Inventory Optimization",
      description: "Demand-driven inventory models that reduce raw material carrying costs while maintaining production readiness.",
      icon: <Settings className="h-6 w-6 text-primary" />,
      benefits: [
        "Better raw material buffer optimization",
        "Reduced carrying costs",
        "Improved supplier lead time accuracy",
        "Disruption early warning signals"
      ]
    },
    {
      title: "Production Planning Intelligence",
      description: "AI-assisted scheduling and capacity planning that accounts for demand variability, machine constraints, and workforce availability.",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      benefits: [
        "More accurate capacity utilization forecasts",
        "Faster response to demand changes",
        "Reduced scheduling conflicts",
        "Improved on-time delivery performance"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "Predictive Maintenance Deployment",
      client: "Illustrative Industrial Manufacturer",
      challenge: "Maintenance teams were reactive, responding to failures rather than preventing them, causing costly production interruptions.",
      solution: "Deployed sensor telemetry ingestion and anomaly scoring models to flag equipment degradation before failure thresholds were reached.",
      results: [
        "Significant reduction in unplanned downtime events",
        "Earlier maintenance interventions on priority assets",
        "Improved maintenance team scheduling efficiency",
        "Better cost predictability for maintenance budgets"
      ]
    },
    {
      title: "Quality Defect Reduction Program",
      client: "Illustrative Precision Manufacturer",
      challenge: "Quality defects were being caught late in the production process, increasing rework costs and customer return rates.",
      solution: "Implemented in-line defect detection models using process sensor data and statistical control charts.",
      results: [
        "Earlier defect detection in the production cycle",
        "Reduced rework and scrap volumes",
        "Faster root cause identification",
        "Improved first-pass yield rates"
      ]
    },
    {
      title: "OEE Analytics Dashboard",
      client: "Illustrative Assembly Operations",
      challenge: "Plant leadership lacked real-time visibility into line performance and could only analyze production gaps after the fact.",
      solution: "Built real-time OEE dashboards with shift-level benchmarking and automated bottleneck alerting.",
      results: [
        "Improved real-time production visibility",
        "Faster identification of throughput constraints",
        "Data-driven shift-level performance conversations",
        "Prioritized improvement investments by line"
      ]
    }
  ];

  const stats = [
    { value: "32%", label: "Reduction in unplanned downtime" },
    { value: "18%", label: "OEE improvement on pilot lines" },
    { value: "25%", label: "Decrease in quality defect rate" },
    { value: "40%", label: "Faster root cause identification" }
  ];

  return <ManufacturingClient solutions={solutions} caseStudies={caseStudies} stats={stats} />;
}
```

**Step 3: Verify** → `http://localhost:3000/industries/manufacturing`

**Step 4: Commit**
```bash
git add src/app/industries/manufacturing/
git commit -m "feat: add manufacturing industry page"
```

---

### Task 7: Energy & Utilities industry page

**Files:**
- Create: `src/app/industries/energy/page.tsx`
- Create: `src/app/industries/energy/client.tsx`

**Step 1: Create client.tsx**

Copy `financial-services/client.tsx`. Rename: `EnergyClientProps`, `EnergyClient`.
Label: `Energy & Utilities`.

Dashboard illustration:
```tsx
<div className="text-primary/60 text-xs font-mono mb-4">Grid & Asset Intelligence</div>
<div className="grid grid-cols-2 gap-3 mb-4">
  <div className="bg-white/5 rounded-lg p-3">
    <div className="text-white/40 text-xs mb-1">Grid Anomalies Detected</div>
    <div className="text-2xl font-bold text-primary">↑ 3×</div>
    <div className="text-white/30 text-xs">vs. rule-based system</div>
  </div>
  <div className="bg-white/5 rounded-lg p-3">
    <div className="text-white/40 text-xs mb-1">Maintenance Cost</div>
    <div className="text-2xl font-bold text-blue-400">↓ 22%</div>
    <div className="text-white/30 text-xs">pilot asset class</div>
  </div>
</div>
<div className="space-y-2">
  {[
    { label: "Real-time grid anomaly detection", color: "bg-primary" },
    { label: "Renewable generation forecasting", color: "bg-yellow-400" },
    { label: "Asset health scoring and alerting", color: "bg-blue-400" },
  ].map( ... )}
</div>
```

CTA button: `"Discuss Your Energy AI Needs"`

**Step 2: Create page.tsx**

```tsx
import { Metadata } from "next";
import { Zap, BarChart3, Settings, Shield, Activity } from "lucide-react";
import EnergyClient from "./client";

export const metadata: Metadata = {
  title: "AI Solutions for Energy & Utilities - VivanceData",
  description: "Optimize grid management, predict asset failures, and improve demand forecasting with AI solutions for energy and utility operations.",
  keywords: ["energy AI", "utilities AI", "grid management AI", "predictive maintenance energy", "demand forecasting energy", "renewable energy AI"],
  openGraph: {
    title: "AI Solutions for Energy & Utilities - VivanceData",
    description: "AI-powered grid intelligence, asset health monitoring, and demand forecasting for energy and utility teams.",
    type: "website",
    url: "https://vivancedata.com/industries/energy",
  },
};

export default function EnergyPage() {
  const solutions = [
    {
      title: "Grid Anomaly Detection",
      description: "Real-time ML models that identify grid anomalies, equipment stress patterns, and reliability risks before they escalate.",
      icon: <Zap className="h-6 w-6 text-primary" />,
      benefits: [
        "Earlier detection of grid instability signals",
        "Automated alerting for at-risk assets",
        "Reduced response time to grid events",
        "Improved outage prevention rates"
      ]
    },
    {
      title: "Demand Forecasting",
      description: "AI-driven load forecasting that accounts for weather, behavioral patterns, and renewable generation variability.",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      benefits: [
        "Higher accuracy short and medium-term load forecasts",
        "Better grid balancing and dispatch decisions",
        "Reduced balancing costs",
        "Integration with renewable generation profiles"
      ]
    },
    {
      title: "Asset Health Monitoring",
      description: "Predictive models that score asset health across transmission, distribution, and generation assets to prioritize maintenance.",
      icon: <Settings className="h-6 w-6 text-primary" />,
      benefits: [
        "Risk-based maintenance prioritization",
        "Reduced emergency repair incidents",
        "Extended asset lifecycle planning",
        "Capital expenditure optimization signals"
      ]
    },
    {
      title: "Renewable Integration Analytics",
      description: "Forecasting and optimization tools that improve the integration of intermittent renewable sources into grid operations.",
      icon: <Activity className="h-6 w-6 text-primary" />,
      benefits: [
        "Better renewable generation forecasting accuracy",
        "Improved battery storage dispatch optimization",
        "Reduced curtailment rates",
        "Grid stability improvement with high renewable penetration"
      ]
    },
    {
      title: "Regulatory & Compliance Reporting",
      description: "Automated data collection, validation, and reporting pipelines that reduce the burden of regulatory compliance reporting.",
      icon: <Shield className="h-6 w-6 text-primary" />,
      benefits: [
        "Automated data collection from operational systems",
        "Faster regulatory report generation",
        "Reduced manual error in compliance submissions",
        "Audit trail for all reported metrics"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "Grid Anomaly Detection Deployment",
      client: "Illustrative Regional Utility",
      challenge: "The operations team relied on threshold-based alerts that generated excessive false positives and missed early warning patterns.",
      solution: "Deployed ML anomaly detection models trained on historical grid telemetry to score and rank grid events by severity and confidence.",
      results: [
        "Significant reduction in false positive alerts",
        "Earlier detection of emerging grid anomalies",
        "Improved operator response prioritization",
        "Reduced unplanned outage frequency"
      ]
    },
    {
      title: "Predictive Asset Maintenance Program",
      client: "Illustrative Transmission Operator",
      challenge: "Maintenance schedules were calendar-based, leading to either premature interventions or missed failures on aging assets.",
      solution: "Built asset health scoring models integrating sensor data, inspection history, and environmental factors to drive risk-based maintenance.",
      results: [
        "Better prioritization of high-risk assets",
        "Reduced emergency repair incidents",
        "Improved maintenance resource allocation",
        "More predictable capital expenditure planning"
      ]
    },
    {
      title: "Renewable Load Forecasting",
      client: "Illustrative Grid Operator",
      challenge: "Increased renewable penetration was making demand balancing more volatile and difficult to plan around.",
      solution: "Developed integrated load and generation forecasting models combining weather data, behavioral patterns, and real-time grid telemetry.",
      results: [
        "Improved forecast accuracy at key dispatch intervals",
        "Better integration of renewable generation profiles",
        "Reduced balancing costs",
        "More confident grid dispatch decisions"
      ]
    }
  ];

  const stats = [
    { value: "3×", label: "More anomalies detected vs. rule-based" },
    { value: "22%", label: "Reduction in maintenance costs" },
    { value: "40%", label: "Fewer false positive alerts" },
    { value: "15%", label: "Improvement in load forecast accuracy" }
  ];

  return <EnergyClient solutions={solutions} caseStudies={caseStudies} stats={stats} />;
}
```

**Step 3: Verify** → `http://localhost:3000/industries/energy`

**Step 4: Commit**
```bash
git add src/app/industries/energy/
git commit -m "feat: add energy industry page"
```

---

### Task 8: Public Sector industry page

**Files:**
- Create: `src/app/industries/public-sector/page.tsx`
- Create: `src/app/industries/public-sector/client.tsx`

**Step 1: Create client.tsx**

Copy `financial-services/client.tsx`. Rename: `PublicSectorClientProps`, `PublicSectorClient`.
Label: `Public Sector`.

Dashboard illustration:
```tsx
<div className="text-primary/60 text-xs font-mono mb-4">Citizen Services Intelligence</div>
<div className="grid grid-cols-2 gap-3 mb-4">
  <div className="bg-white/5 rounded-lg p-3">
    <div className="text-white/40 text-xs mb-1">Request Routing Accuracy</div>
    <div className="text-2xl font-bold text-primary">94%</div>
    <div className="text-white/30 text-xs">automated triage</div>
  </div>
  <div className="bg-white/5 rounded-lg p-3">
    <div className="text-white/40 text-xs mb-1">Processing Time</div>
    <div className="text-2xl font-bold text-blue-400">↓ 45%</div>
    <div className="text-white/30 text-xs">per service request</div>
  </div>
</div>
<div className="space-y-2">
  {[
    { label: "Transparent, auditable AI decisions", color: "bg-primary" },
    { label: "Citizen request intelligent routing", color: "bg-teal-400" },
    { label: "Policy analysis and summarization", color: "bg-blue-400" },
  ].map( ... )}
</div>
```

CTA button: `"Discuss Your Public Sector AI Needs"`

**Step 2: Create page.tsx**

```tsx
import { Metadata } from "next";
import { Users, FileText, Shield, BarChart3, Search } from "lucide-react";
import PublicSectorClient from "./client";

export const metadata: Metadata = {
  title: "AI Solutions for Public Sector - VivanceData",
  description: "Improve citizen services, policy analysis, and operational efficiency with responsible AI solutions designed for government and public sector accountability requirements.",
  keywords: ["government AI", "public sector AI", "citizen services AI", "policy analysis AI", "responsible government AI", "public safety AI"],
  openGraph: {
    title: "AI Solutions for Public Sector - VivanceData",
    description: "Responsible AI for citizen services, policy analysis, and public sector operational efficiency.",
    type: "website",
    url: "https://vivancedata.com/industries/public-sector",
  },
};

export default function PublicSectorPage() {
  const solutions = [
    {
      title: "Citizen Services Automation",
      description: "Intelligent routing and triage workflows for citizen requests that reduce manual processing burden while maintaining human oversight.",
      icon: <Users className="h-6 w-6 text-primary" />,
      benefits: [
        "Faster first-response on routine service requests",
        "Accurate routing to the right department or agent",
        "Clear escalation paths for complex cases",
        "Improved citizen satisfaction tracking"
      ]
    },
    {
      title: "Policy Analysis & Summarization",
      description: "NLP tools that help policy analysts surface relevant precedents, summarize regulatory documents, and track policy changes at scale.",
      icon: <FileText className="h-6 w-6 text-primary" />,
      benefits: [
        "Faster review of large regulatory document sets",
        "Consistent extraction of key policy provisions",
        "Change tracking across policy revisions",
        "Human review always in the loop"
      ]
    },
    {
      title: "Responsible AI Governance",
      description: "AI deployment frameworks designed for public accountability — transparent, explainable, and auditable by design.",
      icon: <Shield className="h-6 w-6 text-primary" />,
      benefits: [
        "Explainable AI decisions with audit trails",
        "Bias monitoring and mitigation protocols",
        "Stakeholder-ready documentation",
        "Alignment with emerging AI regulation"
      ]
    },
    {
      title: "Operational Analytics & Reporting",
      description: "Data analytics pipelines that improve visibility into service delivery performance, resource allocation, and outcomes.",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      benefits: [
        "Real-time service delivery dashboards",
        "Automated performance reporting",
        "Resource utilization optimization signals",
        "Outcome trend monitoring and attribution"
      ]
    },
    {
      title: "Document & Records Intelligence",
      description: "AI-assisted document processing, classification, and records management that reduces manual administration burden.",
      icon: <Search className="h-6 w-6 text-primary" />,
      benefits: [
        "Automated document classification and routing",
        "Faster records retrieval and search",
        "Reduced manual data entry errors",
        "Improved records compliance and retention"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "Citizen Request Routing Automation",
      client: "Illustrative Municipal Government",
      challenge: "High volumes of citizen requests were creating backlogs due to manual triage and frequent misrouting between departments.",
      solution: "Deployed intent classification models to automatically route requests to the correct department with human escalation for ambiguous cases.",
      results: [
        "Significant reduction in manual triage effort",
        "Higher first-contact routing accuracy",
        "Faster response times for routine requests",
        "Improved citizen satisfaction scores"
      ]
    },
    {
      title: "Policy Document Analysis Support",
      client: "Illustrative Regulatory Agency",
      challenge: "Policy analysts spent excessive time reviewing large document volumes to track regulatory changes and surface relevant precedents.",
      solution: "Built NLP-assisted summarization and cross-reference tools that accelerated policy review workflows while keeping analysts in control.",
      results: [
        "Faster review cycles for regulatory documents",
        "More consistent extraction of key provisions",
        "Reduced analyst time on low-value document review",
        "Better cross-reference tracking across policy versions"
      ]
    },
    {
      title: "Service Delivery Analytics Platform",
      client: "Illustrative Public Agency",
      challenge: "Leadership lacked real-time visibility into service delivery performance, making it difficult to identify bottlenecks or optimize resource allocation.",
      solution: "Deployed operational dashboards with automated KPI tracking, anomaly alerting, and resource utilization analytics.",
      results: [
        "Improved real-time visibility into service performance",
        "Faster identification of delivery bottlenecks",
        "Data-driven resource allocation decisions",
        "Automated reporting reducing manual compilation effort"
      ]
    }
  ];

  const stats = [
    { value: "94%", label: "Automated request routing accuracy" },
    { value: "45%", label: "Reduction in processing time" },
    { value: "100%", label: "Auditable AI decisions" },
    { value: "3×", label: "Faster policy document review" }
  ];

  return <PublicSectorClient solutions={solutions} caseStudies={caseStudies} stats={stats} />;
}
```

**Step 3: Verify** → `http://localhost:3000/industries/public-sector`

**Step 4: Commit**
```bash
git add src/app/industries/public-sector/
git commit -m "feat: add public sector industry page"
```

---

### Task 9: Wire up navigation for new industry pages

**Files:**
- Modify: `src/constants/navigation.ts`

**Step 1: Find the industries dropdown**

Open `src/constants/navigation.ts`. Locate the `Industries` nav item (has `{ name: "Financial Services", ... }` and `{ name: "All Industries", ... }`).

**Step 2: Add the 5 new pages**

Insert before `{ name: "All Industries", ... }`:
```ts
{ name: "Healthcare", href: "/industries/healthcare" },
{ name: "Retail & E-commerce", href: "/industries/retail" },
{ name: "Manufacturing", href: "/industries/manufacturing" },
{ name: "Energy & Utilities", href: "/industries/energy" },
{ name: "Public Sector", href: "/industries/public-sector" },
```

Also add them to the footer `Industries` section (around lines 140–141):
```ts
{ label: "Healthcare", href: "/industries/healthcare" },
{ label: "Retail", href: "/industries/retail" },
{ label: "Manufacturing", href: "/industries/manufacturing" },
{ label: "Energy", href: "/industries/energy" },
{ label: "Public Sector", href: "/industries/public-sector" },
```

**Step 3: Verify**

Check the nav dropdown on the site — all 6 industry links should appear and navigate correctly.

**Step 4: Commit**
```bash
git add src/constants/navigation.ts
git commit -m "feat: add new industry pages to navigation"
```

---

## Wave 3 — Audit & Deploy

---

### Task 10: Lighthouse performance audit

**Step 1: Run Lighthouse**

In Chrome DevTools → Lighthouse tab → run on:
- `http://localhost:3000` (home)
- `http://localhost:3000/blog`

Target scores: Performance ≥ 85, Accessibility ≥ 90.

**Step 2: Fix any red flags**

Common Next.js issues to look for:
- Images without `width`/`height` causing CLS — add `fill` + sized container or explicit dimensions
- Missing `alt` text — add descriptive alt to any `<img>` or `<Image>` without it
- Render-blocking resources — already handled by Next.js App Router

**Step 3: Commit any fixes**
```bash
git add -p
git commit -m "perf: fix Lighthouse issues from audit"
```

---

### Task 11: Deploy to Vercel

**Step 1: Check build passes**
```bash
npm run build
```
Expected: no errors, only warnings.

**Step 2: Deploy**
```bash
vercel --prod
```
Or push to `main` if Vercel auto-deploy is configured.

**Step 3: Smoke test on production URL**

Visit the deployed URL and verify:
- [ ] Home page loads
- [ ] All 6 industry pages load
- [ ] Blog listing shows 4 posts, all link to valid MDX pages
- [ ] `/case-studies` has no dead buttons
- [ ] Integration logos load (most should show SVGs)
- [ ] Contact form renders
