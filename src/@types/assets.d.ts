declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.svg" {
  const content: React.ImgHTMLAttributes;
  export default content;
}
