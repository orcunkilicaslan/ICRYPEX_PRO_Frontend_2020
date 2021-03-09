import { useEffect } from "react";
import { animated } from "react-spring";
import ms from "ms";

import { useTicker } from "~/state/hooks/";

const Ticker = props => {
  const { items, interval = ms("5s"), ...rest } = props;
  const { item, transitions, next } = useTicker({
    data: items,
    transition: {
      // from: { position: "absolute", opacity: 0 },
      // enter: { opacity: 1 },
      // leave: { opacity: 0 },
      from: {
        position: "absolute",
        transform: "translate3d(-100%, 0, 0)",
      },
      enter: { transform: "translate3d(0, 0, 0)" },
      leave: { opacity: 0 },
      // reset: true,
      // reverse: true,
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, next]);

  return (
    <div className="newstickerbars-box form-control" {...rest}>
      {transitions.map(({ props, key }) => {
        return (
          item && (
            <animated.div
              key={`news${key}`}
              style={{ ...props, color: "white" }}
              className="newstickerbars-item"
            >
              <a href={item?.href} target="_blank" rel="noopener noreferrer">
                {item?.title}
              </a>
            </animated.div>
          )
        );
      })}
    </div>
  );
};

export default Ticker;
