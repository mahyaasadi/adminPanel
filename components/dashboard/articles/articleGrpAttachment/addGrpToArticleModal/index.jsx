import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";

const AddGroupToArticleModal = ({
  grpOptions,
  FUSelectArticleGroup,
  addGrpToArticle,
}) => {
  const colourStyles = {
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
    control: (styles) => ({
      ...styles,
      minHeight: 43,
      borderRadius: 20,
      border: "1px solid #E6E9F4",
    }),
  };
  return (
    <div
      className="modal fade contentmodal"
      id="attachGrpModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن گروه به مقاله
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
            <form onSubmit={addGrpToArticle}>
              <div className="col media-w-100 font-12">
                <label className="lblDrugIns font-12">
                  گروه <span className="text-danger">*</span>
                </label>
                <SelectField
                  styles={colourStyles}
                  options={grpOptions}
                  errorMessage={""}
                  error={false}
                  label={false}
                  placeholder={"انتخاب کنید"}
                  className="text-center"
                  required
                  onChangeValue={(value) => FUSelectArticleGroup(value?.value)}
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
export default AddGroupToArticleModal;