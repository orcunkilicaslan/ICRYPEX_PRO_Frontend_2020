import { mapToCssModules } from 'reactstrap/src/utils';
import classNames from 'classnames';

export const TableMain = props => {

  const {
    className,
    cssModule,
    scrollbar,
    children,
    ...rest
  } = props;

  const tableClass = mapToCssModules(classNames(
      "sitetablediv",
      className,
      scrollbar ? "scrollbar-tbl" : false,
  ), cssModule);

  return (
      <div className={tableClass} {...rest}>
        {children}
      </div>
  );

};

export const TableThead = props => {

  const {
    className,
    cssModule,
    scrollbar,
    children,
    ...rest
  } = props;

  const tableClass = mapToCssModules(classNames(
      "tbl-thead",
      className,
  ), cssModule);

  const tableThead = <div className={tableClass} {...rest}>
    {children}
  </div>;

  if (scrollbar) {
    const scrollbarClassName = mapToCssModules(scrollbar === true ? "scrollbar-tbl-th" : false, cssModule);

    return (
        <div className={scrollbarClassName}>{tableThead}</div>
    );
  }

  return tableThead;

};

export const TableTbody = props => {

  const {
    className,
    cssModule,
    scrollbar,
    striped,
    hovered,
    children,
    ...rest
  } = props;

  const tableClass = mapToCssModules(classNames(
      "tbl-tbody",
      className,
      striped ? "tbl-striped" : false,
      hovered ? "tbl-hovered" : false,
  ), cssModule);

  const tableTbody = <div className={tableClass} {...rest}>
    {children}
  </div>;

  if (scrollbar) {
    const scrollbarClassName = mapToCssModules(scrollbar === true ? "scrollbar-tbl-tb" : false, cssModule);

    return (
        <div className={scrollbarClassName}>{tableTbody}</div>
    );
  }

  return tableTbody;

};

export const TableTr = props => {

  const {
    className,
    cssModule,
    children,
    ...rest
  } = props;

  const tableTr = mapToCssModules(classNames(
      "tbl-tr",
      className,
  ), cssModule);

  return (
      <div className={tableTr} {...rest}>
        {children}
      </div>
  );

};

export const TableTh = props => {

  const {
    className,
    sizefixed,
    sizeauto,
    cssModule,
    children,
    ...rest
  } = props;

  const tableTh = mapToCssModules(classNames(
      "tbl-th",
      className,
      sizefixed ? "fxd" : false,
      sizeauto ? "aut" : false,
  ), cssModule);

  return (
      <div className={tableTh} {...rest}>
        {children}
      </div>
  );

};

export const TableTd = props => {

  const {
    className,
    sizefixed,
    sizeauto,
    cssModule,
    children,
    ...rest
  } = props;

  const tableTd = mapToCssModules(classNames(
      "tbl-td",
      className,
      sizefixed ? "fxd" : false,
      sizeauto ? "aut" : false,
  ), cssModule);

  return (
      <div className={tableTd} {...rest}>
        {children}
      </div>
  );

};