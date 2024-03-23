import { useState, useRef } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { Dropdown } from "primereact/dropdown";
import FeatherIcon from "feather-icons-react";
import { WarningAlert } from "class/AlertManage";
import { styleLinkOptions } from "class/staticDropdownOptions";
import { displayToastMessages } from "utils/toastMessageGenerator";

export const getServerSideProps = async ({ req, res }) => {
  const result = getSession(req, res);

  if (result) {
    const { UserData } = result;
    return { props: { UserData } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
};

const StyleLinkCreator = ({ UserData }) => {
  const toast = useRef(null);

  const [linkQty, setLinkQty] = useState(1);
  const [linkData, setLinkData] = useState([{ linkHref: "", anchorText: "" }]);
  const [defaultStyle, setDefaultStyle] = useState(null);
  const [linksUpperTitle, setLinksUpperTitle] = useState(null);
  const [generatedHTML, setGeneratedHTML] = useState("");

  const findSelectedStyleLbl = styleLinkOptions.find(
    (x) => x.value === defaultStyle
  );

  const handleLinkQtyChange = (e) => {
    const newQty = parseInt(e.target.value);
    setLinkQty(newQty);

    // Preserve existing values
    setLinkData((prevLinkData) => {
      const newLinkData = [...prevLinkData];
      if (newLinkData.length < newQty) {
        for (let i = newLinkData.length; i < newQty; i++) {
          newLinkData.push({ linkHref: "", anchorText: "" });
        }
      } else if (newLinkData.length > newQty) {
        // Remove excess elements
        newLinkData.splice(newQty);
      }
      return newLinkData;
    });
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinkData = [...linkData];
    updatedLinkData[index][field] = value;
    setLinkData(updatedLinkData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let html = null;

    if (!findSelectedStyleLbl) {
      WarningAlert("", "استایل مورد نظر را انتخاب نمایید!");
    } else {
      if (findSelectedStyleLbl?.label === "style1") {
        html = `<div class="row justify-center gap-md w-100">${linkData
          .map(
            (link, index) =>
              `<div class='col linkContainer'><a class='btn w-100 linkStyle' href='${link.linkHref}' target='_blank'>${link.anchorText}</a></div>`
          )
          .join("")}</div>`;
      } else if (findSelectedStyleLbl?.label === "style2") {
        html = `<div class="blockQuoteContainer"><p class="blockQuoteTitle">${linksUpperTitle}</p>${linkData
          .map(
            (link, index) =>
              `<div><a href=${link.linkHref} target="_blank" class="linkStyle2">${link.anchorText}</a></div>`
          )
          .join("")}</div>`;
      } else {
        html = `<div class="row justify-center">${linkData
          .map(
            (link, index) =>
              `<div class='col d-flex justify-center'><svg id="stroke" xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs><path id="line" d="M2 2c49.7 2.6 100 3.1 150 1.7-46.5 2-93 4.4-139.2 7.3 45.2-1.5 90.6-1.8 135.8-.6" fill="none" strokeLinecap="round" strokeLinejoin="round" vector-effect="non-scaling-stroke" /></defs></svg><a target="_blank" class="style3btn" href='${link.linkHref}' >${link.anchorText}<svg class="button-stroke" viewBox="0 0 154 13"><use href="#line"></use></svg><svg class="button-stroke" viewBox="0 0 154 13"><use href="#line"></use></svg></a></div>`
          )
          .join("")}</div>`;
      }

      setGeneratedHTML(html);
    }
  };

  const handleReset = () => {
    setGeneratedHTML("");
    setDefaultStyle(null);
    setLinkQty(1);
    setLinksUpperTitle(null);
    setLinkData([]);
  };

  const copyText = () => {
    if (generatedHTML) {
      navigator.clipboard.writeText(generatedHTML);
      displayToastMessages([], toast, "متن با موفقیت کپی گردید!");
    }
  };

  return (
    <>
      <Head>
        <title>لینک سازی داخلی</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Toast ref={toast} />

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="d-flex dashboard-header justify-between align-items-center mt-3 px-4">
                  <div className="text-secondary fw-bold font-15">لینک ساز</div>

                  <div className="d-flex justify-end gap-1 align-items-center">
                    <button
                      type="submit"
                      className="btn btn-primary rounded px-5 font-14"
                    >
                      ثبت
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-outline-secondary rounded px-4 font-14"
                    >
                      تنظیم مجدد
                    </button>
                  </div>
                </div>

                <div className="row px-4 mt-4">
                  <div className="form-group col-md-3 col-12">
                    <label className="lblAbs font-12">تعداد لینک ها</label>
                    <div className="col p-0">
                      <input
                        type="number"
                        min={1}
                        defaultValue={1}
                        value={linkQty}
                        onChange={handleLinkQtyChange}
                        name="linkQty"
                        className="form-control floating inputPadding rounded"
                      />
                    </div>
                  </div>

                  <div className="form-group col-md-9 col-12">
                    <label className="lblAbs font-12">
                      استایل پیش فرض <span className="text-danger">*</span>{" "}
                    </label>
                    <Dropdown
                      value={defaultStyle}
                      onChange={(e) => setDefaultStyle(e.value)}
                      options={styleLinkOptions}
                      optionLabel="label"
                      placeholder="انتخاب نمایید"
                      showClear
                    />
                  </div>
                </div>

                <div className="px-4">
                  {linkData?.map((link, index) => (
                    <div className="row" key={index}>
                      <div className="form-group col-md-6 col-12">
                        <label className="lblAbs font-12">
                          لینک {index + 1}
                        </label>
                        <div className="col p-0">
                          <input
                            dir="ltr"
                            type="text"
                            value={link.linkHref}
                            onChange={(e) =>
                              handleLinkChange(
                                index,
                                "linkHref",
                                e.target.value
                              )
                            }
                            className="form-control floating inputPadding rounded"
                          />
                        </div>
                      </div>

                      <div className="form-group col-md-6 col-12">
                        <label className="lblAbs font-12">
                          متن قابل مشاهده لینک {index + 1}
                        </label>
                        <div className="col p-0">
                          <input
                            type="text"
                            value={link?.anchorText}
                            onChange={(e) =>
                              handleLinkChange(
                                index,
                                "anchorText",
                                e.target.value
                              )
                            }
                            className="form-control floating inputPadding rounded"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {findSelectedStyleLbl?.label == "style2" && (
                  <div className="form-group col-12 px-4">
                    <label className="lblAbs font-12">تیتر بالای لینک ها</label>
                    <div className="col p-0">
                      <input
                        type="text"
                        value={linksUpperTitle}
                        onChange={(e) => setLinksUpperTitle(e.target.value)}
                        name="linksUpperTitle"
                        className="form-control floating inputPadding rounded"
                      />
                    </div>
                  </div>
                )}

                {findSelectedStyleLbl?.label === "style1" && (
                  <>
                    <p className="text-secondary font-14 fw-bold px-4">
                      پیش نمایش
                    </p>
                    <hr className="mt-0 mb-4" />

                    <div className="d-flex justify-center px-4 my-4">
                      <div className="row gap-md justify-center w-100">
                        {linkData?.map((link, index) => (
                          <div key={index} className="linkContainer col">
                            <a
                              className="btn w-100 linkStyle"
                              href={link?.linkHref}
                              target="_blank"
                            >
                              {link?.anchorText}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {findSelectedStyleLbl?.label === "style2" && (
                  <>
                    <p className="text-secondary font-14 fw-bold">پیش نمایش</p>
                    <hr className="mt-0 mb-4" />

                    <div className="px-4 my-4">
                      <div className="blockQuoteContainer">
                        <p className="blockQuoteTitle">{linksUpperTitle}</p>
                        {linkData?.map((link, index) => (
                          <div key={index} className="mb-2">
                            <a
                              href={link?.linkHref}
                              target="_blank"
                              className="linkStyle2"
                            >
                              {link?.anchorText}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {findSelectedStyleLbl?.label === "style3" && (
                  <div className="p-4">
                    <p className="text-secondary font-14 fw-bold">پیش نمایش</p>
                    <hr className="mt-0 mb-4" />

                    <div className=" row justify-center">
                      {linkData?.map((link, index) => (
                        <div className="col d-flex justify-center" key={index}>
                          <svg
                            id="stroke"
                            xmlns="http://www.w3.org/2000/svg"
                            width="0"
                            height="0"
                          >
                            <defs>
                              <path
                                id="line"
                                d="M2 2c49.7 2.6 100 3.1 150 1.7-46.5 2-93 4.4-139.2 7.3 45.2-1.5 90.6-1.8 135.8-.6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                vector-effect="non-scaling-stroke"
                              />
                            </defs>
                          </svg>
                          <a
                            className="style3btn"
                            href={link?.linkHref}
                            target="_blank"
                          >
                            {link?.anchorText}
                            <svg className="button-stroke" viewBox="0 0 154 13">
                              <use href="#line"></use>
                            </svg>
                            <svg className="button-stroke" viewBox="0 0 154 13">
                              <use href="#line"></use>
                            </svg>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {generatedHTML && (
                  <div className="px-4 p-relative">
                    <button
                      className="btn borderlessBtn copyHtmlBtn"
                      onClick={copyText}
                      data-pr-position="left"
                    >
                      <FeatherIcon
                        style={{ width: "18px", height: "18px" }}
                        icon="clipboard"
                      />
                      <Tooltip target=".copyHtmlBtn">کپی متن</Tooltip>
                    </button>

                    <label className="lblAbs">Generated HTML</label>
                    <div
                      dir="ltr"
                      className="generated-html form-group col-12 d-flex flex-wrap p-relative"
                    >
                      <pre className="mt-3">{generatedHTML}</pre>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StyleLinkCreator;

