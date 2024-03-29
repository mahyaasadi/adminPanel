import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const AddInsuranceModal = ({
  data,
  addInsurance,
  insuranceType,
  insuranceStatus,
  FUSelectInsuranceType,
  FUSelectInsuranceStatus,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addInsuranceModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن بیمه
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
            <form onSubmit={addInsurance}>
              <div className="form-group">
                <label className="lblAbs font-12">
                  نام بیمه <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="text"
                  name="addInsuranceName"
                  required
                />
              </div>

              <div className="col media-w-100 font-12">
                <label className="lblDrugIns font-12">
                  نوع بیمه<span className="text-danger">*</span>
                </label>
                <SelectField
                  styles={selectfieldColourStyles}
                  className="text-center"
                  options={insuranceType}
                  errorMessage={""}
                  error={false}
                  label={false}
                  placeholder={"نوع بیمه را انتخاب کنید"}
                  required
                  onChangeValue={(value) => FUSelectInsuranceType(value?.value)}
                  key={data.Type}
                />
              </div>

              <div className="col media-w-100 font-12">
                <label className="lblDrugIns font-12">
                  وضعیت بیمه<span className="text-danger">*</span>
                </label>
                <SelectField
                  styles={selectfieldColourStyles}
                  options={insuranceStatus}
                  className="text-center"
                  errorMessage={""}
                  error={false}
                  label={false}
                  placeholder={"وضعیت بیمه را انتخاب کنید"}
                  required
                  onChangeValue={(value) =>
                    FUSelectInsuranceStatus(value?.value)
                  }
                  key={data.Status}
                />
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary btn-save rounded"
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
export default AddInsuranceModal;
