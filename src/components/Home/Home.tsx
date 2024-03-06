import Link from "next/link";

function Home() {
  return (
    <div className="flex flex-col  ">
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 mt-32 sm:mt-0">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-gray-200 sm:text-5xl xl:text-6xl/none">
                    Welcome to NFT Subscription Marketplace
                  </h1>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Discover exclusive NFT Subscriptions and unlock unique
                    benefits. Join the new era of digital ownership.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-700 shadow transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600 disabled:pointer-events-none disabled:opacity-50"
                    href="/buyer"
                  >
                    Explore Subscription
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-fuchsia-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-fuchsia-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600 disabled:pointer-events-none disabled:opacity-50"
                    href="/creator"
                  >
                    Create Subscription
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
