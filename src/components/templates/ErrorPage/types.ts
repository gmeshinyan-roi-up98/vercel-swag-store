type TErrorDigest = Partial<{
  digest: string;
}>;

export type TErrorPageTemplateProps = {
  reset: VoidFunction;
  error: Error & TErrorDigest;
};
