import { Fragment } from "react";
import classnames from "classnames";

import { Button } from "./Button";

export const LanguageButtons = props => {
  const { languages, currentLanguage, setLanguage } = props;

  return (
    <Fragment>
      {languages?.map(({ code }) => {
        const title = code.toUpperCase();
        const cls = classnames({
          active: code === currentLanguage,
        });

        return (
          <Button
            key={code}
            size="sm"
            variant="secondary"
            className={cls}
            onClick={() => setLanguage(code)}
            title={title}
          >
            {title}
          </Button>
        );
      })}
    </Fragment>
  );
};
