import Link from "next/link";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";

const SubArticlesModal = ({
  data,
  openAddSubArticleModal,
  ActiveArticleID,
  deleteSubArticle,
  updateSubArticle,
  updateSubDataOrder,
  isLoading,
  openSubTextEditor,
}) => {
  console.log("subData", data);

  const Router = useRouter();

  const MoveToUp = (id) => {
    let index = data.findIndex((x) => x._id === id);

    if (index !== 0) {
      let ParentIndex = index - 1;
      let thisIndexData = data[index];
      let ParentIndexData = data[ParentIndex];
      data[index] = ParentIndexData;
      data[ParentIndex] = thisIndexData;

      let thisElement = $("#CardContent" + id);
      console.log(thisElement);
      let parentElement = $("#CardContent" + ParentIndexData._id);
      $("#Card" + index).html(parentElement);
      $("#Card" + ParentIndex).html(thisElement);
      // console.log(data);
    }
  };

  const MoveToDown = (id) => {
    let index = data.findIndex((x) => x._id === id);

    if (index !== data.length - 1) {
      let InferiorIndex = index + 1;
      let thisIndexData = data[index];
      let InferiorIndexData = data[InferiorIndex];
      data[index] = InferiorIndexData;
      data[InferiorIndex] = thisIndexData;

      let thisElement = $("#CardContent" + id);
      console.log(thisElement);
      let inferiorElement = $("#CardContent" + InferiorIndexData?._id);
      $("#Card" + index).html(inferiorElement);
      $("#Card" + InferiorIndex).html(thisElement);
      // console.log(data);
    }
  };

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
              <div className="col-md-12 d-flex justify-content-end gap-1">
                {!isLoading ? (
                  <button
                    type="button"
                    className="btn btn-secondary font-13"
                    onClick={updateSubDataOrder}
                  >
                    <i className="me-1">
                      <FeatherIcon icon="menu" />
                    </i>{" "}
                    ترتیب زیر مقالات
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-secondary font-13"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    در حال ثبت
                  </button>
                )}

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
                <div id={"Card" + index} className="col sub" key={index}>
                  <div
                    className="card marginb-sm"
                    id={"CardContent" + subArticle._id}
                  >
                    <div className="card-body">
                      <div className="row px-4 subArticleDetailsBox">
                        {subArticle.Img ? (
                          <div className="subArticleImgContainer">
                            <img
                              className="w-50 rounded-md subArticleImg"
                              src={
                                "https://irannobat.ir/blog/images/" +
                                subArticle.Img
                              }
                              alt="subArticleImg"
                            ></img>
                          </div>
                        ) : (
                          <div className="w-25"></div>
                          // ""
                        )}

                        <div className="subArticleDetails">
                          {subArticle.Title ? (
                            <p className="py-1 font-16 mt-2 fw-bold">
                              عنوان : {subArticle.Title}
                            </p>
                          ) : (
                            ""
                          )}
                          <div className="pb-2 font-12 text-secondary">
                            {subArticle.Des ? (
                              <p>
                                توضیحات :{" "}
                                {subArticle.Des.substr(0, 50) + " ..."}
                              </p>
                            ) : (
                              ""
                            )}
                            <p>
                              متن :{" "}
                              {subArticle?.Text
                                ? subArticle.Text.substr(0, 50) + " ..."
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div
                          className="d-flex justify-flex-end gap-1 col-md-9"
                          id="infoContainer"
                          dir="rtl"
                        >
                          <button
                            button="button"
                            className="btn btn-sm btn-outline-secondary btn-border-left"
                            onClick={() => openSubTextEditor(subArticle)}
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
                        <div
                          className="d-flex justify-flex-start gap-1 col-md-3"
                          id="infoContainer"
                          dir="rtl"
                        >
                          <button
                            type="button"
                            id={"BtnMoveUp" + index}
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => MoveToUp(subArticle._id)}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="جا به جایی به بالا"
                          >
                            <FeatherIcon
                              style={{ width: "14px", height: "14px" }}
                              icon="arrow-up"
                            />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary float-start"
                            onClick={() => MoveToDown(subArticle._id)}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="جا به جایی به پایین"
                          >
                            <FeatherIcon
                              style={{ width: "14px", height: "14px" }}
                              icon="arrow-down"
                            />
                          </button>
                        </div>
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
