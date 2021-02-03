import classNames from "classnames";

const MainCont = props => {

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

export default MainCont;

MainCont.Title = Title;
MainCont.Content = Content;

export function Title(props) {

  const { className, titleName, children, ...rest } = props;
  const mainContTitleClass = classNames("maincont-box-title", className);

    const mainContTitle = (
        <div className={mainContTitleClass} {...rest}>
            <h2>{children}</h2>
        </div>
    );

    if (titleName) {
        return (
            <MainCont.Title>
                {titleName}
            </MainCont.Title>
        );
    }

    return mainContTitle;

}

export function Content(props) {

    const { className, contentName, children, ...rest } = props;
    const mainContContentClass = classNames("maincont-box-cont");

    const mainContContent = (
        <div className={mainContContentClass} {...rest}>
            {children}
        </div>
    );

    if (contentName) {
        return (
            <MainCont.Content>
                <div className={`maincont-${contentName}`}>
                    {children}
                </div>
            </MainCont.Content>
        );
    }

    return mainContContent;
}