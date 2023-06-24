import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { Row, Col, Card, Media } from "react-bootstrap";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const ImagesListTable = ({ data }) => {
  const columns = [
    {
      name: "عکس",
      selector: (row) => row.Thumb,
      sortable: true,
      cell: (row) => (
        <img
          src={"https://irannobat.ir/CenterProfileImage/" + row.Thumb}
          alt=""
        />
      ),
      width: "100px",
    },
    {
      name: "عنوان",
      selector: (row) => row.Des,
      sortable: true,
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row._id,
      sortable: true,

      cell: (row) => (
        <div className="actions">
          <Link
            dir="ltr"
            href="#"
            className="text-black"
            // onClick={() => updateImage(row)}
            data-bs-toggle="modal"
            data-bs-target="#editImageModal"
          >
            <i className="me-1">
              <FeatherIcon icon="edit-3" />
            </i>{" "}
            ویرایش
          </Link>
          <Link
            dir="ltr"
            href="#"
            className="text-danger"
            // onClick={() => deleteImage(row._id)}
          >
            <i className="me-1">
              <FeatherIcon icon="trash-2" />
            </i>{" "}
            حذف
          </Link>
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
    <div className="card-body p-0">
      <div className="table-responsive">
        <DataTableExtensions {...tableData}>
          <DataTable
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
      </div>
    </div>
  );
};

export default ImagesListTable;
