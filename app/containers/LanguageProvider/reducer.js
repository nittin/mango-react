/*
 *
 * LanguageProvider reducer
 *
 */
import produce from 'immer';

import { CHANGE_LOCALE } from './constants';
import { DEFAULT_LOCALE, appLocales } from 'i18n';

export const initialState = {
  locale: appLocales.includes(navigator.language) ? navigator.language : DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

export default languageProviderReducer;
