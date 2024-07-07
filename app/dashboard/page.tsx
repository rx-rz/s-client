import { getCustomerDetails } from "./core/actions";

const DashboardPage = async () => {
  const { response } = await getCustomerDetails({
    email: "adeleyetemiloluwa674@gmail.com",
  });

  return <div>Dashboard</div>;
};

export default DashboardPage;
