import { useEffect, useState } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import { Dropdown } from "primereact/dropdown"
import { styleLinkOptions } from "class/staticDropdownOptions"
// import { axiosClient } from "class/axiosConfig";
// import Loading from "components/commonComponents/loading/loading";

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
    // console.log({ styleLinkOptions });
    // const [linkQty, setLinkQty] = useState(1);

    // const handleLinkQtyChange = (event) => {
    //     setLinkQty(parseInt(event.target.value));
    // };

    // const style1Html = `<div class="row">${[...Array(linkQty)].map((_, index) => (<div class='linkContainer'><a class='btn w-100' href='#' target='_blank'>{ }</a></div>))}</div>`

    // const style1Css = [

    // ]

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     let formData = new FormData(e.target);
    //     const formProps = Object.fromEntries(formData);
    // }

    const [linkQty, setLinkQty] = useState(1);
    const [linkData, setLinkData] = useState([{ linkHref: '', anchorText: '' }]);
    const [defaultStyle, setDefaultStyle] = useState(null);
    const [generatedHTML, setGeneratedHTML] = useState('');

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

        const html = linkData.map((link, index) => (
            `<div className="row buttonContainer"><div className='linkContainer'><a className='btn w-100 linkStyle' href='${link.linkHref}' target='_blank'>${link.anchorText}</a></div></div>`
        )).join('');

        setGeneratedHTML(html);
    };

    // console.log({ linkQty, linkData, defaultStyle, generatedHTML });

    return (
        <>
            <Head>
                {/* <title>کارهای تخصصی مرکز</title> */}
            </Head>
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="card">
                        <div className="card-body">
                            {/* <form onSubmit={handleSubmit}>


                                <div className="row p-4">
                                    <div className="form-group col-md-3 col-12">
                                        <label className="lblAbs font-12">
                                            تعداد لینک ها
                                        </label>
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
                                        <label className="lblAbs font-12">استایل پیش فرض</label>
                                        <Dropdown
                                            // value={}
                                            // onChange={(e) => FUSelectEntity(e.value)}
                                            options={styleLinkOptions}
                                            optionLabel="label"
                                            placeholder="choose an option"
                                            // filter
                                            showClear
                                        />
                                    </div>
                                </div>


                                <div className=" px-4">
                                    {[...Array(linkQty)].map((_, index) => (
                                        <div className="row">
                                            <div className="form-group col-md-6 col-12">
                                                <label className="lblAbs font-12">
                                                    لینک {index + 1}
                                                </label>
                                                <div className="col p-0">
                                                    <input
                                                        dir="ltr"
                                                        type="text"
                                                        name={`linkTxt${index}`}
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
                                                        name={`anchorTxt${index}`}
                                                        className="form-control floating inputPadding rounded"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    ))}

                                </div>


                                <div className="submit-section">

                                    <button
                                        type="submit"
                                        className="btn btn-primary rounded btn-save font-13"
                                    >
                                        submit
                                    </button>
                                </div>
                            </form> */}

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
                                        <label className="lblAbs font-12">استایل پیش فرض</label>
                                        <Dropdown
                                            value={defaultStyle}
                                            onChange={(e) => setDefaultStyle(e.value)}
                                            options={styleLinkOptions}
                                            optionLabel="label"
                                            placeholder="choose an option"
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

                                <div className="px-4">
                                    {linkData.map((link, index) => (
                                        <div key={index} className="row buttonContainer">
                                            <div className='linkContainer'>
                                                <a className='btn w-100 linkStyle' href={link.linkHref} target='_blank'>{link.anchorText}</a>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="submit-section">
                                    <button type="submit" className="btn btn-primary rounded btn-save font-13">
                                        ثبت
                                    </button>
                                </div>

                                {/* {linkData && ( */}
                                <div className="px-4">
                                    <label className="lblAbs">
                                        Generated HTML
                                    </label>
                                    <div className="generated-html form-group col-12 d-flex flex-wrap p-relative">
                                        <pre className="mt-3">{generatedHTML}</pre>
                                    </div>
                                </div>
                                {/* )} */}

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
                </div>
            </div>
        </>
    )
}

export default StyleLinkCreator