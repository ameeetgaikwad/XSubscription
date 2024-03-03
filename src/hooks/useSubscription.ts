import { useContractWrite } from "wagmi";
import subscriptionABI from "@/configs/abis/Subscription.json";
export const useSubscriptionContractWrite = ({
  address,
  args,
  ...rest
}: any) => {
  const {
    data,
    isError,
    isLoading,
    error,
    write,
    writeAsync,
    reset,
    isSuccess,
  } = useContractWrite({
    abi: subscriptionABI,
    address,
    functionName: "safeMint",
    args,
    ...rest,
  });
  return {
    data,
    isError,
    isLoading,
    error,
    write,
    writeAsync,
    reset,
    isSuccess,
  };
};
