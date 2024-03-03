import { useContractRead, useContractWrite } from "wagmi";
import factoryABI from "@/configs/abis/Factory.json";
export const useFactoryContractWrite = ({ args }: any) => {
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
    abi: factoryABI,
    address: "0x466848Cc475fbb9b922a5c95E4306f79c1B00497",
    functionName: "deployContract",
    args,
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

export const useFactoryContractRead = ({ args, functionName }: any) => {
  const { data, isError, isLoading, error, refetch } = useContractRead({
    // @ts-ignore
    address: "0x466848Cc475fbb9b922a5c95E4306f79c1B00497",
    abi: factoryABI,
    functionName,
    args,
  });
  return { data, isError, isLoading, error, refetch };
};

export const useNumberOfTokens = ({ args }: any) => {
  const data = useFactoryContractRead({
    args,
    functionName: "numberOfTokensOfAddress",
  });
  return data;
};
export const useNFTAddress = ({ args }: any) => {
  const data = useFactoryContractRead({
    args,
    functionName: "addressToTokenAddress",
  });
  return data;
};
