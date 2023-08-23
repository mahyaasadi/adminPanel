import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import CitySelect from "./citySelect";

const AddCenterModal = ({
  addCenter,
  provinceOptionsList,
  FUSelectProvince,
  FUSelectCity,
  setCityOption,
  cityOptionsList,
  defaultData,
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

  const displayPreview = (e) => {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(e.target.files[0]);
    $("#logoUploadPreview").attr("src", imageUrl);
  };

  // console.log(defaultData);
  return (
    <div
      className="modal fade contentmodal"
      id="addCenterModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">مرکز جدید</p>
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
            <form onSubmit={addCenter} id="frmAddCenter" dir="rtl">
              <input type="hidden" value={defaultData?._id} name="CenterID" />
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="lblAbs font-12">
                      نام مرکز <span className="text-danger">*</span>
                    </label>
                    <div className="col p-0">
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="addCenterName"
                        required
                        // defaultValue={defaultData?.Name}
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
                        name="addCenterEngName"
                        // defaultValue={defaultData?.EngName}
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

                <CitySelect
                  cityOptionsList={cityOptionsList}
                  FUSelectCity={FUSelectCity}
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
                    name="addCenterAddress"
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
                    type="text"
                    className="form-control floating inputPadding rounded"
                    name="addCenterDomain"
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
                    name="addCenterLocation"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">درباره ما</label>
                <div className="col p-0">
                  <textarea
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="addCenterDescription"
                  ></textarea>
                </div>
              </div>

              <div className="change-photo-btn">
                <div>
                  <i>
                    <FeatherIcon icon="upload" />
                  </i>
                  <p>آپلود لوگو</p>
                </div>
                <input
                  type="file"
                  className="upload"
                  name="logo"
                  onChange={displayPreview}
                  required
                />
              </div>

              <div className="previewImgContainer">
                <Image
                  src=""
                  alt=""
                  width="200"
                  id="logoUploadPreview"
                  className="d-block m-auto previewImg"
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
export default AddCenterModal;
