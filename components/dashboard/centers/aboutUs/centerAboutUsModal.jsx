import FeatherIcon from "feather-icons-react";
import { Tooltip } from "primereact/tooltip";

const CenterAboutUsModal = ({ data, CenterName, updateAboutUs }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="centerAboutUsModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div className="loeing-header">
              <p className="mb-0 text-secondary font-14 fw-bold">درباره مرکز</p>
              <span className="ServiceName font-13">{CenterName}</span>
            </div>
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
                onClick={() => updateAboutUs(data)}
                className="btn btn-primary font-13 editAboutUs"
              >
                <FeatherIcon icon="edit-3" style={{ width: "16px" }} />
                <Tooltip target=".editAboutUs">ویرایش</Tooltip>
              </button>
            </div>

            <div className="card">
              <div className="card-body">
                <div className=" m-auto">
                  <div className="card-body">
                    <div className="row marginb-md1">{data.AboutUs}</div>
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
export default CenterAboutUsModal;
