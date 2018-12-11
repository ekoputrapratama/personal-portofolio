export const SCROLL_TO = 'SCROLL_TO';

export function scrollTo(section) {
  return {
    type: SCROLL_TO,
    section
  };
}
