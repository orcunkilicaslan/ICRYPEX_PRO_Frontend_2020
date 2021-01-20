import PerfectScrollbar from 'react-perfect-scrollbar'
import classNames from "classnames";

const Table = props => {
  const { className, scrollbar, children, ...rest } = props;

  const tableClass = classNames("sitetablediv", className, {
    "scrollbar-tbl": Boolean(scrollbar),
  });

  return (
    <div className={tableClass} {...rest}>
      {children}
    </div>
  );
};

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;

export default Table;

export function Thead(props) {
  const { className, scrollbar, children, ...rest } = props;
  const tableClass = classNames("tbl-thead", className);

  const tableThead = (
    <div className={tableClass} {...rest}>
      {children}
    </div>
  );

  if (scrollbar) {
    const scrollbarClassName = classNames({
      "scrollbar-tbl-th": Boolean(scrollbar),
    });

    return <div className={scrollbarClassName}>{tableThead}</div>;
  }

  return tableThead;
}

export function Tbody(props) {
  const { className, scrollbar, striped, hovered, borderbottom, children, ...rest } = props;

  const tableClass = classNames("tbl-tbody", className, {
    "tbl-striped": Boolean(striped),
    "tbl-hovered": Boolean(hovered),
    "tbl-brdrbtm": Boolean(borderbottom),
  });

  const tableTbody = (
    <div className={tableClass} {...rest}>
      {children}
    </div>
  );

  if (scrollbar) {
    const scrollbarClassName = classNames({
      "scrollbar-tbl-tb": Boolean(scrollbar),
    });

    return <PerfectScrollbar className={scrollbarClassName}>{tableTbody}</PerfectScrollbar>;
  }

  return tableTbody;
}

export function Tr(props) {
  const { className, children, ...rest } = props;
  const tableTrClass = classNames("tbl-tr", className);

  return (
    <div className={tableTrClass} {...rest}>
      {children}
    </div>
  );
}

export function Th(props) {
  const { className, sizefixed, sizeauto, children, ...rest } = props;

  const tableThClass = classNames("tbl-th", className, {
    fxd: Boolean(sizefixed),
    aut: Boolean(sizeauto),
  });

  return (
    <div className={tableThClass} {...rest}>
      {children}
    </div>
  );
}

export function Td(props) {
  const { className, sizefixed, sizeauto, children, ...rest } = props;

  const tableTdClass = classNames("tbl-td", className, {
    fxd: Boolean(sizefixed),
    aut: Boolean(sizeauto),
  });

  return (
    <div className={tableTdClass} {...rest}>
      {children}
    </div>
  );
}
