import { useEffect, useReducer, useCallback } from "react";
import { useTransition } from "react-spring";
import ms from "ms";

const types = {
  NEXT: 0,
  PREV: 1,
};

const useTicker = (props = {}) => {
  const { data = [], dt = ms("3s"), transition = {}, init = true } = props;
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case types.NEXT: {
          const idx = (state.idx + 1) % data.length;

          return {
            item: data[idx],
            idx,
          };
        }
        case types.PREV:
          const idx = (state.idx - 1) % data.length;

          return {
            item: data[idx],
            idx,
          };
        default:
          return state;
      }
    },
    { item: data[0], idx: 0 }
  );

  const transitions = useTransition(state.idx, null, transition);

  const next = useCallback(() => dispatch({ type: types.NEXT }), [dispatch]);
  const previous = useCallback(() => {
    return dispatch({ type: types.PREV });
  }, [dispatch]);

  useEffect(() => {
    let intervalId;

    if (init) {
      intervalId = setInterval(() => {
        next();
      }, dt);

      return () => clearInterval(intervalId);
    }
  }, [dt, init, next]);

  return { ...state, dispatch, transitions, next, previous };
};

export default useTicker;
