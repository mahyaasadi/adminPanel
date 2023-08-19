import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import DatePicker from "components/commonComponents/datepicker/DatePicker";
import articleLanguageDataClass from "class/articleLanguageDataClass.js";

const AddArticleModal = ({
  addArticle,
  setArticleDateInDB,
  FUSelectArticleLanguage,
  handleCheckedShowInSlider
}) => {
  // article date
  const setArticleDate = (value) => {
    let articleDate =
      value?.year.toString() + value?.month.toString() + value?.day.toString();

    setArticleDateInDB(articleDate);
  };

  const colourStyles = {
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
    control: (styles) => ({
      ...styles,
      minHeight: 43,
      borderRadius: 20,
      border: "1px solid #E6E9F4",
    }),
  };

  // article img preview
  const displayPreview = (e) => {
    var urlCreator = window.URL || window.webkitURL;
    if (e.target.files.length !== 0) {
      var imageUrl = urlCreator.createObjectURL(e.target.files[0]);
      $("#articleFileUploadPreview").attr("src", imageUrl);
    }
  };

  return (
    <div
      className="modal fade contentmodal"
      id="addArticleModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">افزودن مقاله</p>
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
            <form dir="rtl" onSubmit={addArticle}>
              <div className="row">
                <div className="form-group col">
                  <label className="lblAbs font-12">
                    عنوان <span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <input
                      type="text"
                      name="addArticleTitle"
                      className="form-control floating inputPadding rounded"
                      required
                    />
                  </div>
                </div>

                <div className="form-group col">
                  <label className="lblAbs font-12">
                    عنوان انگلیسی <span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <input
                      type="text"
                      name="addArticleEngName"
                      className="form-control floating inputPadding rounded"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  نویسنده <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addArticleAuthor"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>

              <div className="row media-flex-col">
                <div className="form-group col">
                  <DatePicker setArticleDate={setArticleDate} />
                </div>

                <div className="form-group col">
                  <label className="lblAbs font-12">
                    مدت زمان مطالعه (دقیقه){" "}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <input
                      type="number"
                      name="addArticlePOT"
                      className="form-control floating inputPadding rounded"
                      required
                    />
                  </div>
                </div>

                <div className="form-group col d-flex align-items-center justify-center gap-3">
                  <p className="font-12 mt-1 text-secondary">
                    نمایش در اسلاید <span className="text-danger">*</span>
                  </p>
                  <input
                    type="checkbox"
                    hidden="hidden"
                    id="showInSlider"
                    name="articleShowInSlider"
                    defaultChecked="checked"
                    // required
                    onChange={handleCheckedShowInSlider}
                  />
                  <label
                    className="showInsliderSwitch font-12"
                    htmlFor="showInSlider"
                  ></label>
                </div>
              </div>

              <div className="col media-w-100 font-12">
                <label className="lblDrugIns font-12">
                  زبان مقاله <span className="text-danger">*</span>
                </label>

                <SelectField
                  styles={colourStyles}
                  options={articleLanguageDataClass}
                  errorMessage={""}
                  error={false}
                  label={true}
                  placeholder={"انتخاب کنید"}
                  className="text-center"
                  name="addArticleLanguage"
                  onChangeValue={(value) =>
                    FUSelectArticleLanguage(value?.value)
                  }
                  defaultValue={articleLanguageDataClass[1]}
                  required
                />
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  اسکیما <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <textarea
                    type="text"
                    dir="ltr"
                    name="addArticleSchema"
                    className="form-control floating inputPadding rounded"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">توضیحات</label>
                <div className="col p-0">
                  <textarea
                    type="text"
                    name="addArticleDes"
                    className="form-control floating inputPadding rounded"
                  ></textarea>
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
                  name="addArticleImg"
                  onChange={displayPreview}
                  required
                />
              </div>

              <div className="previewImgContainer">
                <Image
                  src=""
                  alt=""
                  width="200"
                  id="articleFileUploadPreview"
                  className="d-block m-auto previewImg"
                />
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary rounded btn-save"
                >
                  ثبت
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticleModal;
