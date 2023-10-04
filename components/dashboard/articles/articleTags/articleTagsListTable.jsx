"use client";
import React from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Tooltip } from "primereact/tooltip";

const ArticleTagsListTable = ({ data, updateArticleTag, deleteArticleTag }) => {
  const columns = [
    {
      name: "عنوان",
      selector: (row) => row.Title,
      sortable: true,
      width: "auto",
    },
    {
      name: "عنوان انگلیسی",
      selector: (row) => row.EngTitle,
      sortable: true,
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row._id,
      sortable: true,

      cell: (row) => (
        <div className="actions d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-danger deleteTagAttachment"
            onClick={() => deleteArticleTag(row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".deleteTagAttachment">حذف</Tooltip>
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="trash-2"
            />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left editTagAttachment"
            onClick={() => updateArticleTag(row, row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".editTagAttachment">ویرایش</Tooltip>
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

export default ArticleTagsListTable;
