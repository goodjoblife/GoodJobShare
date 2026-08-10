declare module 'marked' {
  export function marked(src: string): string;
  export namespace marked {
    function parse(src: string): string;
  }
}
