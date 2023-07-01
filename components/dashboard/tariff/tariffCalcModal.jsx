import FeatherIcon from "feather-icons-react";
import SelectField from "components/commonComponents/selectfield";
import Select from "react-select";
import Link from "next/link";

const TariffCalcModal = ({ data, applyKCalculations }) => {
  const calculationOptions = [
    { value: "basedOnGovTariff", label: "اعمال بر تعرفه دولتی" },
    { value: "basedOnPrivateTariff", label: "اعمال بر تعرفه خصوصی" },
  ];

  return (
    <>
      <div
        className="modal fade contentmodal"
        id="tariffCalcModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="mb-0">اعمال محاسبات</h3>
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
              <div className="card-header tariffCalcModal">
                <ul
                  role="tablist"
                  className="nav nav-tabs card-header-tabs float-right"
                >
                  <li className="nav-item">
                    <a
                      href="#tab-1"
                      data-bs-toggle="tab"
                      className="nav-link active"
                    >
                      محاسبه بر اساس K
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#tab-2" data-bs-toggle="tab" className="nav-link">
                      محاسبه بر اساس مبلغ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#tab-3" data-bs-toggle="tab" className="nav-link">
                      محاسبه بر اساس درصد
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card-body pt-4">
                {/* tab-1 */}
                <div className="tab-content pt-0">
                  <div
                    role="tabpanel"
                    id="tab-1"
                    className="tab-pane fade show active"
                  >
                    <form
                      className="tariffCalcForm"
                      onSubmit={applyKCalculations}
                    >
                      <div className="form-group form-focus w-50">
                        <input
                          type="hidden"
                          className="form-control floating"
                          required
                          name="serviceId"
                          key={data._id}
                          defaultValue={data._id}
                        />

                        <input
                          type="number"
                          className="form-control floating"
                          required
                          name="pkf"
                        />
                        <label className="focus-label">
                          K فنی-خصوصی <span className="text-danger">*</span>
                        </label>
                      </div>

                      <div className="form-group form-focus w-50">
                        <input
                          type="number"
                          className="form-control floating"
                          required
                          name="pkh"
                        />
                        <label className="focus-label">
                          K حرفه ای-خصوصی <span className="text-danger">*</span>
                        </label>
                      </div>

                      <div className="form-group form-focus w-50">
                        <input
                          type="number"
                          className="form-control floating"
                          required
                          name="gkf"
                        />
                        <label className="focus-label">
                          K فنی-دولتی <span className="text-danger">*</span>
                        </label>
                      </div>

                      <div className="form-group form-focus w-50">
                        <input
                          type="number"
                          className="form-control floating"
                          required
                          name="gkh"
                        />
                        <label className="focus-label">
                          K حرفه ای-دولتی <span className="text-danger">*</span>
                        </label>
                      </div>

                      <div className="submit-section calcSubmit-btn">
                        <button
                          type="submit"
                          className="btn btn-primary btn-save mt-4"
                        >
                          ثبت
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* tab-2 */}
                  <div role="tabpanel" id="tab-2" className="tab-pane fade">
                    <form className="tariffCalcForm">
                      <div className="form-group form-focus w-50">
                        <input
                          type="text"
                          className="form-control floating"
                          required
                          name=""
                          placeholder="مبلغ مورد نظر را وارد نمایید"
                        />
                        <label className="focus-label">
                          مبلغ<span className="text-danger">*</span>
                        </label>

                        <Select
                          className="select mt-3"
                          // onChange={(e) => setSelectedDuration(e.value)}
                          options={calculationOptions}
                          required
                          placeholder="روش اعمال"
                          id="long-value-select"
                          instanceId="long-value-select"
                        />
                      </div>

                      <div className="submit-section calcSubmit-btn">
                        <button
                          type="submit"
                          className="btn btn-primary btn-save mt-4"
                        >
                          ثبت
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* tab-3 */}
                  <div role="tabpanel" id="tab-3" className="tab-pane fade">
                    <form className="tariffCalcForm">
                      <div className="form-group form-focus w-50">
                        <input
                          type="text"
                          className="form-control floating"
                          required
                          name=""
                          placeholder="درصد مورد نظر را وارد نمایید"
                        />
                        <label className="focus-label">
                          درصد<span className="text-danger">*</span>
                        </label>

                        <Select
                          className="select mt-3"
                          // onChange={(e) => setSelectedDuration(e.value)}
                          options={calculationOptions}
                          placeholder="روش اعمال"
                          required
                          id="long-value-select"
                          instanceId="long-value-select"
                        />
                      </div>

                      <div className="submit-section calcSubmit-btn">
                        <button
                          type="submit"
                          className="btn btn-primary btn-save mt-4"
                        >
                          ثبت
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TariffCalcModal;