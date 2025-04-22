import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      document.body.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    } catch (error) {
      console.error("Scrolling body failed:", error);
      try {
        document.documentElement.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      } catch (error2) {
        console.error("Scrolling documentElement also failed:", error2);
      }
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
