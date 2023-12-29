"use client";
import React from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import numberWithCommas from "class/numberWithComma";
import { Tooltip } from "primereact/tooltip";

const ServicesListTable = ({ data, deleteService, updateService }) => {
  const columns = [
    {
      name: "کد خدمت",
      selector: (row) => row._id,
      sortable: true,
      width: "100px",
    },
    {
      name: "نام خدمت",
      selector: (row) => row.Service.substr(0, 45) + " ...",
      sortable: true,
      width: "340px",
    },
    {
      name: "تعرفه دولتی",
      selector: (row) =>
        row.GovernmentalTariff ? numberWithCommas(row.GovernmentalTariff) : "",
      sortable: true,
      width: "150px",
    },
    {
      name: "تعرفه خصوصی",
      selector: (row) =>
        row.PrivateTariff ? numberWithCommas(row.PrivateTariff) : "",
      sortable: true,
      width: "150px",
    },
    {
      name: "تعرفه آزاد مرکز",
      selector: (row) =>
        row.FreeTariff ? numberWithCommas(row.FreeTariff) : "",
      sortable: true,
      width: "150px",
    },
    {
      name: "سهم بیمار تامین و خدمات",
      selector: (row) =>
        row.PatientCost ? numberWithCommas(row.PatientCost) : "",
      sortable: true,
      width: "200px",
    },
    {
      name: "سهم بیمار ارتش",
      selector: (row) =>
        row.ArteshPatientCost ? numberWithCommas(row.ArteshPatientCost) : "",
      sortable: true,
      width: "220px",
    },
    {
      name: "عملیات ها",
      selector: (row) => row._id,
      sortable: true,

      cell: (row) => (
        <div className="actions d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-danger removeBtn"
            onClick={() => deleteService(row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".removeBtn">حذف</Tooltip>
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="trash-2"
            />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left editBtn"
            onClick={() => updateService(row, row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".editBtn">ویرایش</Tooltip>
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="edit-3"
            />
          </button>
        </div>
      ),
      width: "200px",
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <div className="card-body p-4">
      <div className="table-responsive">
        <DataTableExtensions {...tableData}>
          <DataTable
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            paginationPerPage="20"
            highlightOnHover
            noDataComponent={
              <div style={{ padding: "24px", fontSize: "13px" }}>
                موردی برای نمایش وجود ندارد.
              </div>
            }
            customStyles={tableCustomStyles}
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default ServicesListTable;
