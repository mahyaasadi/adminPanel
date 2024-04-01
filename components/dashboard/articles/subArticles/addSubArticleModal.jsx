import Image from "next/image";
import FeatherIcon from "feather-icons-react";

const AddSubArticleModal = ({ addSubArticle, isLoading }) => {
  // subArticle img preview
  const displayPreview = (e) => {
    var urlCreator = window.URL || window.webkitURL;
    if (e.target.files.length !== 0) {
      var imageUrl = urlCreator.createObjectURL(e.target.files[0]);
      $("#subArticleImgPreview").attr("src", imageUrl);
    }
  };

  return (
    <div
      className="modal fade contentmodal"
      id="addSubArticleModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              افزودن زیر مقاله
            </p>
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
            <form onSubmit={addSubArticle}>
              <div className="form-group col">
                <label className="lblAbs font-12">عنوان</label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addSubArticleTitle"
                    className="form-control floating inputPadding rounded"
                  // required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">متن</label>
                <div className="col p-0">
                  <textarea
                    type="text"
                    name="addSubArticleText"
                    className="form-control floating inputPadding rounded"
                    rows="10"
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">توضیحات</label>
                <div className="col p-0">
                  <textarea
                    type="text"
                    name="addSubArticleDes"
                    className="form-control floating inputPadding rounded"
                  ></textarea>
                </div>
              </div>

              <div className="change-photo-btn">
                <div>
                  <i>
                    <FeatherIcon icon="upload" />
                  </i>
                  <p>آپلود تصویر</p>
                </div>
                <input
                  type="file"
                  className="upload"
                  name="addSubArticleImg"
                  onChange={displayPreview}
                  id="addSubArticleImg"
                />
              </div>

              <div className="previewImgContainer">
                <Image
                  src=""
                  alt=""
                  width="200"
                  id="subArticleImgPreview"
                  className="d-block m-auto previewImg"
                />
              </div>

              <div className="form-group col d-flex align-items-center justify-center gap-3">
                <p className="font-12 mt-2 text-secondary">Call To Action</p>
                <input
                  type="checkbox"
                  hidden="hidden"
                  id="articleCallToAction"
                  name="articleCallToAction"
                />
                <label
                  className="showInsliderSwitch font-12"
                  htmlFor="articleCallToAction"
                ></label>
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

export default AddSubArticleModal;
