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
    label: "style1", value: [
      `
      .buttonContainer {
        width: 100%;
      }
      
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
      `
    ]
  },
  {
    label: "style2", value: [
      `
      .blockQuoteContainer {
        background: #f5f5f5;
        padding: 10px 20px 10px 24px;
        border-right: 4px solid #08508e;
        border-radius: 4px;
      }
      `
    ]
  }
  // }
]



