import { useEffect } from "react";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";

const EditSubArticleModal = ({
  data,
  editSubArticle,
  handleCallToActionSwitch,
  handleCheckedCallToActionOptions,
  isLoading,
}) => {
  //   subArticle img preview
  const displayPreview = (e) => {
    var urlCreator = window.URL || window.webkitURL;
    if (e.target.files.length !== 0) {
      var imageUrl = urlCreator.createObjectURL(e.target.files[0]);
      $("#currentSubArticleImg").attr("src", imageUrl);
    }
  };

  useEffect(() => {
    handleCallToActionSwitch(data);
  }, [data]);

  return (
    <div
      className="modal fade contentmodal"
      id="editSubArticleModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              ویرایش اطلاعات
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
          <div className="modal-body centerModalBody">
            <form dir="rtl" onSubmit={editSubArticle}>
              <div className="row">
                <div className="form-group col">
                  <input
                    type="hidden"
                    name="editSubArticleID"
                    value={data._id}
                  />

                  <label className="lblAbs font-12">عنوان</label>
                  <div className="col p-0">
                    <input
                      className="form-control floating inputPadding rounded"
                      type="text"
                      name="editSubArticleTitle"
                      defaultValue={data.Title}
                      key={data.Title}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group col">
                <label className="lblAbs font-12">توضیحات</label>
                <div className="col p-0">
                  <textarea
                    dir="ltr"
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editSubArticleDes"
                    defaultValue={data.Des}
                    key={data.Des}
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">متن</label>
                <div className="col p-0">
                  <textarea
                    type="text"
                    name="editSubArticleText"
                    defaultValue={data.Text}
                    key={data.Text}
                    className="form-control floating inputPadding rounded"
                  ></textarea>
                </div>
              </div>

              <div className="change-photo-btn">
                <div>
                  <i>
                    <FeatherIcon icon="upload" />
                  </i>
                  <p>آپلود تصویر جدید</p>
                </div>

                <input
                  type="file"
                  className="upload"
                  name="editSubArticleImg"
                  onChange={displayPreview}
                  defaultValue={data.Image}
                  key={data.Image}
                  id="editSubArticleImg"
                  // required
                  // id="SubArticleImg"
                />

                {/* Img variations */}
                <input
                  type="hidden"
                  defaultValue={data.Img}
                  key={data.Img}
                  name="defaultSubArticleImg"
                />
                <input
                  type="hidden"
                  defaultValue={data.ImgMed}
                  key={data.ImgMed}
                  name="defaultSubArticleImgMed"
                />
                <input
                  type="hidden"
                  defaultValue={data.ImgThumb}
                  key={data.ImgThumb}
                  name="defaultSubArticleImgThumb"
                />
                <input
                  type="hidden"
                  defaultValue={data.WImg}
                  key={data.WImg}
                  name="defaultSubArticleWImg"
                />
                <input
                  type="hidden"
                  defaultValue={data.WImgMed}
                  key={data.WImgMed}
                  name="defaultSubArticleWImgMed"
                />
                <input
                  type="hidden"
                  defaultValue={data.WImgThumb}
                  key={data.WImgThumb}
                  name="defaultSubArticleWImgThumb"
                />
              </div>

              <div
                className="d-flex justify-center mt-4"
                id="currentArticleImgContainer"
              >
                {data.Img ? (
                  <div className="articleCurrentImg">
                    <img
                      src={"https://irannobat.ir/blog/images/" + data.Img}
                      alt="articleImg"
                      style={{
                        width: "20rem !important",
                        height: "auto !important",
                      }}
                      className="articlePreviewImg m-auto d-block"
                      id="currentSubArticleImg"
                    ></img>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group col d-flex align-items-center justify-center gap-3 margint-2">
                <p className="font-12 mt-2 text-secondary">Call To Action</p>
                <input
                  type="checkbox"
                  hidden="hidden"
                  id={"editSubArticleCallToAction" + data._id}
                  name="editSubArticleCallToAction"
                  key={data.CallToAction}
                  className="callToActionCheckbox"
                  onChange={handleCheckedCallToActionOptions}
                />
                <label
                  className="showInsliderSwitch font-12"
                  htmlFor={"editSubArticleCallToAction" + data._id}
                ></label>
              </div>

              <div className="submit-section">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="btn btn-primary btn-save rounded"
                  >
                    ثبت تغییرات
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

export default EditSubArticleModal;
