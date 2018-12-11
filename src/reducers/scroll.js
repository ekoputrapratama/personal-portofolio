import { SCROLL_TO } from './../actions/scroll';

const initialState = { title: '' };
export default function scroll(state, action) {
  switch (action.type) {
    case SCROLL_TO:
      return {
        type: SCROLL_TO,
        section: action.section
      };
    default:
      return initialState;
  }
}
