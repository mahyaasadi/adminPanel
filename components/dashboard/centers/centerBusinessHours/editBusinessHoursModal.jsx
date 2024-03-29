import FeatherIcon from "feather-icons-react";

const EditBusinessHourModal = ({ data, editBusinessHours, isLoading }) => {
  const handleStartTime = (e) => {
    let index = e.target.id.replace("ST", "");
    data[index].Start = e.target.value;
  };
  const handleEndTime = (e) => {
    let index = e.target.id.replace("ET", "");
    data[index].End = e.target.value;
  };
  const handleClosedSwitch = (e) => {
    let index = e.target.id.replace("closeCenterSwitch", "");
    data[index].Close = !e.target.checked;
  };

  return (
    <div
      className="modal fade contentmodal"
      id="editCenterBusinessHourModal"
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
            <form onSubmit={editBusinessHours}>
              <div className="row">
                <div className="col p-0">
                  {data.empty !== 1
                    ? data.map((item, index) => (
                      <div key={index} className="row marginb-sm">
                        <div className="col-sm-3 col-12">
                          <input
                            type="hidden"
                            name="editDayInWeekNumber"
                            defaultValue={item.Number}
                            key={item.Number}
                          />

                          <input
                            type="text"
                            id={item.Number}
                            defaultValue={item.Name}
                            key={item.Name}
                            className="form-control floating inputPadding rounded text-center font-12"
                            required
                            readOnly
                          />
                        </div>

                        <div className="col-sm-3 col-6 sm-mt-1">
                          <label className="lblAbs font-12">
                            ساعت شروع
                          </label>
                          <input
                            type="text"
                            dir="ltr"
                            id={"ST" + index}
                            onChange={handleStartTime}
                            defaultValue={item.Start}
                            key={item.Start}
                            placeholder="00:00"
                            className="form-control floating inputPadding rounded text-center font-12"
                          />
                        </div>

                        <div className="col-sm-3 col-6 sm-mt-1">
                          <label className="lblAbs font-12">
                            ساعت پایان
                          </label>
                          <input
                            type="text"
                            dir="ltr"
                            id={"ET" + index}
                            onChange={handleEndTime}
                            defaultValue={item.End}
                            key={item.End}
                            placeholder="00:00"
                            className="form-control floating inputPadding rounded text-center font-12"
                          />
                        </div>

                        <div className="col-sm-3">
                          <div className="form-group d-flex align-items-center justify-center gap-3">
                            <input
                              type="checkbox"
                              hidden="hidden"
                              id={"closeCenterSwitch" + index}
                              name="switchCloseCenter"
                              key={item.Close}
                              className="switchCloseCenter"
                              defaultChecked={item.Close ? "" : "checked"}
                              onChange={handleClosedSwitch}
                            />
                            <label
                              className="showInsliderSwitch mt-2"
                              htmlFor={"closeCenterSwitch" + index}
                            ></label>
                            <p className="text-secondary font-11 d-flex align-items-center justify-center">
                              باز / بسته
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                    : ""}
                </div>
              </div>

              <div className="submit-section mt-0">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary btn-save rounded font-13"
                  >
                    ثبت تغییرات
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary rounded"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm me-2 font-13"
                      role="status"
                    ></span>
                    در حال ثبت
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  );
};

export default EditBusinessHourModal;

