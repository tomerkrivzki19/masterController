import React from "react";
import { useState, useEffect } from "react";
import DeilveryProtocols from "./subcompnents/DeilveryProtocols";
import { fetchTopSellingProducts } from "../services/shopify";
import logoItem from "../assets/output-logo-white-two.png";
import logoItemTwo from "../assets/Pi7_wordmark-logo.png";
// import desingImage from "../assets/design-01j8d1sjmq-1727015057.png";
import axios from "axios";
import Toast from "../utils/tostify";
import WelcomePopout from "./subcompnents/WelcomePopout";
import MetaWrapper from "../utils/MetaWrapper";
import ServerErrorPage from "./ServerErrorPage";
import useProducts from "../hooks/useProducts";
import loadProducts from "../hooks/loadProducts";
import Banner from "./subcompnents/Banner";
import contorllerImage from "../assets/7CBE0476-3B39-494F-A4A6-BF1FB003D3CC.png";

function mainPage() {
  const [email, setEmail] = useState("");
  const toastManger = new Toast();
  const { products, error, loadingProducts } = loadProducts(3);

  const getOnChange = (setFunc) => {
    const handleOnChange = (e) => {
      setFunc(e.target.value);
    };

    return handleOnChange;
  };
  const sendInfo = async () => {
    try {
      if (!email.trim()) {
        toastManger.createToast("error", "נא למלא את הפרטים");
        return;
      }

      // Validate email format -NOTE: i did it inside the fronted becouse of the technical priority of the beckend servers
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        toastManger.createToast("error", "נא להזין כתובת אימייל חוקית");
        return;
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(`${backendUrl}/api/v1/create-customer`, {
        email,
      });

      if (res.status === 201) {
        setEmail("");
        toastManger.createToast("success", " המייל נשלח בהצלחה");
      }
    } catch (error) {
      console.log(error);

      setEmail("");
      toastManger.createToast("warning", "הפרטים שלך מעודכנים במערכת ");
    }
  };

  return (
    <>
      <MetaWrapper title="Home" description="Welcome to GanHishakim!" />
      <Banner />
      <WelcomePopout />
      <div className="main-header-container ">
        <div className="relative bg-customDark backdrop-blur-md inset-0 ">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div
              className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-8 lg:pb-56 lg:pt-48 xl:col-span-6"
              dir="rtl"
            >
              <div className="mx-auto max-w-2xl lg:mx-0 lg:pr-16 xl:pr-24 ">
                <div className="flex place-content-around hidden lg:flex">
                  <img
                    alt="גן המשחקים לוגו"
                    src={logoItem}
                    className="h-13 w-1/3 "
                  />
                  <img
                    alt="גן המשחקים לוגו שני"
                    src={logoItemTwo}
                    className="h-13 w-1/3 "
                  />
                </div>
                <div className="hidden sm:mt-32 sm:flex lg:mt-16">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20 space-x-1">
                    עיצוב ייחודי שיגרום לשלך להיות גיימר המוביל.
                    {/* <span className="ml-1">
                      <a
                        href="/about"
                        className="whitespace-nowrap font-semibold text-indigo-600 pr-3"
                      >
                        לקרוא עוד <span aria-hidden="true">&rarr;</span>
                      </a>
                    </span> */}
                  </div>
                </div>
                {/* text-gray-900 FIXME:*/}
                <h1 className="mt-24 text-4xl font-bold tracking-tight text-white sm:mt-10 sm:text-6xl">
                  עיצוב ייחודי שישדרג את בקר ה-Xbox שלך
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  עיצוב אישי של בקרי Xbox עם דגש על איכות ודיוק. הפוך את חוויית
                  המשחק שלך למיוחדת יותר עם בקרים מעוצבים באופן אישי שיתאימו
                  בדיוק לטעם שלך.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="/shop"
                    className="rounded-md bg-[#aa60cb] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    התחל בקנייה
                  </a>
                  <a
                    href="/about"
                    className="text-sm font-semibold leading-6 text-white"
                  >
                    למד עוד <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
              <img
                src="https://cdn.shopify.com/s/files/1/0603/2067/7990/files/photo-1618193139062-2c5bf4f935b7.jpg?v=1727263869 "
                alt="בחור מסתכל טלוויזיה "
                className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              ></img>
            </div>
          </div>
        </div>
      </div>

      <div className="top-sellers-container ">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 ">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <a
                href="/shop"
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block  "
              >
                עיין בכל המוצרים
                <span aria-hidden="true">&rarr;</span>
              </a>
              <h2 className="text-2xl font-bold tracking-tight sm:text-fuchsia-900 sm:p-2 sm:bg-fuchsia-300 text-gray-900 text-right">
                המועדפים שלנו
              </h2>
            </div>

            {loadingProducts ? (
              <div className="animate-pulse flex flex-col items-center justify-center space-y-4">
                <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                <h1 className="text-gray-500">LOADING.....</h1>
              </div>
            ) : error ? (
              <ServerErrorPage />
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8 ">
                {products.map((product) => (
                  <div key={product?.id} className="group relative ">
                    <div className=" sm:h-fit w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 ">
                      {product.images && product.images.length > 0 ? (
                        <img
                          alt={product.images[0]?.altText || "Product image"}
                          src={product.images[0]?.src || "/placeholder.jpg"}
                          className="h-full w-full object-cover object-center  sm:group-hover:animate-wiggle sm:group-hover:animate-delay-300 "
                        />
                      ) : (
                        <img
                          alt="Placeholder image"
                          src="/placeholder.jpg"
                          className="h-full w-full object-cover object-center"
                        />
                      )}
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-900">
                      <a href={`/product/${encodeURIComponent(product?.id)}`}>
                        <span className="absolute inset-0" />
                        {product?.title || "Unnamed Product"}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.variants &&
                      product.variants.length > 0 &&
                      product.variants[0]?.price
                        ? ` ₪${parseFloat(product.variants[0]?.price.amount)}`
                        : "Price not available"}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 sm:hidden text-right">
              <a
                href="/shop"
                className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                עיין בכל המוצרים
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* section */}
      <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="a computer screen with a video game on it"
            className="h-full w-full object-cover object-center blur-sm "
          ></img>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 bg-opacity-50"
        />
        <div
          className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
          dir="rtl"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            קנו את הבקר המעוצב הראשון שלכם
          </h2>
          <p className="mt-3 text-xl text-white">
            אצלנו, כל בקר מעוצב בקפידה ומיוצר ברמה הגבוהה ביותר. אנו מחויבים
            לאיכות, עיצוב אישי ועמידה בתקנים האתיים המחמירים ביותר. כל רכישה
            תומכת ביצירת חוויות גיימינג בלתי נשכחות.
          </p>
          <a
            href="/shop"
            className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
          >
            גלו את הקולקציה שלנו
          </a>
        </div>
      </div>
      <DeilveryProtocols />

      <div className="promo-section-continaer" id="contactInfo">
        <div className="bg-purple-500	 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div
              className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32"
              dir="rtl"
            >
              <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                הישארו מעודכנים בהשקה שלנו!
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
                הצטרפו לרשימת ההודעות שלנו ותהיו הראשונים לדעת על כל עדכון חשוב.
                אנחנו מבטיחים לא לפספס אף פרט!
              </p>
              <form className="mx-auto mt-10 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  email address
                </label>
                <input
                  onChange={getOnChange(setEmail)}
                  value={email}
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="הכניסו את כתובת הדוא\ל שלכם"
                  autoComplete="email"
                  className="w-full rounded-md border-0 bg-white/5 px-2 py-2 text-white text-xs shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:px-3 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={sendInfo}
                  type="button"
                  className="flex-none rounded-md bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  שמרו אותי מעודכן
                </button>
              </form>

              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient
                    r={1}
                    cx={0}
                    cy={0}
                    id="759c1415-0410-454c-8f7c-9a820de03641"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(512 512) rotate(90) scale(512)"
                  >
                    <stop stopColor="#7775D6" />
                    <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* TODO: TESTER */}

      {/* TODO: add on hover and hidden for small screens bg-[#aa60cb]*/}
      {/* <div className="h-screen bg-[#aa60cb] flex justify-center relative sticky top-28">
        <a href="/shop" className="w-1/2">
          <img
            src="https://xmrn27t1krj915hx-60320677990.shopifypreview.com/cdn/shop/files/FullSizeRender_68cc88ec-5bbf-47ae-980d-84b37270086d.heic?v=1729785189"
            alt=""
            className="w-100 h-auto  "
          />
        </a>
      </div> */}

      {/* <div className=" relative bg-white py-16 sm:py-24 lg:py-32 rtl">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
            רוצה חדשות ועדכונים לגבי מוצרים? הירשם לניוזלטר שלנו.
          </h2>
          <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
            <div className="flex gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                onChange={getOnChange(setEmail)}
                value={email}
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="הזן את המייל שלך"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                onClick={sendInfo}
                type="button"
                className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                הירשם
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-900">
              אכפת לנו מהנתונים שלך. קרא את{" "}
              <a
                href="/site-policy"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                מדיניות פרטיות&nbsp;{" "}
              </a>
              .
            </p>
          </form>
        </div>
      </div> */}
    </>
  );
}

export default mainPage;
