import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const CentersListTable = ({
  data,
  updateCenterInfo,
  openBusinessHoursModal,
  openAboutUsModal,
  selectedPage,
  ChangeTablePage,
  activeOR,
  deActiveOR,
}) => {
  data?.map((center, index) => {
    data[index].Number = index + 1;
  });

  const columns = [
    {
      name: "ردیف",
      selector: (row) => row.Number,
      sortable: true,
      width: "100px",
    },
    {
      name: "نام مرکز",
      selector: (row) => row.Name,
      sortable: true,
      width: "360px",
    },
    {
      name: "لوگو",
      selector: (row) => row.Logo,
      cell: (row) => (
        <img
          style={{ width: "35px" }}
          src={"https://irannobat.ir/CenterProfileImage/" + row.Logo}
          alt=""
        />
      ),
      width: "160px",
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
              // onClick={() => deActivateUser(row._id)}
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
              // onClick={() => activateUser(row._id)}
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

          {row.OR ? (
            <button
              className="btn btn-sm btn-outline-success font-13"
              type="button"
              onClick={() => deActiveOR(row._id)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="غیر فعال سازی دریافت نوبت"
            >
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
            />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left"
            onClick={() => openBusinessHoursModal(row._id)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="ساعات کاری"
          >
            <FeatherIcon
              icon="clock"
              style={{ width: "16px", height: "16px" }}
            />
          </button>

          <Link
            className="btn btn-sm btn-outline-secondary btn-border-left"
            href={{
              pathname: "/centerPhoneNumbers",
              query: { id: row._id },
            }}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="تلفن های مرکز"
          >
            <FeatherIcon
              icon="phone"
              style={{ width: "16px", height: "16px" }}
            />
          </Link>

          <button
            className="btn btn-sm btn-outline-secondary btn-border-left"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="درباره مرکز"
            onClick={() => openAboutUsModal(row, row._id, row.Name)}
          >
            <FeatherIcon
              icon="info"
              style={{ width: "15px", height: "15px" }}
            />
          </button>

          <Link
            className="btn btn-sm btn-outline-secondary font-13 btn-border-left"
            href={{
              pathname: "/imagesGallery",
              query: { id: row._id },
            }}
          >
            گالری تصاویر
          </Link>
          <Link
            className="btn btn-sm btn-outline-secondary font-13 btn-border-left"
            href={{
              pathname: "/insurances",
              query: { id: row._id },
            }}
          >
            بیمه های تحت پوشش
          </Link>
          <Link
            className="btn btn-sm btn-outline-secondary font-13 btn-border-left"
            href={{
              pathname: "/specialDiseases",
              query: { id: row._id },
            }}
          >
            بیماری های خاص
          </Link>
          <Link
            className="btn btn-sm btn-outline-secondary font-13 btn-border-left"
            href={{
              pathname: "/certifications",
              query: { id: row._id },
            }}
          >
            مجوزها
          </Link>
          <Link
            className="btn btn-sm btn-outline-secondary font-13 btn-border-left"
            href={{
              pathname: "/specializedWorks",
              query: { id: row._id },
            }}
          >
            کارهای تخصصی
          </Link>
          <Link
            className="btn btn-sm btn-outline-secondary font-13 btn-border-left"
            href={{
              pathname: "/doctors",
              query: { id: row._id },
            }}
          >
            پزشکان
          </Link>
          <Link
            className="btn btn-sm btn-outline-primary btn-border-left-primary font-13"
            href={{
              pathname: "/departments",
              query: { id: row._id },
            }}
          >
            انتخاب بخش
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
            // paginationDefaultPage={selectedPage}
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
