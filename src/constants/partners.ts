/**
 * Copy for /partners.
 *
 * The rest of this site argues to a contractor. This page argues to the people
 * who already have the contractor's trust and phone number: the field-service
 * software resellers and implementers, the IT firms and MSPs who look after a
 * trade business's systems, the distributors and buying groups whose reps are
 * in the branch every week, and the bookkeepers who see the paperwork before
 * anyone else does.
 *
 * The reason this page exists is a channel problem, not a marketing one. An
 * owner-operator does not find a consultant by reading a website — they get a
 * name from someone they already pay. One partner relationship reaches more of
 * them than any amount of content aimed at the owner directly.
 *
 * WHAT IS DELIBERATELY MISSING: every commercial term. There is no referral
 * fee, no revenue share, no margin and no discount schedule anywhere in this
 * file, because none has been decided. Those are the owner's numbers to set,
 * and inventing a rate here would put a commitment on a public page that
 * nobody has agreed to. `partnerTerms` holds them as visible placeholders
 * instead; fill them in before this page ships, or cut that section.
 */

export interface PartnerAudience {
  who: string;
  why: string;
}

/** Who this page is written for, and why each one is worth approaching. */
export const partnerAudiences: PartnerAudience[] = [
  {
    who: "Field-service software resellers and implementers",
    why: "You already sit between the vendor and the contractor, and your customers keep asking you about AI. Building it yourself means owning a model you did not train and a failure mode you cannot explain at 9pm.",
  },
  {
    who: "IT firms and MSPs serving trades",
    why: "You look after their systems and you are the first call when something stops working. That is exactly the relationship this work needs and exactly the one I do not have.",
  },
  {
    who: "Distributors and buying groups",
    why: "Your reps are in the branch every week. A member who stops losing after-hours calls buys more, and it is the kind of thing a group can offer that a competitor cannot.",
  },
  {
    who: "Bookkeepers and accountants with trade clients",
    why: "You see the twice-typed paperwork before anyone else, because you are the one it eventually lands on. You know which clients have the problem badly enough to pay to fix it.",
  },
];

export interface PartnerCommitment {
  title: string;
  body: string;
}

/** What I will and will not do. The second half matters more than the first. */
export const partnerCommitments: PartnerCommitment[] = [
  {
    title: "You keep the relationship",
    body: "I do not want your customer. I want the workflow. Introduce me, sit in, or hand it over entirely — whichever suits how you work — and the contractor stays yours throughout.",
  },
  {
    title: "I do not sell software",
    body: "There is no subscription of mine competing with the one you already sold them, and no platform they have to move onto. The work runs against the systems they have, including yours.",
  },
  {
    title: "One person builds it",
    body: "The person who scopes the work builds it and answers the phone afterwards. Nobody gets handed to an account manager, including you.",
  },
  {
    title: "Priced as build and run",
    body: "An automation is not finished when it ships. Upstream APIs change and document formats drift, so every engagement carries a running cost, stated up front. Nothing here degrades quietly and becomes your support ticket.",
  },
  {
    title: "It refuses to guess",
    body: "Anything reading a voicemail or a scrawled slip will sometimes not be able to tell. It flags those rather than filling them in confidently, because a wrong callback number is worse than a flagged one — and because you are the one who hears about it if it is wrong.",
  },
];

/**
 * The commercial shape, unfilled.
 *
 * Every value here is a placeholder the owner has to replace before this page
 * is published. They are written as visible brackets rather than plausible
 * numbers so that shipping the page half-finished is obvious rather than
 * quietly wrong.
 */
export const partnerTerms = {
  heading: "How the commercial side works",
  note: "These are not settled yet. If you are reading this and the brackets are still here, ask me and I will tell you straight rather than making something up.",
  items: [
    { term: "Referral", detail: "[REFERRAL TERMS TO BE SET]" },
    { term: "White-label", detail: "[WHITE-LABEL TERMS TO BE SET]" },
    { term: "Who invoices the client", detail: "[TO BE SET]" },
  ],
} as const;

/**
 * Whether the commercial section is fit to publish.
 *
 * A bracketed value means the term has not been decided. The page checks this
 * and renders nothing rather than shipping the brackets: a public page that
 * promises "[TO BE SET]" is worse than one that simply stays quiet about
 * commercials until they exist. Fill every `detail` in and the section appears
 * on its own -- no second edit needed, and no way to publish it half-done.
 */
export function partnerTermsAreSet(): boolean {
  return partnerTerms.items.every((item) => !item.detail.includes("["));
}
