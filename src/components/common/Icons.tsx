type IconProps = React.SVGAttributes<SVGElement>

// Centres of the 5x5 matrix on a 512 grid.
const AXIS = [125, 190.5, 256, 321.5, 387]
// Lit dots, [row, column], top to bottom.
const LIT = [[0, 0], [0, 4], [1, 0], [1, 4], [2, 1], [2, 3], [3, 1], [3, 3]] as const
const BRAND = [4, 2] as const

export const Icons = {
  /**
   * The mark: a 5x5 dot matrix with a V lit in cream and one green dot at the base.
   * The unlit dots sit at reduced opacity so the mark reads in both themes.
   */
  logo: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true" {...props}>
      {AXIS.flatMap((y, row) =>
        AXIS.map((x, col) => {
          const index = row * AXIS.length + col
          const isBrand = row === BRAND[0] && col === BRAND[1]
          const isLit = LIT.some(([r, c]) => r === row && c === col)
          return (
            <circle
              key={`${row}-${col}`}
              cx={x}
              cy={y}
              r={isLit || isBrand ? 21 : 10}
              className={isBrand ? "fill-brand" : undefined}
              fill={isBrand ? undefined : "currentColor"}
              opacity={isLit ? 1 : isBrand ? 1 : 0.25}
              style={{ "--i": index } as React.CSSProperties}
            />
          )
        }),
      )}
    </svg>
  ),
}
