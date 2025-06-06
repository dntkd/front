import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { BottomNavigationBar } from "@/components/common/bottom-navigation-bar";
import globalRouter from "@/hooks/navigate/global-router";

export const GlobalLayout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState<string[]>([]);

  useEffect(() => {
    setCurrentUrl(getCurrentPage(location.pathname));
  }, [location.pathname]);

  function getCurrentPage(url: string): string[] {
    return url.split("/");
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        minHeight: "450px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height:
            currentUrl[1] == "post" ||
            (currentUrl[1] == "chat" && !currentUrl[2]) ||
            currentUrl[1] == "mypage" ||
            currentUrl[1] == "notice"
              ? `calc(100vh - 3.5rem)`
              : "100vh",
          position: "relative",
        }}
      >
        <Outlet />
      </div>
      {(currentUrl[1] == "post" ||
        (currentUrl[1] == "chat" && !currentUrl[2]) ||
        currentUrl[1] == "mypage" ||
        currentUrl[1] == "notice") && <BottomNavigationBar />}
    </div>
  );
};
