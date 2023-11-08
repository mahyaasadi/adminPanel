import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Tooltip } from "primereact/tooltip";

const ClinicListTable = ({ data, updateClinic, deleteClinic, reActivateClinic }) => {
  data?.map((clinic, index) => {
    data[index].rowNumber = index + 1;
  });

  const columns = [
    {
      name: "ردیف",
      selector: (row) => row.rowNumber,
      sortable: true,
      width: "85px",
    },
    {
      name: "نام مطب",
      selector: (row) => row.Name,
      sortable: true,
      width: "200px",
    },
    {
      name: "لوگو",
      selector: (row) => row.Logo,
      cell: (row) =>
        row.Logo ? (
          <div className="articleCurrentImg">
            <img style={{ width: "40px" }} src={row.Logo} alt="" />
            <Tooltip target=".removeImgBtn">حذف لوگو</Tooltip>
            <button
              className="btn removeImgBtn tooltip-button"
              type="button"
              data-pr-position="top"
            // onClick={}
            >
              <FeatherIcon className="removeLogoBtnIcon" icon="x-circle" />
            </button>
          </div>
        ) : (
          ""
        ),
      width: "300px",
    },
    {
      name: "شماره تماس رابط",
      selector: (row) => row.ManageTel,
      sortable: true,
      width: "300px",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      cell: (row) => (
        <div className="actions d-flex gap-2">
          {row.Deleted ? (
            <button
              className="btn btn-sm btn-danger removedBtn"
              onClick={() => reActivateClinic(row._id)}
              data-pr-position="top"
            >
              <Tooltip target=".removedBtn">فعال سازی</Tooltip>
              <FeatherIcon
                style={{ width: "16px", height: "16px" }}
                icon="trash-2"
              />
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger removeDoctorBtn"
              onClick={() => deleteClinic(row._id)}
              data-pr-position="top"
            >
              <Tooltip target=".removeDoctorBtn">حذف</Tooltip>
              <FeatherIcon
                style={{ width: "16px", height: "16px" }}
                icon="trash-2"
              />
            </button>
          )}

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left editDoctorBtn"
            onClick={() => updateClinic(row, row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".editDoctorBtn">ویرایش پزشک</Tooltip>
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="edit-3"
            />
          </button>

          <Link
            className="btn btn-sm btn-outline-primary addUserBtn d-flex align-items-center justify-center"
            href={{
              pathname: "/clinicUsersManagement",
              query: { id: row._id, name: row.Name },
            }}
            data-pr-position="top"
          >
            <Tooltip target=".addUserBtn">افزودن کاربر</Tooltip>
            <FeatherIcon
              style={{ width: "16px", height: "16px" }}
              icon="user-plus"
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

export default ClinicListTable;
