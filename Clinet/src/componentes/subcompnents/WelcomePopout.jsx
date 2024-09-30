import React, { useEffect, useState } from "react";

function WelcomePopout() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookieOptions, setCookieOptions] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!document.cookie.includes("popupShown")) {
      setTimeout(() => {
        setIsOpen(true);
      }, 6000);
    }
    // Check for cookie options
    if (!document.cookie.includes("cookieConsent")) {
      setCookieOptions(true);
    } else {
      setCookieOptions(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);

    setTimeout(() => {
      setIsOpen(false);
    }, 1000); // Adjust this duration to match your close animation duration

    document.cookie = "popupShown=true; max-age=604800"; // Cookie lasts for one week
  };

  const handleCookieConsent = () => {
    setCookieOptions(false); // Hide cookie options banner
    document.cookie = "cookieConsent=true; max-age=31536000"; // Cookie lasts for one year
  };

  //   TODO:
  // -connect both the cookie options and the banner to the cookies - completed
  //-create a delay of 4-6 sec before display the message - completed
  //   -exmaple of cookie explanation page https://weshoes.co.il/pages/cookies__use?srsltid=AfmBOoqzqKdRSBo3-vu0MBeIQmv7EZca_kvegl6w8L2_EKob4u66RWzm

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center rtl `}
        >
          <div
            className={`bg-indigo-700 p-6 rounded-lg mx-4 sm:mx-0 max-w-lg relative ${
              isVisible
                ? "animate-fade-down animate-delay-150 animate-ease-in-out"
                : "animate-jump-out animate-delay-150 animate-ease-out"
            } `}
          >
            {/* Close button (X marker) */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-white text-xl hover:text-indigo-300"
              aria-label="Close"
            >
              &times; {/* X marker */}
            </button>

            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                הצטרף לקהילה שלנו
                <br />
                כדי להישאר מעודכן ומעורב במוצרים החדשים שלנו.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200">
                הירשמו עכשיו לקבלת עדכונים והנחות מיוחדות!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    handleClose();
                    setTimeout(() => {
                      // Use setTimeout to allow the modal to close before scrolling
                      const target = document.querySelector("#contactInfo");
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the target
                      }
                    }, 1000); // Match this duration with your close animation duration
                  }}
                  href="#contactInfo"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  הצטרף עכשיו
                </a>
                <a
                  onClick={handleClose}
                  className="text-sm font-semibold leading-6 text-white cursor-pointer"
                >
                  {/* למידע נוסף <span aria-hidden="true">→</span> */}
                  סגור
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* cookie banner  */}
      {cookieOptions ? (
        <div className="rtl fixed inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 bg-white p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8 z-50">
          <p className="max-w-4xl text-sm leading-6 text-gray-900">
            אנחנו משתמשים בקובצי קוקיז (Cookies) כדי להציג תוכן רלוונטי עבורך
            ולהעניק לך את חויית הגלישה הטובה ביותר לחצו על ״אשר״, לאישור השימוש
            בקוקיז והמשך גלישה באתר
            {/* <a href="#" className="font-semibold text-indigo-600">
              cookie policy
            </a> */}
            .
          </p>
          <div className="flex flex-none items-center gap-x-5">
            <button
              type="button"
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              onClick={handleCookieConsent}
            >
              אשר הכל
            </button>
            {/* <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => {
                setIsOpen(false);
                setCookieOptions(false);
              }}
            >
              דחה הכל{" "}
            </button> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default WelcomePopout;
