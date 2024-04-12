"use client";
import { TableColumnType } from "types/components/uiElements/Table";

export const masterChargeTable = [
  {
    id: 0,
    speciality: "Favourite",
    service: "Heart",
    code: "HT",
    price: 402,
    description: "Heart Testing",
    menu: true
  },
  {
    id: 1,
    speciality: "Favourite",
    service: "Thyroid",
    code: "TY",
    price: 402,
    description: "Thyroid Testing",
    menu: true
  },
  {
    id: 2,
    speciality: "Favourite",
    service: "Heart",
    code: "HT",
    price: 402,
    description: "Heart Testing",
    menu: true
  },
  {
    id: 3,
    speciality: "Favourite",
    service: "Thyroid",
    code: "TY",
    price: 402,
    description: "Thyroid Testing",
    menu: true
  }
];

export const masterChargeColumns: TableColumnType[] = [
  {
    column: "srNo",
    title: "Sr. No"
  },
  {
    column: "speciality",
    title: "Speciality"
  },
  {
    column: "service",
    title: "Service"
  },
  {
    column: "code",
    title: "CPT"
  },
  {
    column: "price",
    title: "Price"
  },
  {
    column: "description",
    title: "Description"
  },
  {
    column: "menu",
    title: "Menu"
  }
];
