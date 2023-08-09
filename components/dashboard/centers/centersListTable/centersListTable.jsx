import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const CentersListTable = ({ data }) => {
  const columns = [
    {
      name: "نام",
      selector: (row) => row.Name.substr(0, 40) + " ...",
      sortable: true,
      width: "auto",
    },
    // {
    //   name: "نام",
    //   selector: (row) => row.Name,
    //   sortable: true,
    //   width: "auto",
    // },
    // {
    //   name: "نام",
    //   selector: (row) => row.Name,
    //   sortable: true,
    //   width: "auto",
    // },
    // {
    //   name: "نام",
    //   selector: (row) => row.Name,
    //   sortable: true,
    //   width: "auto",
    // },
    // {
    //   name: "نام",
    //   selector: (row) => row.Name,
    //   sortable: true,
    //   width: "auto",
    // },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          <Link
            className="btn btn-sm btn-outline-danger"
            href="#"
            // onClick={() => deleteMenu(row._id)}
          >
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>
          <Link
            className="btn btn-sm btn-outline-secondary btn-border-left"
            href="#"
            // onClick={() => updateMenu(row)}
          >
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>

          {!row.Deactive ? (
            <button
              className="btn btn-sm btn-outline-success font-13"
              type="button"
              // onClick={() => deActivateUser(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="غیر فعال سازی"
            >
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="check-circle"
                />
              </i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              // onClick={() => activateUser(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="فعال سازی"
            >
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="x-circle"
                />
              </i>
            </button>
          )}
        </div>
      ),
      width: "250px",
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
            highlightOnHover
            paginationPerPage="20"
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

export default CentersListTable;
