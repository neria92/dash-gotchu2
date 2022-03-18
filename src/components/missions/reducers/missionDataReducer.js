import { types } from "../types/types";

const initialState = {};

export const missionDataReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.addData:
      return {
        ...state,
        ...action.payload
      };
    case types.removeData:
      return {};

    default:
      return state;
  }

}