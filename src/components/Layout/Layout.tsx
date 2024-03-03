import Header from "../Header/Header";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="bg-[url('/images/bg.png')] min-h-[100vh] flex flex-col w-full mx-auto py-5 bg-cover">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
