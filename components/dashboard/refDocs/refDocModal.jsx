import { Modal } from "react-bootstrap";

const RefDocModal = ({
  mode = "add", // Default is 'add'
  onSubmit,
  data = {},
  isLoading,
  show,
  onHide,
}) => {
  const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "اضافه کردن پزشک";
  const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";
  return (
    <Modal show={show} onHide={onHide} centered>
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
              name="refDocID"
              value={data._id}
            />
          )}

          <div className="form-group">
            <label className="lblAbs font-12">
              شناسه <span className="text-danger">*</span>
            </label>
            <div className="col p-0">
              <input
                className="form-control floating inputPadding rounded"
                type="text"
                name="MSID"
                defaultValue={mode === "edit" ? data.MSID : ""}
                key={data.MSID}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="lblAbs font-12">
              نام پزشک <span className="text-danger">*</span>
            </label>
            <div className="col p-0">
              <input
                className="form-control floating inputPadding rounded"
                type="text"
                name="refDocFullName"
                defaultValue={mode === "edit" ? data.FullName : ""}
                key={data.FullName}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="lblAbs font-12">
              تخصص <span className="text-danger">*</span>
            </label>
            <div className="col p-0">
              <input
                className="form-control floating inputPadding rounded"
                type="text"
                name="refDocExpertise"
                defaultValue={mode === "edit" ? data.Expertise : ""}
                key={data.Expertise}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="lblAbs font-12">شماره تماس</label>
            <div className="col p-0">
              <input
                className="form-control floating inputPadding rounded"
                type="text"
                dir="ltr"
                name="refDocTel"
                defaultValue={mode === "edit" ? data.Tel : ""}
                key={data.Tel}
                // required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="lblAbs font-12">آدرس</label>
            <div className="col p-0">
              <textarea
                className="form-control floating inputPadding rounded"
                type="text"
                name="refDocAddress"
                defaultValue={mode === "edit" ? data.Address : ""}
                key={data.Address}
                // required
              ></textarea>
            </div>
          </div>

          <div className="form-group">
            <label className="lblAbs font-12">لوکیشن</label>
            <div className="col p-0">
              <input
                className="form-control floating inputPadding rounded"
                type="text"
                dir="ltr"
                name="refDocLocation"
                defaultValue={mode === "edit" ? data.Location : ""}
                key={data.Location}
                // required
              />
            </div>
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

export default RefDocModal;

