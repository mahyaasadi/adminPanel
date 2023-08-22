import Link from "next/link";
import FeatherIcon from "feather-icons-react";

const ArticleVideosModal = ({
  data,
  openAddArticleVideoModal,
  updateArticleVideo,
  deleteArticleVideo,
}) => {
  return (
    <>
      <div
        className="modal fade contentmodal"
        id="articleVideosModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header padding-r-30">
              <div className="loeing-header">
                <p className="text-secondary font-15 fw-bold">ویدئوهای مقاله</p>
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

            <div className="modal-body videoModalBody">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <button
                    onClick={() => openAddArticleVideoModal()}
                    className="btn btn-primary btn-add font-14"
                  >
                    <i className="me-1">
                      <FeatherIcon icon="plus-square" />
                    </i>{" "}
                    افزودن ویدیو
                  </button>
                </div>
              </div>
              <div dir="rtl" className="row mt-4">
                {data?.map((videoItem, index) => (
                  <div className="col-6" key={index}>
                    <div className="card">
                      <div className="card-body ">
                        <div className="d-flex flex-col">
                          <div className="col-12">
                            <video
                              src={
                                "https://irannobat.ir/blog/videos/" +
                                videoItem.Name
                              }
                              width="100%"
                              height="200"
                              controls
                            ></video>
                          </div>

                          <div className="px-4">
                            <p className="py-1 mt-2 text-secondary font-14 fw-bold">
                              عنوان : {videoItem.Title}
                            </p>
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
                            onClick={() =>
                              updateArticleVideo(videoItem, videoItem._id)
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
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="حذف"
                            onClick={() => deleteArticleVideo(videoItem._id)}
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
    </>
  );
};

export default ArticleVideosModal;

