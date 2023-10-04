import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";
import { Tooltip } from "primereact/tooltip";

const FAQListTableModal = ({
  data,
  articleTitle,
  openAddFAQModal,
  removeFAQFromArticle,
  ActiveArticleID,
  updateFAQ,
}) => {
  const columns = [
    {
      name: "پرسش",
      selector: (row) => row.Qu,
      sortable: true,
      width: "auto",
    },
    {
      name: "پاسخ",
      selector: (row) => (row.Ans ? row.Ans.substr(0, 40) + " ..." : "-"),
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
            className="btn btn-sm btn-outline-danger padding-sm deleteFaq"
            onClick={() => removeFAQFromArticle(ActiveArticleID, row._id)}
            data-pr-position="top"
          >
            <Tooltip target=".deleteFaq">حذف</Tooltip>
            <FeatherIcon
              icon="trash-2"
              style={{ width: "14px", height: "14px" }}
            />
          </button>

          <button
            className="btn btn-sm btn-outline-secondary padding-sm editFaq"
            onClick={() => updateFAQ(ActiveArticleID, row)}
            data-pr-position="top"
          >
            <Tooltip target=".editFaq">ویرایش</Tooltip>
            <FeatherIcon
              icon="edit-3"
              style={{ width: "14px", height: "14px" }}
            />
          </button>
        </div>
      ),
      width: "120px",
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
        id="FAQListModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <div className="loeing-header">
                <span className="ServiceName font-13 px-2">
                  سوالات متداول مربوط به مقاله
                  {/* articleTitle */}
                </span>
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
                <button
                  className="btn btn-primary font-14"
                  onClick={openAddFAQModal}
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  افزودن
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
                      customStyles={tableCustomStyles}
                      noDataComponent={
                        <div style={{ padding: "24px", fontSize: "13px" }}>
                          موردی برای نمایش وجود ندارد.
                        </div>
                      }
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

export default FAQListTableModal;

// if (typeof document !== "undefined") {
//   const accordionItemHeaders = document.querySelectorAll(
//     ".accordion-item-header"
//   );
//   accordionItemHeaders.forEach((accordionItemHeader) => {
//     accordionItemHeader.addEventListener("click", (event) => {
//       const currentlyActiveAccordionItemHeader = document.querySelector(
//         ".accordion-item-header.active"
//       );
//       console.log("clicked");
//       if (
//         currentlyActiveAccordionItemHeader &&
//         currentlyActiveAccordionItemHeader !== accordionItemHeader
//       ) {
//         currentlyActiveAccordionItemHeader.classList.toggle("active");
//         currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
//       }
//       accordionItemHeader.classList.toggle("active");
//       const accordionItemBody = accordionItemHeader.nextElementSibling;
//       if (accordionItemHeader.classList.contains("active")) {
//         accordionItemBody.style.maxHeight =
//           accordionItemBody.scrollHeight + "px";
//       } else {
//         accordionItemBody.style.maxHeight = 0;
//       }
//     });
//   });
// }

//  return (
//    <>
//      <div
//        className="modal fade contentmodal"
//        id="FAQListModal"
//        tabIndex="-1"
//        aria-hidden="true"
//      >
//        <div className="modal-dialog modal-dialog-centered modal-lg">
//          <div className="modal-content">
//            <div className="modal-header">
//              <div className="loeing-header px-2">
//                <p className="ServiceName font-13">
//                  سوالات متداول مربوط به مقاله
//                </p>
//                <p className="text-secondary font-13">{articleTitle}</p>
//              </div>
//              <button
//                type="button"
//                className="close-btn"
//                data-bs-dismiss="modal"
//                aria-label="Close"
//              >
//                <i>
//                  <FeatherIcon icon="x-circle" />
//                </i>
//              </button>
//            </div>

//            <div className="modal-body">
//              <div className="addLoeing-btn">
//                <button
//                  className="btn btn-primary font-14"
//                  onClick={openAddFAQModal}
//                >
//                  <i className="me-1">
//                    <FeatherIcon icon="plus-square" />
//                  </i>{" "}
//                  افزودن
//                </button>
//              </div>

//              {data?.map((item, index) => (
//                <div key={index} className="accordion">
//                  <div className="accordion-item">
//                    <div className="accordion-item-header justify-between">
//                      {item.Qu}
//                      {/* <Link
//                 //           href="#"
//                 //           className="btn btn-sm padding-sm btn-outline-secondary"
//                 //           // onClick={() => removeGrpFromArticle(row)}
//                 //         >
//                 //           <FeatherIcon
//                 //             icon="edit-3"
//                 //             style={{ width: "13px", height: "13px" }}
//                 //           />
//                 //         </Link>
//                 //         <Link
//                 //           href="#"
//                 //           className="btn btn-sm padding-sm btn-outline-danger"
//                 //           // onClick={() => removeGrpFromArticle(row._id)}
//                 //         >
//                 //           <FeatherIcon
//                 //             icon="trash-2"
//                 //             style={{ width: "13px", height: "13px" }}
//                 //           />
//                 //         </Link> */}
//                    </div>
//                    <div className="accordion-item-body">
//                      <div className="accordion-item-body-content">
//                        {item.Ans}
//                      </div>
//                    </div>
//                  </div>
//                </div>
//              ))}
//            </div>
//          </div>
//        </div>
//      </div>
//    </>
//  );
