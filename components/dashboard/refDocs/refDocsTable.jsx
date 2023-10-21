import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Tooltip } from "primereact/tooltip";

const RefDocTable = ({ data, deleteRefDoc, openEditRefDocModal }) => {
  data?.map((refDoc, index) => {
    data[index].rowNumber = index + 1;
  });

  const columns = [
    {
      name: "ردیف",
      selector: (row) => row.rowNumber,
      sortable: true,
      width: "80px",
    },
    {
      name: "شماره نظام پزشکی",
      selector: (row) => row.MSID,
      sortable: true,
      width: "200px",
    },
    {
      name: "نام پزشک",
      selector: (row) => row.FullName,
      sortable: true,
      width: "270px",
    },
    {
      name: "تخصص",
      selector: (row) => row.Expertise,
      width: "300px",
    },
    {
      name: "آدرس",
      selector: (row) => row.Address,
      sortable: true,
      width: "300px",
    },
    {
      name: "عملیات ها",
      selector: (row) => row._id,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          <button
            className="btn btn-sm btn-outline-danger removeBtn"
            onClick={() => deleteRefDoc(row._id)}
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
            onClick={() => openEditRefDocModal(row)}
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

export default RefDocTable;