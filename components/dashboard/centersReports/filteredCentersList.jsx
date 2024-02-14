import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle";
import "react-data-table-component-extensions/dist/index.css";

const FilteredCentersList = ({ data }) => {
  const columns = [
    {
      name: "نام مرکز",
      selector: (row) => row.name,
      sortable: true,
      width: "auto",
    },
    {
      name: "تعداد نوبت دریافتی",
      selector: (row) => row.count,
      sortable: true,
      width: "auto",
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <div className="card-body">
      <div className="table-responsive">
        <DataTableExtensions {...tableData}>
          <DataTable
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
            paginationPerPage="50"
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

export default FilteredCentersList;
