import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const AddRelatedArticleModal = ({
  relatedArticleOptions,
  FUSelectRelatedArticle,
  addRelatedArticle,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="attachRelatedArticle"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن مقاله مرتبط
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
            <form onSubmit={addRelatedArticle}>
              <div className="col media-w-100 font-12">
                <label className="lblDrugIns font-12">
                  مقاله مرتبط <span className="text-danger">*</span>
                </label>
                <SelectField
                  styles={selectfieldColourStyles}
                  options={relatedArticleOptions}
                  errorMessage={""}
                  error={false}
                  label={false}
                  placeholder={"انتخاب کنید"}
                  className="text-center"
                  required
                  onChangeValue={(value) =>
                    FUSelectRelatedArticle(value?.value)
                  }
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

export default AddRelatedArticleModal;
