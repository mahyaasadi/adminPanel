import Image from "next/image";
import FeatherIcon from "feather-icons-react";

const AddModalityModal = ({ addModality, isLoading }) => {
  // const displayPreview = (e) => {
  //   var urlCreator = window.URL || window.webkitURL;
  //   var imageUrl = urlCreator.createObjectURL(e.target.files[0]);
  //   $("#modalityIconPreview").attr("src", imageUrl);
  // };

  return (
    <div
      className="modal fade contentmodal"
      id="addModalityModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن بخش
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
            <form onSubmit={addModality} id="frmAddModality">
              <div className="form-group">
                <label className="lblAbs font-12">
                  ID <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    min="1"
                    type="number"
                    name="addModalityID"
                    className="form-control floating inputPadding rounded font-12"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  نام بخش <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addModalityName"
                    className="form-control floating inputPadding rounded font-12"
                    placeholder="مثال: CT"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  نام کامل بخش <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addModalityFullName"
                    className="form-control floating inputPadding rounded font-12"
                    placeholder="مثال: CT Scan"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  نام فارسی بخش <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addModalityPerFullName"
                    className="form-control floating inputPadding rounded font-12"
                    placeholder="مثال: سی تی اسکن"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  آیکون <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addModalityIcon"
                    className="form-control floating inputPadding rounded font-12"
                    placeholder="مثال : CTScan.png"
                    required
                  />
                </div>
              </div>

              <div className="form-group col d-flex flex-col align-items-center justify-center">
                <p className="font-12 mt-2 text-secondary">
                  {" "}
                  فعال / غیر فعال <span className="text-danger">*</span>
                </p>
                <input
                  type="checkbox"
                  hidden="hidden"
                  id="disabledModalityCheckbox"
                  name="modalityDisabledSwitch"
                  // defaultChecked="checked"
                  // required
                />
                <label
                  className="showInsliderSwitch font-12"
                  htmlFor="disabledModalityCheckbox"
                ></label>
              </div>

              {/* <div className="change-photo-btn">
                <div>
                  <i>
                    <FeatherIcon icon="upload" />
                  </i>
                  <p className="font-12">آپلود آیکون</p>
                </div>
                <input
                  type="file"
                  className="upload"
                  name="addModalityIcon"
                  onChange={displayPreview}
                  id="addModalityIcon"
                  required
                />
              </div>

              <div className="previewImgContainer">
                <Image
                  src=""
                  alt=""
                  width="200"
                  id="modalityIconPreview"
                  className="d-block m-auto previewImg"
                />
              </div> */}

              <div className="submit-section">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="btn btn-primary rounded btn-save"
                  >
                    ثبت
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-secondary font-13"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    در حال ثبت
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddModalityModal;
