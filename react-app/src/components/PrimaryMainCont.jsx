import classNames from "classnames";

const PrimaryMainCont = props => {

  const { className, box, title, children, ...rest } = props;
  const mainContClass = classNames("maincont", className, {
    "maincont-box": Boolean(box),
  });

  return (
      <div className={mainContClass} {...rest}>
        {children}
      </div>
  );

};

export default PrimaryMainCont;

PrimaryMainCont.MainTitle   = MainTitle;
PrimaryMainCont.MainContent = MainContent;
PrimaryMainCont.Sub         = Sub;
PrimaryMainCont.SubTitle    = SubTitle;
PrimaryMainCont.SubContent  = SubContent;

export function MainTitle(props) {

  const { className, titleName, children, ...rest } = props;
  const mainContTitleClass = classNames("maincont-box-title", className);

    const mainContTitle = (
        <div className={mainContTitleClass} {...rest}>
            {children}
        </div>
    );

    if (titleName) {
        return (
            <div className={mainContTitleClass} {...rest}>
                <h2>{titleName}</h2>
            </div>
        );
    }

    return mainContTitle;

}

export function MainContent(props) {

    const { className, contentClassName, children, ...rest } = props;
    const mainContContentClass = classNames("maincont-box-cont");

    const mainContContent = (
        <div className={mainContContentClass} {...rest}>
            {children}
        </div>
    );

    if (contentClassName) {
        return (
            <PrimaryMainCont.MainContent>
                <div className={`maincont-${contentClassName}`}>
                    {children}
                </div>
            </PrimaryMainCont.MainContent>
        );
    }

    return mainContContent;
}

export function Sub(props) {

    const { className, titleName, children, ...rest } = props;

    const subClass = classNames("mcontbox", className);

    return (
        <div className={subClass} {...rest}>
            {children}
        </div>
    );

}

export function SubTitle(props) {

    const { className, titleName, children, ...rest } = props;
    const subTitleClass = classNames("mcontbox-title", className);

    const mainContTitle = (
        <div className={subTitleClass} {...rest}>
            {children}
        </div>
    );

    if (titleName) {
        return (
            <div className={subTitleClass} {...rest}>
                <h3>{titleName}</h3>
                {children}
            </div>
        );
    }

    return mainContTitle;

}

export function SubContent(props) {

    const { className, children, ...rest } = props;
    const subContentClass = classNames("mcontbox-cont", className);

    return (
        <div className={subContentClass} {...rest}>
            {children}
        </div>
    );

}