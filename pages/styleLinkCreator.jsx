import { useEffect, useState } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import { Dropdown } from "primereact/dropdown"
import { styleLinkOptions } from "class/staticDropdownOptions"
import { WarningAlert } from "class/AlertManage"

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
    const [linkQty, setLinkQty] = useState(1);
    const [linkData, setLinkData] = useState([{ linkHref: '', anchorText: '' }]);
    const [defaultStyle, setDefaultStyle] = useState(null);
    const [linksUpperTitle, setLinksUpperTitle] = useState(null)
    const [generatedHTML, setGeneratedHTML] = useState('');

    const findSelectedStyleLbl = styleLinkOptions.find((x) => x.value === defaultStyle)

    const handleLinkQtyChange = (event) => {
        const newQty = parseInt(event.target.value);
        setLinkQty(newQty);
        setLinkData(Array.from({ length: newQty }, () => ({ linkHref: '', anchorText: '' })));
    };

    const handleLinkChange = (index, field, value) => {
        const updatedLinkData = [...linkData];
        updatedLinkData[index][field] = value;
        setLinkData(updatedLinkData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let html = null;

        if (!findSelectedStyleLbl) WarningAlert("", "استایل مورد نظر را انتخاب نمایید!")

        if (findSelectedStyleLbl?.label === 'style1') {
            html = `<div className="row buttonContainer">${linkData.map((link, index) => (`<div className='${linkData.length == 2 ? 'col-6' : linkData.length == 3 ? 'col-4' : linkData.length == 4 ? 'col-3' : 'col-12'} linkContainer'><a className='btn w-100 linkStyle' href='${link.linkHref}' target='_blank'>${link.anchorText}</a></div>`)).join('')}</div>`
        } else {
            html = `<div className="blockQuoteContainer"><p className="">${linksUpperTitle}</p>${linkData.map((link, index) => (`<div><a href=${link.linkHref} target="_blank">${link.anchorText}</a></div>`)).join('')}</div>`
        }

        setGeneratedHTML(html);
    };

    return (
        <>
            <Head>
                <title>لینک سازی</title>
            </Head>
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row p-4">
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
                                        <label className="lblAbs font-12">استایل پیش فرض <span className="text-danger">*</span> </label>
                                        <Dropdown
                                            value={defaultStyle}
                                            onChange={(e) => setDefaultStyle(e.value)}
                                            options={styleLinkOptions}
                                            optionLabel="label"
                                            placeholder="choose an option"
                                            showClear
                                        />
                                    </div>
                                </div>

                                <div className="px-4">
                                    {linkData.map((link, index) => (
                                        <div className="row" key={index}>
                                            <div className="form-group col-md-6 col-12">
                                                <label className="lblAbs font-12">لینک {index + 1}</label>
                                                <div className="col p-0">
                                                    <input
                                                        dir="ltr"
                                                        type="text"
                                                        value={link.linkHref}
                                                        onChange={(e) => handleLinkChange(index, 'linkHref', e.target.value)}
                                                        className="form-control floating inputPadding rounded"
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group col-md-6 col-12">
                                                <label className="lblAbs font-12">متن قابل مشاهده لینک {index + 1}</label>
                                                <div className="col p-0">
                                                    <input
                                                        type="text"
                                                        value={link.anchorText}
                                                        onChange={(e) => handleLinkChange(index, 'anchorText', e.target.value)}
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
                                    <div className="px-4 mt-3">
                                        <p className="text-secondary font-13 fw-bold">پیش نمایش</p>
                                        <hr className="mt-0 mb-4" />

                                        <div className="row buttonContainer">
                                            {linkData.map((link, index) => (
                                                <div key={index} className={`linkContainer ${linkData.length == 2 ? 'col-6' : linkData.length == 3 ? 'col-4' : linkData.length == 4 ? 'col-3' : 'col-12'}`}>
                                                    <a className='btn w-100 linkStyle' href={link.linkHref} target='_blank'>{link.anchorText}</a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {findSelectedStyleLbl?.label === 'style2' && (
                                    <div className="px-4 mt-3">
                                        <p className="text-secondary font-13 fw-bold">پیش نمایش</p>
                                        <hr className="mt-0 mb-4" />

                                        <div className="blockQuoteContainer">
                                            <p className="">{linksUpperTitle}</p>
                                            {linkData.map((link, index) => (
                                                <div key={index} className="">
                                                    <a href={link.linkHref} className="" target="_blank">{link.anchorText}</a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <svg id="stroke" xmlns="http://www.w3.org/2000/svg" width="0" height="0">
                                    <defs>
                                        <path id="line" d="M2 2c49.7 2.6 100 3.1 150 1.7-46.5 2-93 4.4-139.2 7.3 45.2-1.5 90.6-1.8 135.8-.6" fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
                                    </defs>
                                </svg>

                                <div class="container">
                                    <a class="style3btn" href="/">Follow
                                        <svg class="button-stroke" viewBox="0 0 154 13">
                                            <use href="#line"></use>
                                        </svg>
                                        <svg class="button-stroke" viewBox="0 0 154 13">
                                            <use href="#line"></use>
                                        </svg>
                                    </a>
                                </div>
                                {/* </div> */}


                                <div className="submit-section">
                                    <button type="submit" className="btn btn-primary rounded btn-save font-13">
                                        ثبت
                                    </button>
                                </div>

                                <div className="px-4">
                                    <label className="lblAbs">
                                        Generated HTML
                                    </label>
                                    <div className="generated-html form-group col-12 d-flex flex-wrap p-relative">
                                        <pre className="mt-3">{generatedHTML}</pre>
                                    </div>
                                </div>

                                {defaultStyle && (
                                    <div className="px-4">
                                        <label className="lblAbs">
                                            Generated CSS
                                        </label>
                                        <div className="generated-html form-group col-12 d-flex flex-wrap p-relative">
                                            <pre className="mt-3">{defaultStyle}</pre>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default StyleLinkCreator