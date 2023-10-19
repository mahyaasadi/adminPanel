import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const EditPhoneNumberModal = ({
  editPhoneNumber,
  data,
  phoneTypeOptions,
  FUSelectPhoneType,
}) => {
  const selectedPhoneType = { value: data.Type, label: data.Type };

  return (
    <div
      className="modal fade contentmodal"
      id="editCenterPhoneModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
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
          <div className="modal-body">
            <form onSubmit={editPhoneNumber}>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="editCenterPhoneeID"
                  value={data._id}
                />

                <label className="lblAbs font-12">
                  شماره مرکز <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded text-center"
                  type="text"
                  name="editCenterPhoneNumber"
                  defaultValue={data.Text}
                  key={data.Text}
                  required
                />
              </div>

              <div className="col media-w-100 font-12">
                <label className="lblDrugIns font-12">
                  نوع بیمه<span className="text-danger">*</span>
                </label>
                <SelectField
                  styles={selectfieldColourStyles}
                  options={phoneTypeOptions}
                  errorMessage={""}
                  error={false}
                  label={false}
                  name="editPhoneType"
                  className="text-center"
                  required
                  onChangeValue={(value) => FUSelectPhoneType(value?.value)}
                  defaultValue={selectedPhoneType}
                  key={data.Type}
                />
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
export default EditPhoneNumberModal;
