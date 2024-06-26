import FeatherIcon from "feather-icons-react";
import { Tooltip } from "primereact/tooltip";
import { Modal } from "react-bootstrap";

const ArticleVideosList = ({
  show,
  onHide,
  data,
  openAddArticleVideoModal,
  updateArticleVideo,
  deleteArticleVideo,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="text-secondary font-15 fw-bold">ویدئوهای مقاله</p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="videoModalBody">
        <div className="">
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
                        className="btn btn-sm btn-outline-secondary btn-border-left editVideo"
                        onClick={() =>
                          updateArticleVideo(videoItem, videoItem._id)
                        }
                        data-pr-position="top"
                      >
                        <Tooltip target=".editVideo">ویرایش</Tooltip>
                        <FeatherIcon
                          style={{ width: "14px", height: "14px" }}
                          icon="edit-3"
                        />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger deleteVideo"
                        onClick={() => deleteArticleVideo(videoItem._id)}
                        data-pr-position="top"
                      >
                        <Tooltip target=".deleteVideo">حذف</Tooltip>
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

      </Modal.Body>
    </Modal>
  );
};

export default ArticleVideosList;