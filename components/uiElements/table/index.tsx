import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

// types
import {
  RowProps,
  TableColumnType,
  TableProps
} from "types/components/uiElements/Table";

const Table: React.FC<TableProps> = ({
  columnData,
  rowData,
  isFixed = false
}) => {
  return (
    <section className="w-full dflex-center">
      <table
        className="w-full"
        style={{ tableLayout: isFixed ? "fixed" : "auto" }}
      >
        <thead>
          <tr className="bg-gray-200">
            {columnData?.map((columnObj: TableColumnType, index: number) => {
              // Checks for column is number dynamic

              return (
                <th
                  style={columnObj.cellStyles}
                  key={"headingRow" + index}
                  className="text-left py-3 px-4 text-black whitespace-nowrap"
                >
                  {typeof columnObj?.title === "function"
                    ? columnObj?.title()
                    : columnObj.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rowData?.map((row: any, index: number) => (
            <GetRow
              key={uuidv4()}
              row={row}
              columnData={columnData}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

const GetRow: React.FC<RowProps> = ({
  row,
  index,
  columnData,
  bodyCellStyles
}) => {
  return (
    <tr key={"bodyRow" + row?.indexNum ?? index}>
      {columnData.map((columnItem, columnIndex) => {
        const value = row?.[columnItem.column];

        if (!value && value !== 0) {
          return (
            <td
              style={{
                ...bodyCellStyles
              }}
              className="text-left py-3 px-4"
              key={columnIndex}
            >
              <span>{"-"}</span>
            </td>
          );
        }

        return (
          <Fragment key={columnIndex}>
            {typeof value === "string" && (
              <td
                style={{
                  ...columnItem.bodyStyles,
                  ...bodyCellStyles
                }}
                className="text-left py-3 px-4 text-black"
              >
                <span className="max-w-full block overflow-hidden text-ellipsis whitespace-nowrap">
                  {value}
                </span>
              </td>
            )}

            {typeof value === "function" && (
              <td
                style={bodyCellStyles}
                className="text-left py-3 px-4 text-black"
              >
                {value(row?.indexNum ?? index)}
              </td>
            )}
          </Fragment>
        );
      })}
    </tr>
  );
};

export default Table;
