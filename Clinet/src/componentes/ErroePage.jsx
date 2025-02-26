import React from "react";
import MetaWrapper from "../utils/MetaWrapper";

function ErrorPage() {
  return (
    <>
      <MetaWrapper title="404" description="דף לא נמצא!" />

      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 rtl">
        <div className="text-center mt-10">
          <p className="text-base font-semibold text-red-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            דף לא נמצא
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            מצטערים, לא הצלחנו למצוא את הדף שאתה מחפש.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md  bg-[#aa60cb] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              חזור לדף הבית
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default ErrorPage;
