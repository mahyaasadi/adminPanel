import { useEffect } from "react";
import FeatherIcon from "feather-icons-react";

const EditModalityModal = ({
  data,
  editModality,
  isLoading,
  handleDisabledSwitch,
  handleCheckedDisabledModality,
}) => {
  // const displayPreview = (e) => {
  //   var urlCreator = window.URL || window.webkitURL;
  //   if (e.target.files.length !== 0) {
  //     var imageUrl = urlCreator.createObjectURL(e.target.files[0]);
  //     $("#currentModalityIcon").attr("src", imageUrl);
  //   }
  // };

  useEffect(() => {
    handleDisabledSwitch(data);
  }, [data]);

  return (
    <div
      className="modal fade contentmodal"
      id="editModalityModal"
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
            <form onSubmit={editModality}>
              <div className="form-group">
                <label className="lblAbs font-12">
                  ID <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control floating inputPadding rounded"
                  name="editModalityID"
                  defaultValue={data._id}
                  key={data._id}
                  required
                />
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  عنوان <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded font-13"
                    type="text"
                    name="editModalityName"
                    defaultValue={data.Modality}
                    key={data.Modality}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  عنوان کامل <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded font-13"
                    type="text"
                    name="editModalityFullName"
                    defaultValue={data.FullName}
                    key={data.FullName}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  عنوان فارسی <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded font-13"
                    type="text"
                    name="editModalityPerFullName"
                    defaultValue={data.PerFullName}
                    key={data.PerFullName}
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
                    className="form-control floating inputPadding rounded font-12"
                    name="editModalityIcon"
                    defaultValue={data.Icon}
                    key={data.Icon}
                  />
                </div>
              </div>

              {/* <div className="change-photo-btn">
                <div>
                  <i className="">
                    <FeatherIcon icon="upload" />
                  </i>
                  <p>آپلود آیکون جدید</p>
                </div>
                <input
                  type="file"
                  className="upload"
                  name="editModalityIcon"
                  onChange={displayPreview}
                  key={data.Icon}
                />
              </div>
              <div
                className="d-flex justify-center mt-4"
                id="currentLogoContainer"
              >
                <img
                  src={"https://irannobat.ir/admin/assets/img/" + data.Icon}
                  alt="logo"
                  style={{ width: "130px" }}
                  className="previewImg m-auto d-block"
                  id="currentModalityIcon"
                ></img>
              </div> */}

              <div className="form-group col d-flex flex-col align-items-center justify-center mt-4">
                <p className="font-12 mt-2 text-secondary">
                  {" "}
                  فعال / غیر فعال <span className="text-danger">*</span>
                </p>
                <input
                  type="checkbox"
                  hidden="hidden"
                  id={"editDisabledModalityCheckbox" + data._id}
                  name="editModalityDisabledSwitch"
                  key={data.Disabled}
                  className="editModalityDisabledCheckbox"
                  onChange={handleCheckedDisabledModality}
                  required
                />
                <label
                  className="showInsliderSwitch font-12"
                  htmlFor={"editDisabledModalityCheckbox" + data._id}
                ></label>
              </div>

              <div className="submit-section">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="btn btn-primary btn-save rounded"
                  >
                    ثبت تغییرات
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

export default EditModalityModal;
