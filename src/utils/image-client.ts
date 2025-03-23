export function getOptimizeImageSize(
  naturalWidth: number,
  naturalHeight: number,
  square: number,
) {
  const a = Math.sqrt(square / (naturalWidth * naturalHeight));

  const width = naturalWidth * a;
  const height = naturalHeight * a;

  return { width, height };
}
