// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />

declare namespace JSX {
  interface IntrinsicAttributes {
    "client:load"?: boolean;
    "client:idle"?: boolean;
    "client:visible"?: boolean;
    "client:media"?: string;
    "client:only"?: boolean;
  }
}
