declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.ico';
declare module '*.svg';
declare module '*.md' {
  const value: string; // markdown is just a string
  export default value;
}
