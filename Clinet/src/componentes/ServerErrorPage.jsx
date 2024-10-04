import React from "react";
import MetaWrapper from "../utils/MetaWrapper";

function ServerErrorPage() {
  return (
    <>
      <MetaWrapper title="500" description="Server error!" />

      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 rtl">
        <div className="text-center mt-10">
          <p className="text-base font-semibold text-red-600">500</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            שגיאה בשרת
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            מצטערים, הייתה שגיאה בשרת ואנחנו לא יכולים להשלים את הבקשה שלך.
          </p>
        </div>
      </main>
    </>
  );
}

export default ServerErrorPage;
