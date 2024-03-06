import { useMbWallet } from "@mintbase-js/react";
function NearWallet() {
  const {
    connect,
    disconnect,
    activeAccountId,
    selector,
    isConnected,
    errorMessage,
  } = useMbWallet();
  // console.log("chainid", activeAccountId, "selector", selector, "isConnected");
  const handleSignout = async () => {
    try {
      const wallet = await selector.wallet();
      return wallet.signOut();
    } catch (e) {
      console.log("error at signout", e);
    }
  };

  const handleSignIn = async () => {
    try {
      return connect();
    } catch (e) {
      console.log("error at sign in", e);
    }
  };
  return (
    <>
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
    </>
  );
}

export default NearWallet;
