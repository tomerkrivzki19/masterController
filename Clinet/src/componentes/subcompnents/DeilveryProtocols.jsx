import React from "react";

const incentives = [
  {
    name: "משלוח חינם",
    description:
      "אנו מציעים משלוח חינם לכל הרכישות באתר, כדי להבטיח חוויית קנייה נוחה ומשתלמת.",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg",
  },
  {
    name: "תמיכה 24/7",
    description:
      "צוות שירות הלקוחות שלנו זמין תמיד כדי לעזור לכם בכל שאלה או בעיה.",
    imageSrc: "https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg",
  },
  {
    name: "עגלת קניות מהירה",
    description:
      "הקנייה באתר מתבצעת בצורה מהירה ופשוטה, עם חוויית משתמש נוחה ויעילה.",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg",
  },
];

function DeilveryProtocols() {
  return (
    <div className="site-info-container" dir="rtl">
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 px-4 lg:max-w-none lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div
                key={incentive.name}
                className="text-center sm:flex sm:text-right lg:block lg:text-center"
              >
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <img
                      alt={incentive.name}
                      src={incentive.imageSrc}
                      className="mx-auto h-24 w-28"
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mr-3 sm:mt-0 lg:mr-0 lg:mt-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    {incentive.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeilveryProtocols;
