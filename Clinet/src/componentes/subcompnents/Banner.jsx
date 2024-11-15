import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

function Banner() {
  const [close, setClose] = useState(false);
  const [closing, setClosing] = useState(false);

  // Check local storage for close state on initial render
  useEffect(() => {
    const savedCloseState = sessionStorage.getItem("bannerClosed");
    if (savedCloseState === "true") {
      setClose(true);
    }
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClose(true);
      sessionStorage.setItem("bannerClosed", "true");
    }, 1300);
  };

  return (
    !close && (
      <div
        className={`fixed w-full max-w-full  isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 pt-28 z-40
                    ${
                      closing
                        ? " pt-16 animate-fade-up animate-delay-400 animate-ease-out "
                        : "animate-fade-down animate-once animate-delay-400   "
                    }
    `}
      >
        <div
          aria-hidden="true"
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>

        {/* New arrival link */}
        <p className="text-sm leading-6 text-gray-900 text-right sm:text-left">
          <a
            href="/shop"
            className="flex flex-wrap items-center justify-start rtl sm:justify-start "
          >
            <strong className="font-semibold">
              הכירו את הדברים החדשים שלנו!
            </strong>
            <svg
              viewBox="0 0 2 2"
              aria-hidden="true"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
            >
              <circle r={1} cx={1} cy={1} />
            </svg>
            <span>
              הפריטים החדשים זמינים לזמן מוגבל בלבד. בדקו אותם עכשיו&nbsp;
            </span>
            <span aria-hidden="true" className="pr-3 hidden  sm:block">
              &rarr;
            </span>
          </a>
        </p>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            onClick={() => handleClose()}
          >
            <span className="sr-only">סגור</span>
            <XMarkIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-900 z-40"
            />
          </button>
        </div>
      </div>
    )
  );
}

export default Banner;
