import React, { useEffect, useRef, useState } from "react";

// Utility function to format numbers with commas
const formatNumber = (num) => num.toLocaleString();

const NumberCounter = ({ value, label }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const formattedValue = (() => {
    if (label === "ערך הזמנה ממוצעת") {
      return `$${formatNumber(value)}`;
    }
    if (label === "שביעות רצון לקוחות") {
      return `${value}/5`;
    }
    if (label === "זמן משלוח ממוצע") {
      return `${value} ימים`;
    }
    return formatNumber(value);
  })();

  return (
    <div
      ref={ref}
      className={`inline-block text-center rtl transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p
        className={`text-3xl font-bold leading-8 text-gray-900 ${
          isVisible ? "count-up" : ""
        }`}
      >
        {isVisible ? formattedValue : "0"}
      </p>
      <p className="text-base leading-6 text-gray-600">{label}</p>
    </div>
  );
};

export default NumberCounter;
