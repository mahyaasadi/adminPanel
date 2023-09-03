import { useState, useEffect } from "react";
import Link from "next/link";
import { axiosClient } from "class/axiosConfig.js";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const GrpAttachmentList = ({
  data,
  articleTitle,
  openAttachGrpModal,
  removeGrpFromArticle,
}) => {
  const columns = [
    {
      name: "عنوان",
      selector: (row) => row.Group?.Title,
      sortable: true,
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      sortable: true,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          <button
            className="btn btn-sm btn-outline-danger"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="حذف"
            onClick={() => removeGrpFromArticle(row._id)}
          >
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <div
        className="modal fade contentmodal"
        id="grpAttachmentModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="loeing-header">
                <span className="ServiceName font-13 px-2">
                  گروه های مقاله {articleTitle}
                </span>
              </div>
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i>
                  <FeatherIcon icon="x-circle" />
                </i>
              </button>
            </div>

            <div className="modal-body">
              <div className="addLoeing-btn">
                <button
                  className="btn btn-primary font-14"
                  onClick={openAttachGrpModal}
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  افزودن گروه
                </button>
              </div>

              <div className="card-body p-4">
                <div className="table-responsive">
                  <DataTableExtensions {...tableData}>
                    <DataTable
                      noHeader
                      defaultSortField="id"
                      pagination
                      highlightOnHover
                      defaultSortAsc={false}
                      customStyles={tableCustomStyles}
                      noDataComponent={
                        <div style={{ padding: "24px", fontSize: "13px" }}>
                          موردی برای نمایش وجود ندارد.
                        </div>
                      }
                    />
                  </DataTableExtensions>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GrpAttachmentList;
