declare module 'canvas-confetti'
declare namespace JSX {
  interface IntrinsicElements {
    'l-bouncy': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        size: string
        color: string
      },
      HTMLElement
    >
  }
}
