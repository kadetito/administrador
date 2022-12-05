import { AdminLayout } from "../../components/layouts";
import { signOut } from "next-auth/react";
import { Row } from "react-bootstrap";
import { SummaryCard } from "../../components/admin";
import { BsPersonSquare, BsCardHeading, BsStopwatch } from "react-icons/bs";
import useSWR from "swr";
import { DashboardSummaryResponse } from "../../interfaces/dashboardadmin";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import NotAccess from "./NotAccess";
import { FullScreenLoading } from "../../components/ui/FullScreenLoading";

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardSummaryResponse>(
    "/api/admin/dashboard",
    {
      refreshInterval: 30 * 1000,
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Tik");
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    Cookies.remove("next-auth.session-token", { path: "/admin" });
    Cookies.remove("next-auth.callback-url", { path: "/admin" });
    Cookies.remove("next-auth.csrf-token", { path: "/admin" });
    Cookies.remove("cart");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("zip");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");

    signOut();

    return <NotAccess />;
  }

  if (!error && !data) {
    return <FullScreenLoading />;
  }

  // const { numberOfArticles, numberOsUsers } = data!;

  return !data ? (
    <></>
  ) : (
    <AdminLayout title="Admin Dashboard" subTitle="Estadísticas generales">
      <Row>
        <SummaryCard
          title={data?.numberOsUsers}
          subTitle="Usuarios"
          icon={<BsPersonSquare color="green" size={48} />}
        />
        <SummaryCard
          title={data?.numberOfArticles}
          subTitle="Artículos"
          icon={<BsCardHeading color="orange" size={48} />}
        />
        <SummaryCard
          title={3}
          subTitle="Cosa"
          icon={<BsPersonSquare color="red" size={48} />}
        />
        <SummaryCard
          title={refreshIn}
          subTitle="Actualización en"
          icon={<BsStopwatch color="blue" size={48} />}
        />
      </Row>
    </AdminLayout>
  );
};

export default DashboardPage;
