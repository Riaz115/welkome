import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Portal } from "@chakra-ui/portal";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
import routes from "routes";

export default function Admin(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [hovered, setHovered] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routes);
    // eslint-disable-next-line
  }, [location.pathname]);
  // functions for changing the states from components
  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          setCurrentRoute(routes[i].name);
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/rtl") {
        return (
          <Route path={`${prop.path}`} element={prop.component} key={key} />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      return null;
    });
  };
  document.documentElement.dir = "rtl";
  return (
    <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
      <Sidebar
        open={open}
        hovered={hovered}
        setHovered={setHovered}
        mini={props.mini}
        onClose={() => setOpen(false)}
      />
      {/* Navbar & Main Content */}
      <div className="h-full w-full font-dm dark:bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-2.5 flex-none transition-all dark:bg-navy-900 md:pl-2 ${
            props.mini === false
              ? "xl:mr-[313px]"
              : props.mini === true && hovered === true
              ? "xl:mr-[313px]"
              : "mr-0 xl:mr-[142px]"
          } `}
        >
          {/* Routes */}
          <div>
            <Portal>
              <Navbar
                onOpenSidenav={() => setOpen(!open)}
                brandText={currentRoute}
                secondary={getActiveNavbar(routes)}
                theme={props.theme}
                setTheme={props.setTheme}
                mini={props.mini}
                setMini={props.setMini}
                {...rest}
              />
            </Portal>
            <div className="mx-auto min-h-screen p-2 !pt-[100px] md:p-2">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/rtl/dashboards/rtl" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
