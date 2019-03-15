export const SECTION_CHANGE = 'SECTION_CHANGE';
export const BUTTON_PRESS = 'BUTTON_PRESS';

export const reducer = (state, { type, payload }) => {
  switch(type) {
    case SECTION_CHANGE:
      return { ...state, currentSection: payload };
    case BUTTON_PRESS:
      return { ...state, buttonScroll: payload };
    default:
      return state;
  }
}
