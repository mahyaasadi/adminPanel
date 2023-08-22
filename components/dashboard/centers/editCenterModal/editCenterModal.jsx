import { useState, useEffect } from "react";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import EditCitySelect from "./editCitySelect";

const EditCenterModal = ({
  data,
  editCenter,
  provinceOptionsList,
  FUSelectProvince,
  FUSelectCity,
  setCityOption,
  cityOptionsList,
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
  if (data.Province) {
    selectedProvince = {
      value: data?.Province?.Finglish,
      label: data?.Province?.Name,
    };
  }
  // console.log(selectedProvince);

  useEffect(() => {
    setSelectedProvinceList(selectedProvince);
    // console.log(selectedProvinceList);

    let findCities = provinceOptionsList.find(
      (x) => x.value === data.Province.Finglish
    );
    // console.log(findCities);

    if (findCities) setCityOption(findCities.cities);
  }, [data]);

  const displayPreview = (e) => {
    var urlCreator = window.URL || window.webkitURL;
    if (e.target.files.length !== 0) {
      var imageUrl = urlCreator.createObjectURL(e.target.files[0]);
      $("#currentLogo").attr("src", imageUrl);
    }
  };

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
          <div className="modal-body centerModalBody">
            <form onSubmit={editCenter} dir="rtl">
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
                        name="editCenterName"
                        defaultValue={data.Name}
                        key={data.Name}
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
                        dir="ltr"
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="editCenterEngName"
                        defaultValue={data.EngName}
                        key={data.EngName}
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
                    id="editProvinceSelectOptions"
                    options={provinceOptionsList}
                    className="text-center font-12"
                    placeholder={"انتخاب نمایید"}
                    required
                    key={data.Province?.Name}
                    defaultValue={selectedProvince}
                    onChangeValue={(value) => FUSelectProvince(value?.value)}
                    onChange={(value) => setCityOption(value.cities)}
                    name="editCenterProvince"
                  />
                </div>

                <EditCitySelect
                  cityOptionsList={cityOptionsList}
                  FUSelectCity={FUSelectCity}
                  data={data}
                />
              </div>

              <div className="form-group mt-2">
                <label className="lblAbs font-12">
                  آدرس <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <textarea
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editCenterAddress"
                    defaultValue={data.Address}
                    key={data.Address}
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
                    dir="ltr"
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editCenterDomain"
                    defaultValue={data.Domain}
                    required
                    key={data.Domain}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">لوکیشن</label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editCenterLocation"
                    defaultValue={data.Loc}
                    key={data.loc}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">توضیحات</label>
                <div className="col p-0">
                  <textarea
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editCenterDescription"
                    defaultValue={data.ViewDes}
                    key={data.ViewDes}
                  ></textarea>
                </div>
              </div>

              <div className="change-photo-btn">
                <div>
                  <i className="">
                    <FeatherIcon icon="upload" />
                  </i>
                  <p>آپلود لوگوی جدید</p>
                </div>
                <input
                  type="file"
                  className="upload"
                  name="editLogo"
                  onChange={displayPreview}
                  key={data.Logo}
                />
              </div>

              <div
                className="d-flex justify-center mt-4"
                id="currentLogoContainer"
              >
                <img
                  src={"https://irannobat.ir/CenterProfileImage/" + data.Logo}
                  alt="logo"
                  style={{ width: "130px" }}
                  className="previewImg m-auto d-block"
                  id="currentLogo"
                ></img>
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary rounded btn-save mt-4"
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
