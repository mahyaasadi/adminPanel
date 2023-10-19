import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const AddTagToArticleModal = ({
  tagOptions,
  FUSelectArticleTag,
  addTagToArticle,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="attachTagModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن تگ به مقاله
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
            <form onSubmit={addTagToArticle}>
              <div className="col media-w-100 font-12">
                <label className="lblDrugIns font-12">
                  تگ <span className="text-danger">*</span>
                </label>
                <SelectField
                  styles={selectfieldColourStyles}
                  options={tagOptions}
                  errorMessage={""}
                  error={false}
                  label={false}
                  placeholder={"انتخاب کنید"}
                  className="text-center"
                  required
                  onChangeValue={(value) => FUSelectArticleTag(value?.value)}
                  //   key={data.Type}
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
export default AddTagToArticleModal;
