import Link from "next/link";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";

const SubArticlesModal = ({
  data,
  openAddSubArticleModal,
  ActiveArticleID,
  deleteSubArticle,
  updateSubArticle,
}) => {
  // console.log("subData", data);
  return (
    <div
      className="modal fade contentmodal"
      id="subArticlesModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">زیر مقاله ها</p>
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
          <div className="modal-body centerModalBody">
            <div dir="rtl" className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <button
                  onClick={() => openAddSubArticleModal(ActiveArticleID)}
                  className="btn btn-primary btn-add font-13"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  افزودن زیر مقاله
                </button>
              </div>
            </div>

            <div className="mt-4">
              {data?.map((subArticle, index) => (
                <div className="col" key={index}>
                  <div className="card marginb-sm">
                    <div className="card-body">
                      <div className="row px-4 subArticleDetailsBox">
                        <div className="subArticleImgContainer">
                          <img
                            className="w-60 rounded-md subArticleImg"
                            src={
                              "https://irannobat.ir/blog/images/" +
                              subArticle.Img
                            }
                            alt="subArticleImg"
                          ></img>
                        </div>
                        <div className="subArticleDetails">
                          <p className="py-1 font-16 mt-2 fw-bold">
                            عنوان : {subArticle?.Title ? subArticle.Title : "-"}
                          </p>
                          <div className="pb-2 font-12 text-secondary">
                            <p>
                              توضیحات :{" "}
                              {subArticle?.Des
                                ? subArticle?.Des.substr(0, 50) + " ..."
                                : "-"}
                            </p>
                            <p>
                              متن :{" "}
                              {subArticle?.Text
                                ? subArticle?.Text.substr(0, 50) + " ..."
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <hr />

                      <div
                        className="d-flex justify-flex-end gap-1"
                        id="infoContainer"
                        dir="rtl"
                      >
                        <button
                          button="button"
                          className="btn btn-sm btn-outline-secondary btn-border-left"
                          // onClick={() =>
                          //   updateSubArticle(subArticle, subArticle._id)
                          // }
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="ویرایشگر متن"
                        >
                          <FeatherIcon
                            style={{ width: "14px", height: "14px" }}
                            icon="type"
                          />
                        </button>
                        <button
                          button="button"
                          className="btn btn-sm btn-outline-secondary btn-border-left"
                          onClick={() =>
                            updateSubArticle(subArticle, subArticle._id)
                          }
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="ویرایش"
                        >
                          <FeatherIcon
                            style={{ width: "14px", height: "14px" }}
                            icon="edit-3"
                          />
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteSubArticle(subArticle._id)}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="حذف"
                        >
                          <FeatherIcon
                            style={{ width: "14px", height: "14px" }}
                            icon="trash-2"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubArticlesModal;
