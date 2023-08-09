import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const MenuListTable = ({
  data,
  addSubMenuModal,
  SetSubMenuInDT,
  deleteMenu,
  updateMenu,
}) => {
  const columns = [
    {
      name: "عنوان",
      selector: (row) => row.Name,
      sortable: true,
      width: "auto",
    },
    {
      name: "آیکون",
      selector: (row) => row.Icon,
      sortable: true,
      cell: (row) => (
        <div className="actions">
          <FeatherIcon
            icon={row.Icon}
            style={{ width: "16px", height: "16px" }}
          />
        </div>
      ),
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          <Link
            className="btn btn-sm btn-outline-danger"
            href="#"
            onClick={() => deleteMenu(row._id)}
          >
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>
          <Link
            className="btn btn-sm btn-outline-secondary btn-border-left"
            href="#"
            onClick={() => updateMenu(row)}
          >
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>

          {/* SubMenu */}
          <Link
            href="#"
            className="m-0 btn btn-sm btn-outline-secondary btn-border-left"
            data-bs-toggle="modal"
            data-bs-target="#subMenuModal"
            onClick={() => SetSubMenuInDT(row.subMenu, row._id, row.Name)}
          >
            <p>زیر منو</p>
          </Link>
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

export default MenuListTable;
