import { Factory, HardHat, Truck, Wrench } from "lucide-react";
import { clients, type ClientIcon } from "@/constants/clients";

// Same string-keyed icon map pattern as the rest of the site — constants stay
// serializable, and adding a variant without adding it here is a type error.
const sectorIcons: Record<ClientIcon, typeof Factory> = {
  "hard-hat": HardHat,
  wrench: Wrench,
  truck: Truck,
  factory: Factory,
};

/**
 * The four trades, set as a ruled grid rather than as four cards.
 *
 * It was four rounded panels with 56px icon tiles and a hover lift, which is
 * the arrangement this whole direction refuses: the cards were the structure,
 * and every one of them was the same shape whatever it held. A grid divided by
 * its own hairlines says the same thing with no chrome at all, and it is what
 * makes the page read as a sheet rather than as a deck.
 *
 * The band also carries the three commitments that used to sit in a separate
 * centred row. They belong here: the trades say who this is for, the
 * commitments say what the deal is, and a reader deciding whether to keep
 * scrolling needs both in one glance.
 */
export default function ClientLogos() {
  return (
    <section className="bleed border-t border-rule" aria-labelledby="trades-heading">
      <div className="container mx-auto px-4 py-3xl md:py-4xl">
        <div className="max-w-[46ch]">
          <h2 id="trades-heading" className="font-display text-serif-lg text-foreground">
            Blue-collar and local services, and <em className="italic">nothing else</em>
          </h2>
          <p className="mt-lg text-body-lg text-muted-foreground">
            I work with the businesses where the paperwork, the phone and the
            schedule are what actually hold the day up.
          </p>
        </div>

        {/* A single-pixel grid: one outer rule, and cells that borrow their
          * neighbours' edges. `-mx-px` swallows the doubled outer line. */}
        <ul className="mt-2xl grid grid-cols-1 border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
          {clients.map((client) => {
            const Icon = sectorIcons[client.icon];
            return (
              <li
                key={client.id}
                className="group border-b border-rule px-0 py-lg transition-colors duration-default sm:px-lg sm:odd:border-r lg:border-r lg:px-lg lg:last:border-r-0 lg:odd:border-r sm:first:pl-0 lg:first:pl-0"
              >
                <Icon
                  className="h-5 w-5 text-mute transition-colors duration-default group-hover:text-foreground"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <h3 className="mt-lg font-display text-serif-sm text-foreground">{client.name}</h3>
                <p className="mt-2 max-w-[34ch] text-body-sm text-muted-foreground">{client.blurb}</p>
              </li>
            );
          })}
        </ul>

        <dl className="grid grid-cols-1 md:grid-cols-3">
          {([
            [
              "One person, start to finish",
              "The person who scopes the job builds it and answers the phone afterwards.",
            ],
            [
              "Proved on your own paperwork",
              "Run on your own documents and call log before you pay for a build.",
            ],
            [
              "Yours when it is done",
              "Code, prompts and credentials transfer to you on delivery.",
            ],
          ] as const).map(([term, detail], index) => (
            <div
              key={term}
              className={`border-b border-rule py-lg md:px-lg ${
                index === 0 ? "md:pl-0" : ""
              }`}
            >
              <dt className="text-body-sm font-medium text-foreground">{term}</dt>
              <dd className="mt-1.5 max-w-[38ch] text-body-sm text-muted-foreground">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
