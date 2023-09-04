import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const SubMenuModal = ({
  data,
  openSubMenuModal,
  updateSubMenu,
  deleteSubMenu,
  menuName,
}) => {
  const columns = [
    {
      name: "عنوان",
      selector: (row) => row.Name,
      sortable: true,
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
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="حذف"
            onClick={() => deleteSubMenu(row._id)}
          >
            <FeatherIcon
              icon="trash-2"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>

          <Link
            className="btn btn-sm btn-outline-secondary btn-border-left"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="ویرایش"
            onClick={() => updateSubMenu(row)}
          >
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>
        </div>
      ),
      width: "150px",
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
        id="subMenuModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="loeing-header">
                <p className="mb-0 text-secondary font-14 fw-bold">
                  لیست زیر منوهای {menuName}
                </p>
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
                <Link
                  href="#"
                  className="btn btn-primary font-14"
                  onClick={openSubMenuModal}
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  زیر منو جدید
                </Link>
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
    </>
  );
};

export default SubMenuModal;
