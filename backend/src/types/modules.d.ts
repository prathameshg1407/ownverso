/**
 * Module Declarations
 *
 * Type declarations for modules without TypeScript definitions.
 */

// Declare any untyped modules here
declare module 'some-untyped-module' {
  const content: unknown;
  export default content;
}

// Add more module declarations as needed
declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
}