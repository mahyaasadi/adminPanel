import FeatherIcon from "feather-icons-react";

const EditAboutUsModal = ({ data, isLoading, editCenterAboutUs }) => {
  //   const handleStartTime = (e) => {
  //     let index = e.target.id.replace("ST", "");
  //     data[index].Start = e.target.value;
  //   };
  //   const handleEndTime = (e) => {
  //     let index = e.target.id.replace("ET", "");
  //     data[index].End = e.target.value;
  //   };
  //   const handleClosedSwitch = (e) => {
  //     let index = e.target.id.replace("closeCenterSwitch", "");
  //     data[index].Close = !e.target.checked;
  //   };

  return (
    <div
      className="modal fade contentmodal"
      id="editCenterAboutUsModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
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
            <form onSubmit={editCenterAboutUs}>
              <div className="row">
                <div className="form-group">
                  <div className="col p-0">
                      <input
                        type="hidden"
                        name="editCenterAboutUsID"
                        defaultValue={data._id}
                        key={data._id}
                      />

                      <label className="lblAbs font-14">درباره ما</label>
                      <textarea
                        type="text"
                        className="form-control floating inputPadding rounded font-13"
                        name="editAboutUsText"
                        defaultValue={data.AboutUs}
                        key={data.AboutUs}
                      ></textarea>
                  </div>
                </div>
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
                  className="btn btn-primary rounded"
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

export default EditAboutUsModal;
