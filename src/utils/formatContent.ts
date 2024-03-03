export function formatContent(benifit: string) {
  if (benifit?.length < 50) return benifit;
  return benifit?.slice(0, 50) + "...";
}
