import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import StateCitySelect from "./stateCitySelect";

const AddStateModal = ({
  addNewState,
  provinceOptionsList,
  FUSelectProvince,
  FUSelectCity,
  setCityOption,
  cityOptionsList,
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

  console.log(provinceOptionsList);

  return (
    <div
      className="modal fade contentmodal"
      id="addStateModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن محله
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
            <form onSubmit={addNewState} id="frmAddPhysician">
              <div className="row">
                <div className="form-group col">
                  <label className="lblAbs font-12">
                    نام محله<span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <input
                      type="text"
                      name="addStateName"
                      className="form-control floating inputPadding rounded"
                      required
                    />
                  </div>
                </div>

                <div className="form-group col">
                  <label className="lblAbs font-12">نام انگلیسی محله</label>
                  <div className="col p-0">
                    <input
                      dir="ltr"
                      type="text"
                      name="addStateEngName"
                      className="form-control floating inputPadding rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col media-w-100">
                  <label className="lblDrugIns font-12">
                    استان <span className="text-danger">*</span>
                  </label>
                  <SelectField
                    styles={colourStyles}
                    id="ProvinceSelectOptions"
                    options={provinceOptionsList}
                    className="text-center font-12"
                    placeholder={"انتخاب نمایید"}
                    required
                    onChangeValue={(value) => FUSelectProvince(value?.value)}
                    onChange={(value) => setCityOption(value.cities)}
                    name="addCenterProvince"
                  />
                </div>

                <StateCitySelect
                  cityOptionsList={cityOptionsList}
                  FUSelectCity={FUSelectCity}
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
export default AddStateModal;
