"use client";
import React from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Tooltip } from "primereact/tooltip";

const ArticleGroupsListTable = ({
  data,
  updateArticleGroup,
  deleteArticleGroup,
  checkImportantArticle,
  checkUnimportantArticle,
}) => {
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
      name: "توضیحات",
      selector: (row) =>
        row.Des.length > 35 ? row.Des.substr(0, 35) + " ..." : row.Des,
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
            data-pr-position="top"
            className="btn btn-sm btn-outline-danger deleteGrp"
            onClick={() => deleteArticleGroup(row._id)}
          >
            <Tooltip target=".deleteGrp">حذف</Tooltip>
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="trash-2"
            />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left editGrp"
            onClick={() => updateArticleGroup(row, row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".editGrp">ویرایش</Tooltip>
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="edit-3"
            />
          </button>

          {!row.Important ? (
            <button
              className="btn btn-sm btn-outline-light font-13 changeGrpPriority"
              type="button"
              onClick={() => checkImportantArticle(row._id)}
              data-pr-position="top"
            >
              <Tooltip target=".changeGrpPriority">تغییر وضعیت اهمیت</Tooltip>
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="star"
                />
              </i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-warning unChangeGrpPriority"
              type="button"
              onClick={() => checkUnimportantArticle(row._id)}
              data-pr-position="top"
            >
              <Tooltip target=".unChangeGrpPriority">تغییر وضعیت اهمیت</Tooltip>
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
