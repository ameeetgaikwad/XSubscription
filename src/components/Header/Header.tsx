import Image from "next/image";
import Link from "next/link";
import { useMbWallet } from "@mintbase-js/react";

function Header() {
  const { isConnected, selector, connect, activeAccountId } = useMbWallet();

  const handleSignout = async () => {
    const wallet = await selector.wallet();
    return wallet.signOut();
  };

  const handleSignIn = async () => {
    return connect();
  };

  return (
    <>
      <div>
        <div className="flex flex-row justify-between pt-5 px-5 w-full">
          <Link href={"/"}>
            <Image src="/images/logo.svg" alt="logo" width={40} height={100} />
          </Link>
          <div>
            {!isConnected ? (
              <button
                onClick={handleSignIn}
                className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-700 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 "
              >
                Connect Wallet
              </button>
            ) : (
              <div>
                <p>You are connected as {activeAccountId}</p>
                <div className="flex justify-center items-center mt-4">
                  <button
                    className="bg-white text-black rounded p-3 hover:bg-[#e1e1e1]"
                    onClick={handleSignout}
                  >
                    Disconnect{" "}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
