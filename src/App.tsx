// import { HomePage } from 'pages/home';
import { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "components/loading";

const HomePage = lazy(() => import("pages/home"));
const ErrorPage = lazy(() => import("pages/error"));
const NotFoundPage = lazy(() => import("pages/not-found"));

export const App: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/error"} element={<ErrorPage />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
