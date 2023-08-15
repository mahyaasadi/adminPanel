import { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import EditStateCitySelect from "./editStateCitySelect";

const EditStateModal = ({
  data,
  provinceOptionsList,
  editState,
  FUSelectProvince,
  FUSelectCity,
  cityOptionsList,
  setCityOption,
  setSelectedProvinceList,
  selectedProvinceList,
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

  let selectedProvince = null;
  if (data) {
    selectedProvince = {
      value: data?.ProvinceFin,
      label: data?.Province,
    };
  }

  useEffect(() => {
    setSelectedProvinceList(selectedProvince);

    let findCities = provinceOptionsList.find(
      (x) => x.value === data.ProvinceFin
    );
    if (findCities) setCityOption(findCities.cities);
  }, [data]);

  return (
    <div
      className="modal fade contentmodal"
      id="editStateModal"
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
            <form onSubmit={editState}>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <input type="hidden" value={data._id} name="stateID" />

                    <label className="lblAbs font-12">
                      نام محله <span className="text-danger">*</span>
                    </label>
                    <div className="col p-0">
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="editStateName"
                        defaultValue={data.State}
                        key={data.State}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label className="lblAbs font-12">
                      نام انگلیسی محله <span className="text-danger">*</span>
                    </label>
                    <div className="col p-0">
                      <input
                        dir="ltr"
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="editStateEngName"
                        defaultValue={data.Finglish}
                        key={data.Finglish}
                        required
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
                    id="editSelectStateProvince"
                    options={provinceOptionsList}
                    className="text-center font-12"
                    placeholder={"انتخاب نمایید"}
                    required
                    key={data.Province}
                    defaultValue={selectedProvince}
                    onChangeValue={(value) => FUSelectProvince(value?.value)}
                    onChange={(value) => setCityOption(value.cities)}
                    name="editStateProvince"
                  />
                </div>

                <EditStateCitySelect
                  cityOptionsList={cityOptionsList}
                  FUSelectCity={FUSelectCity}
                  data={data}
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

export default EditStateModal;

