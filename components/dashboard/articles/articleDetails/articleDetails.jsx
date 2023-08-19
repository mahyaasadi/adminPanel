import Link from "next/link";
import FeatherIcon from "feather-icons-react";

const ArticleDetails = ({ data }) => {
  const dateFormat = (str) => {
    if (str !== "" || str !== null) {
      let date =
        str?.substr(0, 4) + "/" + str?.substr(4, 1) + "/" + str?.substr(5, 6);
      return date;
    } else {
      return 0;
    }
  };

  return (
    <div
      className="modal fade contentmodal"
      id="articleDetailsModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <div className="loeing-header">
              <p className="mb-1 font-16 fw-bold">جزییات مقاله</p>
              <p className="font-16 text-secondary">{data.Title}</p>
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
            <div className="descriptionContent">
              {/* description */}
              <div className="descriptionText">
                <p>عنوان انگلیسی : {data.EngTitle}</p>
                <p>نویسنده : {data.Creator}</p>
                <p>تاریخ ثبت : {dateFormat(data.Date)}</p>
                <p>زبان مقاله : {data.EngArticle ? "فارسی" : "انگلیسی"}</p>
                <p>مدت زمان مطالعه : {data.POT} دقیقه</p>

                <div className="w-100 d-flex justify-center">
                  <hr className="w-85" />
                </div>

                <p>توضیحات : {data.Des}</p>
              </div>

              <div className="desVerticalLine"></div>

              {/* modalPhoto */}
              <div className="descriptionImg">
                <img
                  src={"https://irannobat.ir/blog/images/" + data.Img}
                  className="w-100 rounded-md"
                  alt="articleImage"
                />

                <div className="desFullArticle">مشاهده کامل مقاله</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;

