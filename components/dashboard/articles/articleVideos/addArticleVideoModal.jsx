import { useEffect } from "react";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "@/components/commonComponents/loading/loading";

const AddArticleVideoModal = ({ addVideoToArticle, isLoading }) => {
  // Article Video preview
  const displayVideoPreview = (e) => {
    var urlCreator = window.URL || window.webkitURL;
    if (e.target.files.length !== 0) {
      var videoUrl = urlCreator.createObjectURL(e.target.files[0]);
      $("#ArticleVideoPreview").attr("src", videoUrl);
    }
  };

  useEffect(() => {
    $("#ArticleVideoPreview").hide("");
  }, []);

  return (
    <div
      className="modal fade contentmodal"
      id="addArticleVideoModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              افزودن ویدیو به مقاله
            </p>
            {/* <p>article title</p> */}
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
            <form onSubmit={addVideoToArticle}>
              <div className="form-group col">
                <label className="lblAbs font-12">
                  عنوان <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addVideoTitle"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>

              <div className="change-photo-btn">
                <div>
                  <i>
                    <FeatherIcon icon="upload" />
                  </i>
                  <p>آپلود فایل</p>
                </div>
                <input
                  type="file"
                  className="upload"
                  name="addVideoToArticle"
                  onChange={displayVideoPreview}
                  required
                //   id="addSubArticleImg"
                />
              </div>

              <div className="previewImgContainer">
                <video
                  src=""
                  alt=""
                  width="350"
                  id="ArticleVideoPreview"
                  className="d-block m-auto previewImg"
                  controls
                ></video>
              </div>

              <div className="submit-section">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="btn btn-primary rounded btn-save"
                  >
                    ثبت
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticleVideoModal;
