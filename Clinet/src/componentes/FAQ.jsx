import React from "react";
import MetaWrapper from "../utils/MetaWrapper";

const faqs = [
  {
    id: 1,
    question: "מהן האפשרויות להתאמת בקר בעיצוב אישי?",
    answer:
      "אנחנו מציעים מגוון רחב של אפשרויות להתאמת בקר בעיצוב אישי, כולל צבעים, טקסטורות והדפסים מותאמים אישית. אתם יכולים ליצור עיצוב משלכם באמצעות הכלי שלנו לעיצוב אונליין.",
  },
  {
    id: 2,
    question: "כמה זמן לוקח לקבל את הבקר לאחר ההזמנה?",
    answer:
      "בדרך כלל, זמן האספקה הוא בין 7 ל-14 ימי עסקים, תלוי במורכבות העיצוב ובמיקום שלכם. אנחנו עושים כל מאמץ להבטיח שהמוצרים יגיעו אליכם בהקדם האפשרי.",
  },
  {
    id: 3,
    question: "האם יש אחריות על הבקרים?",
    answer:
      "כן, כל הבקרים שלנו מגיעים עם אחריות לשנה. במידה וישנה בעיה טכנית עם המוצר, אנא צרו איתנו קשר ונשמח לסייע.",
  },
  {
    id: 4,
    question: "אילו אמצעי תשלום אתם מקבלים?",
    answer:
      "אנחנו מקבלים את כל כרטיסי האשראי הגדולים, תשלומים דרך PayPal, וכן אפשרות לתשלום בהעברה בנקאית.",
  },
  {
    id: 5,
    question: "האם אפשר להחזיר או להחליף את המוצר?",
    answer:
      "כן, אפשר להחזיר או להחליף מוצרים בתוך 14 יום מקבלת המוצר, בתנאי שהמוצר במצב חדש ולא נעשה בו שימוש. למוצרים בהתאמה אישית יש מדיניות החזרה שונה.",
  },
  {
    id: 6,
    question: "איך אפשר ליצור איתכם קשר?",
    answer:
      "אפשר ליצור איתנו קשר דרך טופס יצירת הקשר באתר, או לשלוח מייל לכתובת: support@yourcontrollersite.com. אנחנו נשתדל לחזור אליכם בהקדם.",
  },
];

function FAQ() {
  return (
    <>
      <MetaWrapper
        title="FAQ"
        description="Frequently asked questions about GanHishakim."
      />
      <div className="faq-container bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 text-right">
          <div className="mx-auto max-w-2xl text-center ">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              שאלות נפוצות
            </h2>
            <p className="mt-6 text-base leading-7 text-gray-600 rtl">
              יש לכם שאלה אחרת ולא מצאתם תשובה? פנו לצוות התמיכה שלנו{" "}
              <a
                href="mailto:support@yourcontrollersite.com"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                שלחו לנו מייל
              </a>{" "}
              ונחזור אליכם בהקדם האפשרי.
            </p>
          </div>
          <div className="mt-20">
            <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-base font-semibold leading-7 text-gray-900 rtl">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 rtl">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* support section  */}
      <div className="relative bg-gray-900">
        <div className="relative h-80 overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply"
            className="size-full object-cover"
          />
          <svg
            viewBox="0 0 926 676"
            aria-hidden="true"
            className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
          >
            <path
              d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
              fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
              fillOpacity=".4"
            />
            <defs>
              <linearGradient
                id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                x1="926.392"
                x2="-109.635"
                y1=".176"
                y2="321.024"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#776FFF" />
                <stop offset={1} stopColor="#FF4694" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
          <div
            className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32"
            dir="rtl"
          >
            <h2 className="text-base/7 font-semibold text-indigo-400">
              תמיכה ברמה הגבוהה ביותר
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              אנחנו כאן בשבילך
            </p>
            <p className="mt-6 text-base/7 text-gray-300">
              אם משהו השתבש עם השלט שלך, אל דאגה – אנחנו כאן כדי לעזור! צוות
              התמיכה שלנו ילווה אותך בכל שלב וידאג שהכל יעבוד בצורה מושלמת.
            </p>
            <div className="mt-8">
              <a
                href="/support"
                className="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                בקרו במרכז התמיכה
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
