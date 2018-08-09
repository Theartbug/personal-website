export const SECTION_CHANGE = 'SECTION_CHANGE';
export const BUTTON_PRESS = 'BUTTON_PRESS';

export function currentSection(state = 0, { type, payload }) {
  switch(type) {
    case SECTION_CHANGE:
      return payload;
    default:
      return state;
  }
}

export function buttonScroll(state = false, { type, payload }) {
  switch(type) {
    case BUTTON_PRESS:
      return payload;
    default:
      return state;
  }
}