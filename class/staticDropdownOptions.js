export const dateShortcutsData = [
  { label: "امروز", value: "today" },
  { label: "دیروز", value: "yesterday" },
  { label: "دو روز قبل", value: "lastTwoDays" },
  { label: "هفته گذشته", value: "lastWeek" },
  { label: "ماه گذشته", value: "lastMonth" },
];

export const insuranceTypeDataClass = [
  { label: "بیمه پایه", value: "بیمه پایه" },
  { label: "بیمه تکمیلی", value: "بیمه تکمیلی" },
];

export const insuranceStatusDataClass = [
  { label: "محاسبه بصورت آنلاین", value: "محاسبه بصورت آنلاین" },
  { label: "ارائه فاکتور", value: "ارائه فاکتور" },
];

export const articleLanguageDataClass = [
  { label: "انگلیسی", value: 1 },
  { label: "فارسی", value: 0 },
];

export const centerPhoneTypeDataClass = [
  { label: "ثابت", value: "ثابت" },
  { label: "همراه", value: "همراه" },
  { label: "فکس", value: "فکس" },
];

export const styleLinkOptions = [
  {
    label: "style1",
    value: [
      `
      .linkContainer {
        display: flex;
        justify-content: center;
      }
      
      .linkStyle {
        color: rgb(13, 177, 202);
        text-decoration: none;
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
        padding: 10px 15px;
      }
      
      @media (max-width: 768px) {
        .gap-md {
          gap: 0.5rem;
        }
      }
      `,
    ],
  },
  {
    label: "style2",
    value: [
      `
      .blockQuoteContainer {
        background: #f5f5f5;
        padding: 10px 20px 10px 24px;
        border-right: 4px solid #08508e;
        border-radius: 4px;
      }
      
      .blockQuoteTitle {
        font-size: 16px;
        font-weight: 600;
        color: gray;
      }
      
      .linkStyle2 {
        font-size: 15px;
      }
      
      .justify-center {
        justify-content: center;
      }
      `,
    ],
  },
  {
    label: "style3",
    value: [
      `
      .style3btn {
        display: inline-block;
        color: #1b5a90;
        min-width: 154px;
        text-decoration: none;
        font-size: 15px;
        padding: 20px;
        position: relative;
        text-align: center;
      }
      
      .style3btn:hover .button-stroke:nth-child(2) {
        stroke-dashoffset: 0;
      }
      
      .button-stroke {
        display: block;
        width: calc(100% - 40px);
        height: 20px;
        stroke: #0db1ca;
        position: absolute;
        left: 20px;
        bottom: -10px;
        stroke-width: 3;
      }
      
      .button-stroke:nth-child(2) {
        stroke-dasharray: 650px;
        stroke-dashoffset: 650px;
        stroke: #1b5a90;
        stroke-width: 4;
        transition: stroke-dashoffset 850ms ease-out;
      }

      .justify-center {
        justify-content: center;
      }
      `,
    ],
  },
];
