import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Dropdown } from "primereact/dropdown";
import { Tooltip } from "primereact/tooltip";

const CentersListTable = ({
  data,
  updateCenterInfo,
  openBusinessHoursModal,
  openAboutUsModal,
  selectedPage,
  ChangeTablePage,
  activeOR,
  deActiveOR,
  deActivateCenter,
  activateCenter,
  setSerachableCenter,
  removeSearchableCenter,
}) => {
  const router = useRouter();

  data?.map((center, index) => {
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
      name: "نام مرکز",
      selector: (row) => row.Name,
      sortable: true,
      cell: (row) => (
        <Link
          className="clinicLink"
          href={
            "https://irannobat.ir/ClinicProfile/" +
            row.EngName.replace(/ /g, "-")
          }
        >
          {row.Name}
        </Link>
      ),
      width: "380px",
    },
    {
      name: "لوگو",
      selector: (row) => row.Logo,
      cell: (row) =>
        row.Logo ? (
          <div className="articleCurrentImg">
            <img
              style={{ width: "35px" }}
              src={"https://irannobat.ir/CenterProfileImage/" + row.Logo}
              alt=""
            />
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
      width: "250px",
    },
    {
      name: "اطلاعات مراکز",
      cell: (row) => {
        const [localSelectedLink, setLocalSelectedLink] = useState(null);

        const onLocalLinkChange = (e) => {
          setLocalSelectedLink(e.value);

          // Set the hidden data in local storage
          localStorage.setItem(
            "hiddenData",
            JSON.stringify({
              name: row.Name,
            })
          );

          router.push({
            pathname: e.value.pathname,
            query: e.value.query,
          });
        };

        const linkOptionTemplate = (option, props) => {
          if (option) {
            return (
              <div className="flex align-items-center height-md">
                <div>{option.label}</div>
                <hr />
              </div>
            );
          }

          return <span>{props.placeholder}</span>;
        };

        const localLinks = [
          {
            label: "پزشکان",
            value: { pathname: "/doctors", query: { id: row._id } },
          },
          {
            label: "کارهای تخصصی",
            value: { pathname: "/specializedWorks", query: { id: row._id } },
          },
          {
            label: "مجوزها",
            value: { pathname: "/certifications", query: { id: row._id } },
          },
          {
            label: "بیماری های خاص",
            value: { pathname: "/specialDiseases", query: { id: row._id } },
          },
          {
            label: "بیمه های تحت پوشش",
            value: { pathname: "/insurances", query: { id: row._id } },
          },
          {
            label: "گالری تصاویر",
            value: { pathname: "/imagesGallery", query: { id: row._id } },
          },
          {
            label: "بخش های مرکز",
            value: { pathname: "/departments", query: { id: row._id } },
          },
          {
            label: "زیربخش های مرکز",
            value: { pathname: "/subDepartments", query: { id: row._id } },
          },
          {
            label: "تلفن های مرکز",
            value: { pathname: "/centerPhoneNumbers", query: { id: row._id } },
          },
        ];

        return (
          <div className="w-50">
            <Dropdown
              value={localSelectedLink}
              options={localLinks}
              onChange={onLocalLinkChange}
              placeholder="انتخاب نمایید"
              optionLabel="label"
              itemTemplate={linkOptionTemplate}
            />
          </div>
        );
      },
      width: "400px",
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
              onClick={() => deActivateCenter(row._id)}
            >
              <Tooltip target=".deActivateBtn">غیر فعال سازی</Tooltip>
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="check-circle"
                />
              </i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger activateBtn"
              type="button"
              data-pr-position="top"
              onClick={() => activateCenter(row._id)}
            >
              <Tooltip target=".activateBtn">فعال سازی</Tooltip>
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="x-circle"
                />
              </i>
            </button>
          )}

          {row.Searchable ? (
            <button
              className="btn btn-sm btn-outline-success font-13 deActivateSearchbtn"
              type="button"
              data-pr-position="top"
              onClick={() => removeSearchableCenter(row._id)}
            >
              <Tooltip target=".deActivateSearchbtn">
                غیر فعال سازی قابلیت جستجو
              </Tooltip>
              <i className="fe fe-search centerTableBtn"></i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger d-flex justify-center align-items-center activateSearchbtn"
              type="button"
              data-pr-position="top"
              onClick={() => setSerachableCenter(row._id)}
            >
              <Tooltip target=".activateSearchbtn">
                فعال سازی قابلیت جستجو
              </Tooltip>
              <i className="fe fe-search centerTableBtn"></i>
            </button>
          )}

          {row.OR ? (
            <button
              className="btn btn-sm btn-outline-success font-13 deActivateReceptionBtn"
              type="button"
              data-pr-position="top"
              onClick={() => deActiveOR(row._id)}
            >
              <Tooltip target=".deActivateReceptionBtn">
                غیر فعال سازی دریافت نوبت
              </Tooltip>
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="calendar"
                />
              </i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger activateReceptionBtn"
              type="button"
              data-pr-position="top"
              onClick={() => activeOR(row._id)}
            >
              <Tooltip target=".activateReceptionBtn">
                فعال سازی دریافت نوبت
              </Tooltip>
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="calendar"
                />
              </i>
            </button>
          )}

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left editBtn"
            data-pr-position="top"
            onClick={() => updateCenterInfo(row, row._id)}
          >
            <Tooltip target=".editBtn">ویرایش</Tooltip>
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
              className="centerTableBtn"
            />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left businessHourBtn"
            onClick={() => openBusinessHoursModal(row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".businessHourBtn">ساعات کاری</Tooltip>
            <FeatherIcon icon="clock" className="centerTableBtn" />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left aboutUsBtn"
            data-pr-position="top"
            onClick={() => openAboutUsModal(row, row._id, row.Name)}
          >
            <Tooltip target=".aboutUsBtn">درباره مرکز</Tooltip>
            <FeatherIcon icon="info" className="centerTableBtn" />
          </button>
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
            paginationDefaultPage={selectedPage}
            onChangePage={(e) => ChangeTablePage(e)}
            paginationPerPage="30"
            paginationRowsPerPageOptions={[30, 50, 70, 100]}
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

export default CentersListTable;
