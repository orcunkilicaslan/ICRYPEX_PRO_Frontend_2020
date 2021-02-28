import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import classNames from "classnames";
import { Collapse } from "reactstrap";

import { Button } from "~/components/Button.jsx";
import { IconSet } from "~/components/IconSet.jsx";

const AccordionCollapse = props => {
  const { className, scrollbar, children, ...rest } = props;
  const accordionClass = classNames("collapseacc", className);

  if (scrollbar) {
    return (
      <PerfectScrollbar className={accordionClass} {...rest}>
        {children}
      </PerfectScrollbar>
    );
  }

  return (
    <div className={accordionClass} {...rest}>
      {children}
    </div>
  );
};

AccordionCollapse.Item = Item;
AccordionCollapse.Head = Head;
AccordionCollapse.Body = Body;

export default AccordionCollapse;

export function Item(props) {
  const { className, children, open, ...rest } = props;
  const accordionItemClass = classNames("collapseacc-item", className);
  return (
    <div className={accordionItemClass} {...rest}>
      {React.Children.map(children, child => {
        if (open && child.type.name === "Body") {
          return React.cloneElement(child, { isOpen: true });
        }

        return child;
      })}
    </div>
  );
}

export function Head(props) {
  const { className, children, ...rest } = props;
  const accordionHeadClass = classNames("heading", className);

  return (
    <Button className={accordionHeadClass} {...rest}>
      <span className="heading-title">{children}</span>
      <span className="heading-detail">
        <IconSet sprite="sprtsmclrd" size="14" name="arrowmore" />
      </span>
    </Button>
  );
}

export function Body(props) {
  const { className, children, ...rest } = props;
  const accordionBodyClass = classNames(className);

  return (
    <Collapse className={accordionBodyClass} {...rest}>
      <div className="collapse-content">{children}</div>
    </Collapse>
  );
}
