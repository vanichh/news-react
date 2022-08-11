// import { HomePage } from 'pages/home';
import { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loading } from "components/loading";
import { Header } from "components/header";

const HomePage = lazy(() => import("pages/home"));
const ErrorPage = lazy(() => import("pages/error"));

export const App: FC = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/error"} element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </>
  );
};
