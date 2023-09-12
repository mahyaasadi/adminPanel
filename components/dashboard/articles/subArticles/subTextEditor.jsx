import { useEffect } from "react";
import FeatherIcon from "feather-icons-react";
// import EditorNoSSR from "components/commonComponents/textEditor";

const SubTextEditor = ({ data }) => {
  return (
    <>
      <div
        className="modal fade contentmodal"
        id="subTextEditorModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content doctor-profile">
            <div className="modal-header">
              <p className="mb-0 text-secondary font-14 fw-bold">Text Editor</p>
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
              <form>
                <div className="card">
                  <div className="card-body">
                    <div id="subText"></div>
                    {/* <EditorNoSSR data={data?.Text} /> */}
                  </div>
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
    </>
  );
};
export default SubTextEditor;