import { Tooltip } from "primereact/tooltip";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const SubModalitiesModal = ({
  data,
  modalityName,
  openAddSubModalityModal,
  deleteSubModality,
  updateSubModality,
}) => {

  const columns = [
    {
      name: "نام",
      selector: (row) => (row.Name ? row.Name.substr(0, 25) : ""),
      sortable: true,
      width: "auto",
    },
    {
      name: "عنوان",
      selector: (row) => row.Title.substr(0, 25) + " ...",
      sortable: true,
      width: "auto",
    },
    {
      name: "لینک",
      selector: (row) => row.Link,
      sortable: true,
      width: "auto",
    },
    {
      name: "توضیحات",
      selector: (row) => row.Des.substr(0, 40) + " ...",
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
            className="btn btn-sm btn-outline-danger removeBtn"
            onClick={() => deleteSubModality(row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".removeBtn">حذف</Tooltip>
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left editBtn"
            onClick={() => updateSubModality(row)}
            data-pr-position="top"
          >
            <Tooltip target=".editBtn">ویرایش</Tooltip>
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
        </div>
      ),
      width: "auto",
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
        id="subModalitiesModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <div className="loeing-header">
                <h6 className="mb-0 text-secondary font-14 fw-bold">
                  زیرمجموعه های بخش {modalityName}
                </h6>
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

            <div className="modal-body centerModalBody">
              <div dir="rtl">
                <div className="addLoeing-btn">
                  <button
                    className="btn btn-primary font-14"
                    onClick={() => openAddSubModalityModal()}
                  >
                    <i className="me-1">
                      <FeatherIcon icon="plus-square" />
                    </i>{" "}
                    زیر مجموعه جدید
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
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubModalitiesModal;
