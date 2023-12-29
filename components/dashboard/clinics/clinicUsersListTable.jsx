import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Tooltip } from "primereact/tooltip";

const ClinicUsersListTable = ({
  data,
  updateClinicUser,
  activateClinicUser,
  deActivateClinicUser,
}) => {
  const columns = [
    {
      name: "نام کاربر",
      selector: (row) => row.FullName,
      sortable: true,
      width: "auto",
    },
    {
      name: "نام مستعار",
      selector: (row) => row.NickName,
      sortable: true,
      width: "auto",
    },
    {
      name: "نام کاربری",
      selector: (row) => row.User,
      sortable: true,
      width: "auto",
    },
    {
      name: "کد ملی",
      selector: (row) => row.NID,
      sortable: true,
      width: "auto",
    },
    {
      name: "شماره همراه",
      selector: (row) => row.Tel,
      sortable: true,
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      cell: (row) => (
        <div className="actions d-flex gap-2">
          {!row.Deactive ? (
            <button
              className="btn btn-sm btn-outline-success font-13 deActivateBtn"
              type="button"
              data-pr-position="top"
              onClick={() => deActivateClinicUser(row._id)}
            >
              <Tooltip target=".deActivateBtn">غیر فعال سازی</Tooltip>
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="user-check"
                />
              </i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger activateBtn"
              type="button"
              data-pr-position="top"
              onClick={() => activateClinicUser(row._id)}
            >
              <Tooltip target=".activateBtn">فعال سازی</Tooltip>
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="user-x"
                />
              </i>
            </button>
          )}

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left editDoctorBtn"
            onClick={() => updateClinicUser(row)}
            data-pr-position="top"
          >
            <Tooltip target=".editDoctorBtn">ویرایش</Tooltip>
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="edit-3"
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

export default ClinicUsersListTable;
