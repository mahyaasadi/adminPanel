import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { tableCustomStyles } from "components/commonComponents/customTableStyle/tableStyle.jsx";

const FAQListTableModal = ({ data, articleTitle, openAddFAQModal }) => {
  const accordionItemHeaders = document.querySelectorAll(
    ".accordion-item-header"
  );

  accordionItemHeaders.forEach((accordionItemHeader) => {
    accordionItemHeader.addEventListener("click", (event) => {
      const currentlyActiveAccordionItemHeader = document.querySelector(
        ".accordion-item-header.active"
      );

      if (
        currentlyActiveAccordionItemHeader &&
        currentlyActiveAccordionItemHeader !== accordionItemHeader
      ) {
        currentlyActiveAccordionItemHeader.classList.toggle("active");
        currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
      }

      accordionItemHeader.classList.toggle("active");
      const accordionItemBody = accordionItemHeader.nextElementSibling;

      if (accordionItemHeader.classList.contains("active")) {
        accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
      } else {
        accordionItemBody.style.maxHeight = 0;
      }
    });
  });
  return (
    <>
      <div
        className="modal fade contentmodal"
        id="FAQListModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="loeing-header px-2">
                <p className="ServiceName font-13">
                  سوالات متداول مربوط به مقاله
                </p>
                <p className="text-secondary font-12">
                  {articleTitle}
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

              {/*  */}
              {data?.map((item, index) => (
                <div key={index} class="accordion">
                <div class="accordion-item">
                  <div class="accordion-item-header justify-between">
                    {item.Qu}
                    <div className="d-flex gap-1">
                      <Link
                        href="#"
                        className="btn btn-sm padding-sm btn-outline-secondary"
                      // onClick={() => removeGrpFromArticle(row)}
                      >
                        <FeatherIcon
                          icon="edit-3"
                          style={{ width: "13px", height: "13px" }}
                        />
                      </Link>
                      <Link
                        href="#"
                        className="btn btn-sm padding-sm btn-outline-danger"
                      // onClick={() => removeGrpFromArticle(row._id)}
                      >
                        <FeatherIcon
                          icon="trash-2"
                          style={{ width: "13px", height: "13px" }}
                        />
                      </Link>
                    </div>

                  </div>
                  <div class="accordion-item-body">
                    <div class="accordion-item-body-content">
                      {item.Ans}
                    </div>
                  </div>
                </div>
              </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default FAQListTableModal;


// {
//   const columns = [
//     {
//       name: "عنوان",
//       selector: (row) => row.FAQ?.Qu,
//       sortable: true,
//       width: "auto",
//     },
//     {
//       name: "عملیات ها",
//       selector: (row) => row.action,
//       sortable: true,
//       cell: (row) => (
//         <div className="actions d-flex gap-1">
//           <button
//             className="btn btn-sm btn-outline-danger"
//             data-bs-toggle="tooltip"
//             data-bs-placement="top"
//             title="حذف"
//             // onClick={() => removeGrpFromArticle(row._id)}
//           >
//             <FeatherIcon
//               icon="trash-2"
//               style={{ width: "16px", height: "16px" }}
//             />
//           </button>
//         </div>
//       ),
//       width: "120px",
//     },
//   ];

//   const tableData = {
//     columns,
//     data,
//   };

//   return (
//     <>
//       <div
//         className="modal fade contentmodal"
//         id="grpAttachmentModal"
//         tabIndex="-1"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered modal-lg">
//           <div className="modal-content">
//             <div className="modal-header">
//               <div className="loeing-header">
//                 <span className="ServiceName font-13 px-2">
//                   سوالات متداول مربوط به مقاله
//                   {/* articleTitle */}
//                 </span>
//               </div>
//               <button
//                 type="button"
//                 className="close-btn"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               >
//                 <i>
//                   <FeatherIcon icon="x-circle" />
//                 </i>
//               </button>
//             </div>

//             <div className="modal-body">
//               <div className="addLoeing-btn">
//                 <button
//                   className="btn btn-primary font-14"
//                   //   onClick={openAttachGrpModal}
//                 >
//                   <i className="me-1">
//                     <FeatherIcon icon="plus-square" />
//                   </i>{" "}
//                   افزودن
//                 </button>
//               </div>

//               <div className="card-body p-4">
//                 <div className="table-responsive">
//                   <DataTableExtensions {...tableData}>
//                     <DataTable
//                       noHeader
//                       defaultSortField="id"
//                       pagination
//                       highlightOnHover
//                       defaultSortAsc={false}
//                       customStyles={tableCustomStyles}
//                     />
//                   </DataTableExtensions>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };