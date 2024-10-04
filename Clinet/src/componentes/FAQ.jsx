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
    </>
  );
}

export default FAQ;
