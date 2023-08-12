import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import CitySelect from "../addCenterModal/citySelect";

const EditCenterModal = ({ data }) => {
  const colourStyles = {
    menu: (provided) => ({ ...provided, zIndex: 9999 }),
    control: (styles) => ({
      ...styles,
      minHeight: 43,
      borderRadius: 20,
      border: "1px solid #E6E9F4",
    }),
  };

  //   for (let i = 0; i < data.length; i++) {
  //     const selectedProvince = {
  //       value: data.Province.Finglish,
  //       label: data.Province.Name,
  //     };
  //   }

  console.log(data);

  return (
    <div
      className="modal fade contentmodal"
      id="editCenterModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
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
            <form>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <input type="hidden" value={data._id} name="centerID" />

                    <label className="lblAbs font-12">
                      نام مرکز <span className="text-danger">*</span>
                    </label>
                    <div className="col p-0">
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        // name="addCenterName"
                        defaultValue={data.Name}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label className="lblAbs font-12">نام انگلیسی</label>
                    <div className="col p-0">
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        // name="addCenterEngName"
                        defaultValue={data.EngName}
                      />
                    </div>
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
                    // id="ProvinceSelectOptions"
                    // options={provinceOptionsList}
                    className="text-center font-12"
                    placeholder={"انتخاب نمایید"}
                    required
                    // defaultValue={selectedProvince}
                    // onChangeValue={(value) => FUSelectProvince(value?.value)}
                    // onChange={(value) => setCityOption(value.cities)}
                    name="addCenterProvince"
                  />
                </div>

                {/* <CitySelect
                  cityOptionsList={cityOptionsList}
                  FUSelectCity={FUSelectCity}
                /> */}
              </div>

              <div className="form-group mt-2">
                <label className="lblAbs font-12">
                  آدرس <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <textarea
                    className="form-control floating inputPadding rounded"
                    type="text"
                    // name="addCenterAddress"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  Domain <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    // name="addCenterDomain"
                    defaultValue={data.Domain ? data.Domain : "-"}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">لوکیشن</label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    // name="addCenterLocation"
                    defaultValue={data.Loc}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">مشخصات</label>
                <div className="col p-0">
                  <textarea
                    className="form-control floating inputPadding rounded"
                    type="text"
                    // name="addCenterDescription"
                    defaultValue={data.ViewDes}
                  ></textarea>
                </div>
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

export default EditCenterModal;
