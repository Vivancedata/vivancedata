import { Shield, Lock, CheckCircle, FileCheck, Scale, Cloud } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface TrustCertification {
  id: string
  name: string
  description: string
  icon: LucideIcon
}

export interface SecurityFeature {
  label: string
}

export const certifications: TrustCertification[] = [
  {
    id: "soc2",
    name: "SOC 2 Type II",
    description: "Independently audited security controls for data protection and privacy",
    icon: Shield,
  },
  {
    id: "gdpr",
    name: "GDPR Compliant",
    description: "Full compliance with European data protection regulations",
    icon: Lock,
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    description: "International standard for information security management",
    icon: CheckCircle,
  },
  {
    id: "hipaa",
    name: "HIPAA Compliant",
    description: "Healthcare data protection and privacy standards",
    icon: FileCheck,
  },
  {
    id: "ccpa",
    name: "CCPA Compliant",
    description: "California Consumer Privacy Act compliance for data rights",
    icon: Scale,
  },
  {
    id: "aws-partner",
    name: "AWS Partner",
    description: "Certified AWS partner with expertise in cloud-native AI solutions",
    icon: Cloud,
  },
]

export const securityFeatures: SecurityFeature[] = [
  { label: "256-bit Encryption" },
  { label: "Regular Audits" },
  { label: "24/7 Monitoring" },
]

export const trustSectionContent = {
  badge: "Security & Compliance",
  title: "Enterprise-Grade Security & Compliance",
  description:
    "Your data security is our top priority. We maintain the highest industry standards to ensure your information is protected at every level.",
  secureByDesign: {
    title: "Secure by Design",
    description: "All our solutions are built with security-first architecture",
  },
}
