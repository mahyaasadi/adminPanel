import { Tooltip } from "primereact/tooltip";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const ModalityListTable = ({
  data,
  updateModality,
  openSubModalitiesModal,
}) => {
  const columns = [
    {
      name: "عنوان",
      selector: (row) => row.Modality,
      sortable: true,
      width: "auto",
    },
    {
      name: "عنوان کامل",
      selector: (row) => row.FullName,
      sortable: true,
      width: "auto",
    },
    {
      name: "عنوان فارسی",
      selector: (row) => row.PerFullName,
      sortable: true,
      width: "auto",
    },
    {
      name: "آیکون",
      selector: (row) => row.Icon,
      cell: (row) => (
        <div>
          <img
            src={"https://irannobat.ir/admin/assets/img/" + row.Icon}
            alt=""
            style={{ width: "32px", height: "32px" }}
          />
        </div>
      ),
      width: "auto",
    },
    {
      name: "عملیات ها",
      selector: (row) => row._id,
      cell: (row) => (
        <div className="actions d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-secondary btn-border-left editBtn"
            onClick={() => updateModality(row, row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".editBtn">ویرایش</Tooltip>
            <FeatherIcon
              style={{ width: "15px", height: "15px" }}
              icon="edit-2"
            />
          </button>
          <button
            className="btn btn-sm btn-outline-primary subModalities"
            onClick={() => openSubModalitiesModal(row, row.Modality, row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".subModalities">زیر مجموعه ها</Tooltip>
            <FeatherIcon
              style={{ width: "15px", height: "15px" }}
              icon="layers"
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

export default ModalityListTable;
