import { useEffect } from "react";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import DatePicker from "components/commonComponents/datepicker/DatePicker";
import articleLanguageDataClass from "class/articleLanguageDataClass.js";

const EditArticleModal = ({
  data,
  editArticle,
  setArticleDateInDB,
  FUSelectArticleLanguage,
  handleShowInSliderCheckbox,
  handleCheckedSliderOptions,
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
      $("#currentArticleImg").attr("src", imageUrl);
    }
  };

  let languageLabel,
    languageValue = null;
  data.EngArticle
    ? ((languageLabel = "انگلیسی"), (languageValue = 1))
    : ((languageLabel = "فارسی"), (languageValue = 0));

  const selectedArticleLanguage = {
    value: languageValue,
    label: languageLabel,
  };

  // console.log(data);
  useEffect(() => {
    handleShowInSliderCheckbox(data);
  }, [data]);

  return (
    <div
      className="modal fade contentmodal"
      id="editArticleModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
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
            <form onSubmit={editArticle} dir="rtl">
              <div className="row">
                <div className="form-group col">
                  <input
                    type="hidden"
                    className="form-control floating"
                    name="editArticleID"
                    value={data._id}
                  />
                  <label className="lblAbs font-12">
                    عنوان<span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <input
                      className="form-control floating inputPadding rounded"
                      type="text"
                      name="editArticleTitle"
                      defaultValue={data.Title}
                      key={data.Title}
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
                      dir="ltr"
                      className="form-control floating inputPadding rounded"
                      type="text"
                      name="editArticleEngName"
                      defaultValue={data.EngTitle}
                      key={data.EngTitle}
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
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editArticleAuthor"
                    defaultValue={data.Creator}
                    key={data.Creator}
                    required
                  />
                </div>
              </div>

              <div className="row media-flex-col">
                <div className="form-group col">
                  <DatePicker
                    defDate={data.Date}
                    setArticleDate={setArticleDate}
                  />
                </div>

                <div className="form-group col">
                  <label className="lblAbs font-12">
                    مدت زمان مطالعه (دقیقه){" "}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <input
                      type="number"
                      name="editArticlePOT"
                      className="form-control floating inputPadding rounded"
                      defaultValue={data.POT}
                      key={data.POT}
                      required
                    />
                  </div>
                </div>

                <div className="form-group col d-flex align-items-center justify-center gap-3">
                  <p className="font-12 mt-1 text-secondary">نمایش در اسلاید</p>
                  <input
                    type="checkbox"
                    hidden="hidden"
                    id={"editArticleSlider" + data._id}
                    name="editArticleShowInSlider"
                    key={data.ShowInSlider}
                    // defaultValue={data.ShowInSlider}
                    className="showInSliderCheckbox"
                    // required
                    onChange={
                      // (e) => console.log(e.target.checked)
                      handleCheckedSliderOptions
                    }
                  />
                  <label
                    className="showInsliderSwitch font-12"
                    htmlFor={"editArticleSlider" + data._id}
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
                  name="editArticleLanguage"
                  onChangeValue={(value) =>
                    FUSelectArticleLanguage(value?.value)
                  }
                  defaultValue={selectedArticleLanguage}
                  key={data.EngTitle}
                  required
                />
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  توضیحات <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <textarea
                    type="text"
                    name="editArticleDes"
                    defaultValue={data.Des}
                    key={data.Des}
                    className="form-control floating inputPadding rounded"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">اسکیما</label>
                <div className="col p-0">
                  <textarea
                    type="text"
                    dir="ltr"
                    name="editArticleSchema"
                    className="form-control floating inputPadding rounded"
                    defaultValue={data.Schema}
                    key={data.Schema}
                    // required
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
                  name="editArticleImg"
                  onChange={displayPreview}
                  // required
                />
              </div>

              <div
                className="d-flex justify-center mt-4"
                id="currentArticleImgContainer"
              >
                <img
                  src={"https://irannobat.ir/blog/images/" + data.Img}
                  alt="articleImg"
                  style={{
                    width: "20rem !important",
                    height: "auto !important",
                  }}
                  className="articlePreviewImg m-auto d-block"
                  id="currentArticleImg"
                ></img>
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary btn-save rounded"
                >
                  ثبت تغییرات
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticleModal;
