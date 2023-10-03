import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Dropdown } from 'primereact/dropdown';
import { Tooltip } from 'primereact/tooltip';

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
      width: "320px",
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
            <Tooltip target=".tooltip-button">حذف لوگو</Tooltip>
            <button
              className="btn removeImgBtn tooltip-button"
              type="button"
            // onClick={}
            // data-bs-toggle="tooltip"
            // data-bs-placement="top"
            // title="حذف لوگو"
            >
              <FeatherIcon className="removeLogoBtnIcon" icon="x-circle" />
            </button>
          </div>
        ) : (
          ""
        ),
      width: "130px",
    },
    {
      name: "اطلاعات مراکز",
      cell: (row) => {
        const [localSelectedLink, setLocalSelectedLink] = useState(null);

        const onLocalLinkChange = (e) => {
          setLocalSelectedLink(e.value);

          // Set the hidden data in local storage
          localStorage.setItem('hiddenData', JSON.stringify({
            name: row.Name,
            // ... any other hidden data you wish to send
          }));

          router.push({
            pathname: e.value.pathname,
            query: e.value.query,
          });
        };

        const localLinks = [
          {
            label: 'پزشکان',
            value: { pathname: "/doctors", query: { id: row._id } },
          },
          {
            label: 'کارهای تخصصی',
            value: { pathname: "/specializedWorks", query: { id: row._id } }
          },
          {
            label: 'مجوزها',
            value: { pathname: "/certifications", query: { id: row._id } },
          },
          {
            label: 'بیماری های خاص',
            value: { pathname: "/specialDiseases", query: { id: row._id } }
          },
          {
            label: 'بیمه های تحت پوشش',
            value: { pathname: "/insurances", query: { id: row._id } }
          },
          {
            label: 'گالری تصاویر',
            value: { pathname: "/imagesGallery", query: { id: row._id } }
          },
          {
            label: 'بخش های مرکز',
            value: { pathname: "/departments", query: { id: row._id } },

          },
          {
            label: 'زیربخش های مرکز',
            value: { pathname: "/subDepartments", query: { id: row._id } }
          },
          {
            label: 'تلفن های مرکز',
            value: { pathname: "/centerPhoneNumbers", query: { id: row._id } },
          },
        ];

        return (
          <div>
            <Dropdown
              value={localSelectedLink}
              options={localLinks}
              onChange={onLocalLinkChange}
              placeholder="انتخاب نمایید"
              optionLabel="label"
            />
          </div>
        );
      },
      width: "250px",
    },
    {
      name: "عملیات ها",
      selector: (row) => row.action,
      cell: (row) => (
        <div className="actions d-flex gap-1">
          {!row.Deactive ? (
            <button
              className="btn btn-sm btn-outline-success font-13"
              type="button"
              onClick={() => deActivateCenter(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="غیر فعال سازی"
            >
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="check-circle"
                />
              </i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              onClick={() => activateCenter(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="فعال سازی"
            >
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
              className="btn btn-sm btn-outline-success font-13"
              type="button"
              onClick={() => removeSearchableCenter(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="غیر فعال سازی قابلیت جستجو"
            >
              <i className="fe fe-search centerTableBtn"></i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger d-flex justify-center align-items-center"
              type="button"
              onClick={() => setSerachableCenter(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="فعال سازی قابلیت جستجو"
            >
              <i className="fe fe-search centerTableBtn"></i>
            </button>
          )}

          {row.OR ? (

            <button
              className="btn btn-sm btn-outline-success font-13 tooltip-but"
              type="button"
              onClick={() => deActiveOR(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="غیر فعال سازی دریافت نوبت"
            >
              <Tooltip target=".tooltip-but">تتتت</Tooltip>
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="calendar"
                />
              </i>
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger"
              type="button"
              onClick={() => activeOR(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="فعال سازی دریافت نوبت"
            >
              <i className="d-flex align-items-center gap-3">
                <FeatherIcon
                  style={{ width: "16px", height: "16px" }}
                  icon="calendar"
                />
              </i>
            </button>
          )}

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left"
            href="#"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="ویرایش"
            onClick={() => updateCenterInfo(row, row._id)}
          >
            <FeatherIcon
              icon="edit-3"
              style={{ width: "16px", height: "16px" }}
              className="centerTableBtn"
            />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left"
            onClick={() => openBusinessHoursModal(row._id)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="ساعات کاری"
          >
            <FeatherIcon icon="clock" className="centerTableBtn" />
          </button>

          {/* <Link
            className="btn btn-sm btn-outline-secondary btn-border-left"
            href={{
              pathname: "/centerPhoneNumbers",
              query: { id: row._id },
            }}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="تلفن های مرکز"
          >
          </Link> */}

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="درباره مرکز"
            onClick={() => openAboutUsModal(row, row._id, row.Name)}
          >
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
            paginationPerPage="20"
            paginationRowsPerPageOptions={[20, 30, 40, 50]}
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