# AI agency competitive research notes

## Sources reviewed
- Accenture Data & AI services: https://www.accenture.com/us-en/services/artificial-intelligence
- IBM Consulting AI: https://www.ibm.com/consulting/artificial-intelligence
- Cognizant AI services: https://www.cognizant.com/us/en/services/ai
- Capgemini AI services: https://www.capgemini.com/service/ai/
- BCG X: https://www.bcg.com/bcg-x
- Slalom AI: https://www.slalom.com/us/en/services/artificial-intelligence
- PwC AI services: https://www.pwc.com/us/en/services/consulting/analytics/artificial-intelligence.html
- Datalumina: https://www.datalumina.com/

## Observed feature patterns across leading AI agencies
- **Case studies / client stories** are prominent and often grouped by industry or use case (Accenture case studies, IBM case studies, Cognizant case studies). 
- **Insights / research / reports** are a major content pillar (Accenture research reports + blog content, IBM reports + insights + newsletters, Capgemini insights + research library, BCG insights navigation).
- **Industries coverage** appears in primary navigation and as dedicated landing areas (Accenture industries mega-nav, Capgemini industries navigation, BCG industries nav).
- **Capabilities / services taxonomy** is detailed, often with sub-capability pages (Accenture capabilities, IBM capabilities/use cases, Cognizant capabilities section).
- **Contact / consultation forms** are surfaced prominently (Accenture contact, Cognizant contact anchor + form, Capgemini contact).
- **Careers / hiring** is frequently highlighted in the top nav and subnav (Accenture careers, Capgemini careers, BCG careers).
- **Partnerships / alliances / certifications** are used as trust signals (Cognizant mentions strategic alliances + ISO/IEC 42001 certification).
- **Events / community / newsletters** are used for ongoing engagement (IBM events + newsletters, BCG newsletter callout in insights nav).
- **Research sign-ups / early-access reports** are used to capture leads (Slalom research report sign-up).
- **Expert directories / named contacts** are common on larger firms (PwC contact collection and expert profiles).
- **Academies / training programs** are offered by boutique firms (Datalumina Academy and GenAI accelerator program).
- **Alliance ecosystems** are featured as navigation or capability areas (PwC alliances and ecosystems).

## Potential feature gaps for VivanceData (based on current site)
- **Detailed industry landing pages** beyond the current overview content.
- **Dedicated case study library** with filtering by industry or solution.
- **Research/insights hub** with reports, downloadable assets, and newsletter subscriptions beyond the blog.
- **Partnerships/alliances showcase** to highlight tech ecosystem relationships.
- **Careers page** and hiring CTA, which are common for larger AI agencies.
- **Events/webinars calendar** to support lead generation and thought leadership.
- **Training/academy offering** with accelerator or certification-style programs.
- **Expert directory** to feature named consultants and contact points.
- **Research early-access form** or gated flagship report lead capture.
- **Alliance ecosystem page** highlighting cloud/data/AI platform partners.

## Commands used to gather evidence
- `curl -L https://www.accenture.com/us-en/services/artificial-intelligence | rg -i "case|insight|client|contact|careers|capabilities|industries|report"`
- `curl -L https://www.ibm.com/consulting/artificial-intelligence | rg -i "case|insight|client|contact|careers|capabilities|industries|report|blog"`
- `curl -L https://www.cognizant.com/us/en/services/ai | rg -i "case|insight|client|contact|careers|capabilities|industries|report|blog"`
- `curl -L https://www.capgemini.com/service/ai/ | rg -i "case|insight|client|contact|careers|capabilities|industries|report|blog"`
- `curl -L https://www.bcg.com/bcg-x | rg -i "case|insight|capability|industries|contact|careers|events|report|blog"`
- `curl -L https://www.slalom.com/us/en/services/artificial-intelligence | rg -i "case|insight|client|contact|careers|capabilities|industries|report|blog|solutions"`
- `curl -L https://www.pwc.com/us/en/services/consulting/analytics/artificial-intelligence.html | rg -i "case|insight|client|contact|careers|capabilities|industries|report|blog|alliances|partners"`
- `curl -L https://www.datalumina.com/ | rg -i "academy|privacy policy|terms of service|book|demo|contact"`
