"use client";
import React from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const ArticleGroupsListTable = ({
  data,
  updateArticleGroup,
  deleteArticleGroup,
  checkImportantArticle,
  checkUnimportantArticle
}) => {
  const columns = [
    {
      name: "عنوان",
      selector: (row) => row.Title,
      sortable: true,
      width: "auto",
    },
    {
      name: "مشخصات",
      selector: (row) => row.Des,
      sortable: true,
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row._id,
      sortable: true,

      cell: (row) => (
        <div className="actions d-flex gap-2">
          <Link
            href="#"
            className="btn btn-sm btn-outline-danger"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="حذف"
            onClick={() => deleteArticleGroup(row._id)}
          >
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="trash-2"
            />
          </Link>

          <Link
            href="#"
            className="btn btn-sm btn-outline-secondary btn-border-left"
            onClick={() => updateArticleGroup(row, row._id)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="ویرایش"
          >
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="edit-3"
            />
          </Link>

          {!row.Important ? (
            <button
              className="btn btn-sm btn-outline-light font-13"
              type="button"
              onClick={() => checkImportantArticle(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="تغییر وضعیت اهمیت"
            >
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="star"
                />
              </i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-warning"
              type="button"
              onClick={() => checkUnimportantArticle(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="تغییر وضعیت اهمیت"
            >
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="star"
                />
              </i>
            </button>
          )}
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

export default ArticleGroupsListTable;