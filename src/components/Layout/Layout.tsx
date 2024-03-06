import Header from "../Header/Header";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="bg-gradient-to-r from-[#780206] to-[#061161] min-h-[100vh] flex flex-col w-full mx-auto py-5 bg-cover">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
