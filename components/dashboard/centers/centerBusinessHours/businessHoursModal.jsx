import Link from "next/link";
import FeatherIcon from "feather-icons-react";

const BusinessHoursModal = ({
  data,
  updateBusinessHour,
  changeToAllDayMode,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="businessHoursModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              ساعات کاری مرکز
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
            <div className="d-flex justify-flex-end gap-1 marginb-1">
              <button
                onClick={() => updateBusinessHour(data)}
                className="btn btn-primary font-13"
              >
                <i className="me-1">
                  <FeatherIcon icon="edit-3" style={{ width: "16px" }} />
                </i>{" "}
                ویرایش
              </button>
              <button
                onClick={() => changeToAllDayMode(data)}
                className="btn btn-primary font-13"
              >
                تبدیل به حالت شبانه روزی
              </button>
            </div>

            <div className="card">
              <div className="card-body">
                <div className=" m-auto">
                  <div className="card-body">
                    <div className="wrapper container">
                      <div className="timeline"></div>
                      {data?.map((item, index) => (
                        <div key={index} className="row marginb-md1">
                          <div
                            className={`col-5 left ${item.Close === "1" || item.Close === true
                                ? "text-danger"
                                : ""
                              }`}
                          >
                            <p>{item.Name}</p>
                          </div>
                          <div className="col-2">
                            <div className="circle"></div>
                          </div>
                          <div
                            className={`col-5 right ${item.Close === "1" || item.Close === true
                                ? "text-danger"
                                : ""
                              }`}
                          >
                            <span dir="ltr" className="">
                              {item.Start ? item.Start : "-- : --"}
                            </span>{" "}
                            تا{" "}
                            <span dir="ltr" className="">
                              {item.End ? item.End : "--  : --"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BusinessHoursModal;

