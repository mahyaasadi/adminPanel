import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";

const AddPhoneNumberModal = ({
  addPhoneNumber,
  FUSelectPhoneType,
  phoneTypeOptions,
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
      id="addCenterPhoneModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن شماره تلفن مرکز
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
            <form onSubmit={addPhoneNumber}>
              <div className="form-group">
                <label className="lblAbs font-12">
                  شماره تلفن <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addCenterTel"
                    className="form-control floating inputPadding rounded text-center"
                    required
                  />
                </div>
              </div>

              <div className="col media-w-100 font-12">
                <label className="lblDrugIns font-12">
                  نوع شماره <span className="text-danger">*</span>
                </label>
                <SelectField
                  styles={colourStyles}
                  options={phoneTypeOptions}
                  errorMessage={""}
                  error={false}
                  label={false}
                  className="text-center"
                  placeholder={"انتخاب کنید"}
                  onChangeValue={(value) => FUSelectPhoneType(value?.value)}
                  // key={data.Type}
                  required
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

export default AddPhoneNumberModal;
