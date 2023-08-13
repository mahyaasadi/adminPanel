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
      value: data.Province.Finglish,
      label: data.Province.Name,
    };
    let findCities = provinceOptionsList.find(
      (x) => x.value === data.Province.Finglish
    );
    console.log(findCities);
    if (findCities) setCityOption(findCities.cities);
  }

  // console.log(selectedProvince);
  // console.log(data.Logo);

  const displayPreview = (e) => {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(e.target.files[0]);
    $("#currentLogo").attr("src", imageUrl);
    // $("currentLogoContainer").hide();
    // $("#newLogoUploadPreview").attr("src", imageUrl);
    // $("#newLogoUploadPreview").hide();
    // $("#editCenterModal").on("hidden.bs.modal", function () {
    //   $(this).find("#newLogoUploadPreview").trigger("reset");
    // });
  };

  // const hide = ()

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
            <form onSubmit={editCenter}>
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
                        name="editCenterEngName"
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
                    id="editProvinceSelectOptions"
                    options={provinceOptionsList}
                    className="text-center font-12"
                    placeholder={"انتخاب نمایید"}
                    required
                    key={data?.Province}
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
                    name="editCenterDomain"
                    defaultValue={data.Domain}
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
                    name="editCenterLocation"
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
                    name="editCenterDescription"
                    defaultValue={data.ViewDes}
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
                />

                {/* <input
                  type="hidden"
                  className="upload"
                  name="currentLogo"
                  onChange={displayPreview}
                  defaultValue={data.Logo}
                /> */}
              </div>

              <div
                className="d-flex justify-center mt-4"
                id="currentLogoContainer previewImgContainer"
              >
                <img
                  src={"https://irannobat.ir/CenterProfileImage/" + data.Logo}
                  alt="logo"
                  style={{ width: "100px" }}
                  className="previewImg m-auto d-block"
                  id="currentLogo"
                ></img>
              </div>

              <div className="previewImgContainer">
                <Image
                  src=""
                  alt=""
                  width="200"
                  id="newLogoUploadPreview"
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

export default EditCenterModal;
