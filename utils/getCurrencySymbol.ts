/**
 * Returns the currency symbol for the given currency code
 * @param currencyCode The ISO 4217 currency code (e.g., "USD", "EUR")
 * @returns The currency symbol (e.g., "$", "€")
 */
export const getCurrencySymbol = (currencyCode: string): string => {
  const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "Fr",
    CNY: "¥",
    HKD: "HK$",
    NZD: "NZ$",
    SEK: "kr",
    KRW: "₩",
    SGD: "S$",
    NOK: "kr",
    MXN: "$",
    INR: "₹",
    RUB: "₽",
    ZAR: "R",
    TRY: "₺",
    BRL: "R$",
    TWD: "NT$",
    DKK: "kr",
    PLN: "zł",
    THB: "฿",
    IDR: "Rp",
    HUF: "Ft",
    CZK: "Kč",
    ILS: "₪",
    CLP: "$",
    PHP: "₱",
    AED: "د.إ",
    COP: "$",
    SAR: "﷼",
    MYR: "RM",
    RON: "lei",
    ARS: "$",
    UAH: "₴",
    HRK: "kn",
    AZN: "₼",
    BDT: "৳",
    BGN: "лв",
    BHD: ".د.ب",
    BIF: "FBu",
    BMD: "$",
    BND: "B$",
    BOB: "Bs.",
    BSD: "B$",
    BTN: "Nu.",
    BWP: "P",
    BYN: "Br",
    BZD: "BZ$",
    CRC: "₡",
    CUP: "₱",
    CVE: "Esc",
    DJF: "Fdj",
    DOP: "RD$",
    DZD: "دج",
    EGP: "E£",
    ETB: "Br",
    FJD: "FJ$",
    FKP: "£",
    GEL: "₾",
    GHS: "GH₵",
    GIP: "£",
    GMD: "D",
    GNF: "FG",
    GTQ: "Q",
    GYD: "G$",
    HNL: "L",
    HTG: "G",
    IQD: "ع.د",
    IRR: "﷼",
    ISK: "kr",
    JMD: "J$",
    JOD: "JD",
    KES: "KSh",
    KGS: "лв",
    KHR: "៛",
    KMF: "CF",
    KWD: "د.ك",
    KYD: "$",
    KZT: "₸",
    LAK: "₭",
    LBP: "ل.ل",
    LKR: "₨",
    LRD: "$",
    LSL: "L",
    LYD: "ل.د",
    MAD: "د.م.",
    MDL: "L",
    MGA: "Ar",
    MKD: "ден",
    MMK: "K",
    MNT: "₮",
    MOP: "MOP$",
    MRU: "UM",
    MUR: "₨",
    MVR: "Rf",
    MWK: "MK",
    MZN: "MT",
    NAD: "$",
    NGN: "₦",
    NIO: "C$",
    NPR: "₨",
    OMR: "ر.ع.",
    PAB: "B/.",
    PEN: "S/.",
    PGK: "K",
    PKR: "₨",
    PYG: "₲",
    QAR: "ر.ق",
    RSD: "дин.",
    RWF: "RF",
    SBD: "SI$",
    SCR: "SR",
    SDG: "ج.س.",
    SHP: "£",
    SLL: "Le",
    SOS: "S",
    SRD: "$",
    SSP: "£",
    STN: "Db",
    SYP: "£S",
    SZL: "E",
    TJS: "ЅМ",
    TMT: "m",
    TND: "د.ت",
    TOP: "T$",
    TTD: "TT$",
    TZS: "TSh",
    UGX: "USh",
    UYU: "$U",
    UZS: "лв",
    VES: "Bs",
    VND: "₫",
    VUV: "VT",
    WST: "WS$",
    XAF: "FCFA",
    XCD: "EC$",
    XOF: "CFA",
    XPF: "₣",
    YER: "﷼",
    ZMW: "ZK",
  };

  const code = currencyCode.toUpperCase();
  return CURRENCY_SYMBOLS[code] || code;
};
