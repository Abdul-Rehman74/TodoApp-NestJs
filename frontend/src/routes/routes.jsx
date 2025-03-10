import { useEffect, useState } from "react";
import Home from "../views/Home";
import { getRoutes } from "../services/route";

const staticRoutes = [
  {
    path: "/",
    element: <Home />,
  }
];

export const useRoutes = () => {
  const [routes, setRoutes] = useState(staticRoutes);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        // const response = await getRoutes();
        // const newRoutes = response?.data?.route?.map(
        //   (route) =>
        //     ({
        //       path: `${route.url}`,
        //       element: <ServiceDetail />,
        //     } ?? [])
        // );
        setRoutes([staticRoutes]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoutes();
  }, []);

  return routes;
};
