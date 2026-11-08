/**
 * A field people never see and bots fill in. Bots post this site's forms with
 * strangers' addresses; /api/contact and /api/tool-report drop any request that
 * arrives with this field set, so nothing is sent.
 *
 * It is moved off-screen rather than hidden with display:none, which some bots
 * check for, and kept out of the tab order and the accessibility tree. The name
 * and label match nothing a browser autofills, so a real visitor's browser
 * leaves it empty.
 */
export const BOT_TRAP_FIELD = "contactCheck";

export function BotTrapField({ id }: { id: string }): React.ReactElement {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} name={BOT_TRAP_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

/** What the submitted form held in the trap: "" for every real visitor. */
export function readBotTrap(form: EventTarget | null | undefined): string {
  if (!(form instanceof HTMLFormElement)) return "";
  const value = new FormData(form).get(BOT_TRAP_FIELD);
  return typeof value === "string" ? value : "";
}
