import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/commonComponents/loading/loading";
import EditorJS from "@editorjs/editorjs";

// const textEditor = new EditorJs("#subText");

const SubArticleTextEditor = ({ data }) => {
  console.log({ data });

  return (
    <div
      className="modal fade contentmodal"
      id="subTextEditorModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
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
            <div className="card">
              <div className="card-body" id="subText">
                {data.Text}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubArticleTextEditor;
