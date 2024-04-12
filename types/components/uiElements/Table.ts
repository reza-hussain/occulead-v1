import type * as CSS from "csstype";

export type TableProps = {
  columnData: TableColumnType[];
  rowData: any;
  bodyCellStyles?: CSS.Properties;
  isFixed?: boolean;
};

export type RowProps = {
  row: any;
  index: number;
  columnData: TableColumnType[];
  bodyCellStyles?: CSS.Properties;
};

export type TableColumnType = {
  title: string | Function;
  column: string;
  cellStyles?: CSS.Properties;
  bodyStyles?: CSS.Properties;
};
