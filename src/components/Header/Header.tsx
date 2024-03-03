import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <>
      <div>
        <div className="flex flex-row justify-between pt-5 px-5 w-full">
          <Link href={"/"}>
            <Image src="/images/logo.svg" alt="logo" width={40} height={100} />
          </Link>
          <div>
            <ConnectButton
              accountStatus={"address"}
              chainStatus={"icon"}
              showBalance={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
