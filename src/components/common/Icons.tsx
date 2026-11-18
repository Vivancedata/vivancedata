type IconProps = React.SVGAttributes<SVGElement>

// [row, column] of each lit dot in the 5x5 matrix, top to bottom.
const LIT = [[0, 0], [0, 4], [1, 0], [1, 4], [2, 1], [2, 3], [3, 1], [3, 3]] as const

export const Icons = {
  /**
   * The mark: a V lit in the site's dot matrix, resolving to one green dot.
   * This is the small cut (lit dots only); the full matrix with its unlit dots
   * is for avatars and turns to noise at nav size. Source of truth for both is
   * `profile/assets/source/mark.js` in the organisation's `.github` repo.
   */
  logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true" {...props}>
      {LIT.map(([row, col], index) => (
        <circle
          key={`${row}-${col}`}
          cx={32 + 48 * col}
          cy={32 + 48 * row}
          r={19}
          fill="currentColor"
          style={{ "--i": index } as React.CSSProperties}
        />
      ))}
      <circle cx={128} cy={224} r={19} className="fill-brand" style={{ "--i": LIT.length } as React.CSSProperties} />
    </svg>
  ),
}
