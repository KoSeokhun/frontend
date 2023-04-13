import { createBrowserRouter } from "react-router-dom";
import About from "./pages/About/index";
import Home from "./pages/Home/index";
import Extract from "./pages/Extract/index";
import DataSplit from "./pages/DataSplit/index";
import Yolo from "./pages/Yolo/index";
import Logs from "./pages/Logs";
import App from "./App";
import React from "react";

const components = {
    About,
    DataSplit,
    Extract,
    Yolo,
    Logs,
};
export const pages = Object.keys(components);

const routes = pages.map(page => ({
    path: page[0].toLowerCase() + page.slice(1),
    element: React.createElement(components[page], null)
}));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            ...routes,
        ],
    },
]);

export default router;