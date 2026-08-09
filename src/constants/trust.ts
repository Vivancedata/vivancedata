import { Shield, Lock, KeyRound, FileCheck, Trash2, Scale } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Commitments, not certifications.
 *
 * This section previously asserted SOC 2 Type II ("independently audited"),
 * ISO 27001, HIPAA and AWS Partner status. None of those are held, and an
 * unearned attestation is the kind of claim that fails a buyer's diligence and
 * creates real liability. Everything below is a practice under our own control,
 * so it is verifiable rather than attested.
 *
 * Do not add an entry here that a third party would have to certify.
 */

export interface TrustCommitment {
  id: string
  name: string
  description: string
  icon: LucideIcon
}

export interface SecurityPractice {
  label: string
}

export const commitments: TrustCommitment[] = [
  {
    id: "data-ownership",
    name: "Your Data Stays Yours",
    description: "Client data is never used to train models, never resold, and never shared with third parties",
    icon: Lock,
  },
  {
    id: "ip-ownership",
    name: "You Own the Output",
    description: "Code, prompts, pipelines and documentation transfer to you on delivery. No platform lock-in",
    icon: FileCheck,
  },
  {
    id: "least-access",
    name: "Least-Privilege Access",
    description: "Access is scoped to the systems an engagement actually needs, and revoked when it ends",
    icon: KeyRound,
  },
  {
    id: "secrets",
    name: "Credentials Handled Properly",
    description: "Data in transit is TLS-encrypted and secrets live in managed vaults, never in code or config",
    icon: Shield,
  },
  {
    id: "deletion",
    name: "Deletion on Request",
    description: "Your data and our access are removed at the end of an engagement, or sooner if you ask",
    icon: Trash2,
  },
  {
    id: "your-framework",
    name: "Built to Your Framework",
    description: "For regulated work we build inside your existing controls and audit requirements rather than claiming our own certifications",
    icon: Scale,
  },
]

export const securityPractices: SecurityPractice[] = [
  { label: "Least-privilege access" },
  { label: "Secrets never in code" },
  { label: "Documented handover" },
]

export const trustSectionContent = {
  badge: "Data & Security",
  title: "How your data is handled",
  description:
    "No inherited certifications and no borrowed badges. These are the commitments that govern every engagement.",
  secureByDesign: {
    title: "Secure by default",
    description: "Every build starts from least privilege and explicit data boundaries",
  },
}
