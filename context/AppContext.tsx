import {
  CDP_CLIENT_API_KEY,
  PAYMENT_METHOD_OPTIONS,
} from "@/constants/constants";
import {
  OnrampNetwork,
  OnrampPaymentCurrency,
  OnrampPaymentMethod,
  OnrampPurchaseCurrency,
} from "@/constants/types";
import { fetchExchangeRate } from "@/utils/fetchExchangeRate";
import { fetchOnrampOptions } from "@coinbase/onchainkit/esm/fund/utils/fetchOnrampOptions";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AppContextType = {
  currency: OnrampPaymentCurrency | undefined;
  asset: OnrampPurchaseCurrency | undefined;
  fiatAmount: string;
  cryptoAmount: string;
  network: OnrampNetwork | undefined;
  paymentMethod: OnrampPaymentMethod;
  setCurrency: (currency: OnrampPaymentCurrency) => void;
  setAsset: (asset: OnrampPurchaseCurrency) => void;
  setFiatAmount: (amount: string) => void;
  setCryptoAmount: (asset: string) => void;
  setNetwork: (network: OnrampNetwork) => void;
  setPaymentMethod: (paymentMethod: OnrampPaymentMethod) => void;
  exchangeRate: number;
  setExchangeRate: (exchangeRate: number) => void;
  country: string;
  subdivision: string;
  dataLoading: boolean;
  setDataLoading: (dataLoading: boolean) => void;
  appLoading: boolean;
  setAppLoading: (appLoading: boolean) => void;
  appLoadingMessage: string;
  setAppLoadingMessage: (appLoadingMessage: string) => void;
  paymentCurrencies: OnrampPaymentCurrency[];
  purchaseCurrencies: OnrampPurchaseCurrency[];
  allNetworks: OnrampNetwork[];
  orderId: string | null;
  setOrderId: (orderId: string | null) => void;
  paymentLink: string | null;
  setPaymentLink: (paymentLink: string | null) => void;
  userPhoneNumber: string | null;
  setUserPhoneNumber: (phoneNumber: string | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<OnrampPaymentCurrency | undefined>(
    undefined
  );
  const [asset, setAsset] = useState<OnrampPurchaseCurrency | undefined>(
    undefined
  );
  const [fiatAmount, setFiatAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [network, setNetwork] = useState<OnrampNetwork | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD_OPTIONS[0]);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [country, setCountry] = useState("US");
  const [subdivision, setSubdivision] = useState("CA");
  const [dataLoading, setDataLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState(false);
  const [appLoadingMessage, setAppLoadingMessage] = useState("Loading...");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState<string | null>(null);
  const [paymentCurrencies, setPaymentCurrencies] = useState<
    OnrampPaymentCurrency[]
  >([]);
  const [purchaseCurrencies, setPurchaseCurrencies] = useState<
    OnrampPurchaseCurrency[]
  >([]);

  const allNetworks = useMemo(() => {
    return purchaseCurrencies
      .flatMap((c) => c.networks)
      .filter(
        (n, index, self) => self.findIndex((t) => t.name === n.name) === index
      );
  }, [purchaseCurrencies]);

  const handleFetchAllData = useCallback(async () => {
    setAppLoading(true);
    const options = await fetchOnrampOptions({
      apiKey: CDP_CLIENT_API_KEY,
      country,
      subdivision,
    });

    setPaymentCurrencies(options.paymentCurrencies);
    setPurchaseCurrencies(options.purchaseCurrencies);

    const initialCurrency =
      options.paymentCurrencies.find((c) => c.id === "USD") ??
      options.paymentCurrencies[0];
    setCurrency(initialCurrency);

    const initialAsset =
      options.purchaseCurrencies.find((c) =>
        c.networks.find((n) => n.name === "base")
      ) ?? options.purchaseCurrencies[0];
    setAsset(initialAsset);

    const initialNetwork = initialAsset.networks[0];

    setNetwork(initialNetwork);

    const exchangeRate = await fetchExchangeRate({
      asset: initialAsset,
      currency: initialCurrency,
      country,
      subdivision,
    });

    setExchangeRate(exchangeRate);

    setAppLoading(false);
  }, []);

  useEffect(() => {
    handleFetchAllData();
  }, []);

  const value = {
    currency,
    fiatAmount,
    cryptoAmount,
    network,
    paymentMethod,
    asset,
    exchangeRate,
    dataLoading,
    country,
    paymentLink,
    subdivision,
    setCurrency,
    setAsset,
    setFiatAmount,
    setCryptoAmount,
    setNetwork,
    setPaymentMethod,
    setExchangeRate,
    setCountry,
    setPaymentLink,
    setSubdivision,
    setDataLoading,
    appLoading,
    setAppLoading,
    appLoadingMessage,
    setAppLoadingMessage,
    paymentCurrencies,
    purchaseCurrencies,
    allNetworks,
    orderId,
    setOrderId,
    userPhoneNumber,
    setUserPhoneNumber,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
