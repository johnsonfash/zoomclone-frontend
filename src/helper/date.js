export const getYears = (time) => {
  let crY = new Date().getFullYear();
  let yr = new Date(time).getFullYear();
  let amt = yr - crY;
  return amt < 2 ? '1 year' : amt + ' years';
}