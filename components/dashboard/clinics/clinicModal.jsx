import { Modal } from "react-bootstrap";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";

const ClinicModal = ({
  mode = "add", // Default is 'add'
  onSubmit,
  data = {},
  isLoading,
  show,
  onHide,
}) => {
  const displayPreview = (e) => {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(e.target.files[0]);
    $("#logoUploadPreview").attr("src", imageUrl);
  };

  const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن مطب";
  const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="mb-0 text-secondary font-14 fw-bold">{modalTitle}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          {mode === "edit" && (
            <input
              type="hidden"
              className="form-control floating"
              name="clinicID"
              value={data._id}
            />
          )}

          <div className="form-group">
            <label className="lblAbs font-12">
              نام مطب <span className="text-danger">*</span>
            </label>
            <div className="col p-0">
              <input
                className="form-control floating inputPadding rounded"
                type="text"
                name="clinicName"
                defaultValue={mode === "edit" ? data.Name : ""}
                key={data.Name}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="lblAbs font-12">شماره تماس رابط</label>
            <div className="col p-0">
              <input
                className="form-control floating inputPadding rounded"
                type="text"
                dir="ltr"
                name="clinicManageTel"
                defaultValue={mode === "edit" ? data.ManageTel : ""}
                key={data.ManageTel}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="lblAbs font-12">تاریخ پایان قرارداد</label>
            <div className="col p-0">
              <input
                className="form-control floating inputPadding rounded"
                type="text"
                dir="ltr"
                name="clinicExpireDate"
                defaultValue={mode === "edit" ? data.ExpireDate : ""}
                key={data.ExpireDate}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="lblAbs font-12">آدرس</label>
            <div className="col p-0">
              <textarea
                className="form-control floating inputPadding rounded"
                type="text"
                name="clinicAddress"
                defaultValue={mode === "edit" ? data.Address : ""}
                key={data.Address}
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
              name="clinicLogo"
              id="clinicLogo"
              onChange={displayPreview}
              key={data.Logo}
              //   required
            />
          </div>

          <div className="previewImgContainer">
            <img
              src={mode === "edit" ? data.Logo : ""}
              alt=""
              width="200"
              id="logoUploadPreview"
              className="d-block m-auto previewImg"
            ></img>
          </div>

          <div className="submit-section">
            {!isLoading ? (
              <button
                type="submit"
                className="btn btn-primary rounded btn-save font-13"
              >
                {submitText}
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary rounded font-13"
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
      </Modal.Body>
    </Modal>
  );
};

export default ClinicModal;
