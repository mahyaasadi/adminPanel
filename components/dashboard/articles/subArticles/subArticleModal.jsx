import FeatherIcon from "feather-icons-react";
import { Tooltip } from "primereact/tooltip";

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
  const MoveToUp = (id) => {
    let index = data.findIndex((x) => x._id === id);

    if (index !== 0) {
      let ParentIndex = index - 1;
      let thisIndexData = data[index];
      let ParentIndexData = data[ParentIndex];
      data[index] = ParentIndexData;
      data[ParentIndex] = thisIndexData;

      let thisElement = $("#CardContent" + id);
      let parentElement = $("#CardContent" + ParentIndexData._id);
      $("#Card" + index).html(parentElement);
      $("#Card" + ParentIndex).html(thisElement);
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
      let inferiorElement = $("#CardContent" + InferiorIndexData?._id);
      $("#Card" + index).html(inferiorElement);
      $("#Card" + InferiorIndex).html(thisElement);
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
                          <div className="subArticleImgContainer articleCurrentImg">
                            <img
                              className="w-50 btn-rounded-md subArticleImg"
                              src={
                                "https://irannobat.ir/blog/images/" +
                                subArticle.Img
                              }
                              alt="subArticleImg"
                            ></img>
                            <button
                              className="btn removeImgBtn"
                              type="button"
                              data-pr-position="top"
                              // onClick={}
                            >
                              <Tooltip target=".removeImgBtn">
                                حذف تصویر
                              </Tooltip>
                              <FeatherIcon
                                className="removeImgBtnIcon"
                                icon="x-circle"
                              />
                            </button>
                          </div>
                        ) : (
                          <div className="w-25"></div>
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
                            className="btn btn-sm btn-outline-secondary btn-border-left textEditor"
                            onClick={() => openSubTextEditor(subArticle)}
                            data-pr-position="top"
                          >
                            <Tooltip target=".textEditor">ویرایشگر متن</Tooltip>
                            <FeatherIcon
                              style={{ width: "14px", height: "14px" }}
                              icon="type"
                            />
                          </button>
                          <button
                            button="button"
                            className="btn btn-sm btn-outline-secondary btn-border-left editSub"
                            onClick={() =>
                              updateSubArticle(subArticle, subArticle._id)
                            }
                            data-pr-position="top"
                          >
                            <Tooltip target=".editSub">ویرایش</Tooltip>
                            <FeatherIcon
                              style={{ width: "14px", height: "14px" }}
                              icon="edit-3"
                            />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger deleteSub"
                            onClick={() => deleteSubArticle(subArticle._id)}
                            data-pr-position="top"
                          >
                            <Tooltip target=".deleteSub">حذف</Tooltip>
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
                            className="btn btn-sm btn-outline-primary moveUp"
                            onClick={() => MoveToUp(subArticle._id)}
                            data-pr-position="top"
                          >
                            <Tooltip target=".moveUp">انتقال به بالا</Tooltip>
                            <FeatherIcon
                              style={{ width: "14px", height: "14px" }}
                              icon="arrow-up"
                            />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary float-start moveDown"
                            onClick={() => MoveToDown(subArticle._id)}
                            data-pr-position="top"
                          >
                            <Tooltip target=".moveDown">
                              انتقال به پایین
                            </Tooltip>

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
