export type BaseResponse = {
    success: boolean;
    message?: string;
    details?: any;
    error?: any;
};
export declare enum SubscriptionStatus {
    ACTIVE = "active",
    TRIAL = "trial",
    CANCELED = "canceled",
    EXPIRED = "expired"
}
export declare enum TransactionStatus {
    INITIATED = "initiated",
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed"
}
export declare enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare enum EnrollmentStatus {
    ACTIVE = "active",
    COMPLETED = "completed"
}
export interface ContactBody {
    name: string;
    email: string;
    company?: string;
    phoneCode?: string;
    phoneNumber?: string;
    message: string;
}
export declare enum TransactionType {
    PAYMENT = "PAYMENT",
    REFUND = "REFUND",
    PAYOUT = "PAYOUT",
    SUBSCRIPTION = "SUBSCRIPTION"
}
export declare enum EntityType {
    INSTRUCTOR = "INSTRUCTOR",
    COURSE = "COURSE",
    LESSON = "LESSON"
}
export declare enum CourseLevel {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED"
}
export declare enum PricingModel {
    FREE = "FREE",
    PAID = "PAID"
}
export interface BaseQueryParams {
    page?: number;
    resultsPerPage?: number;
}
export type BaseListResponse<T> = {
    success: boolean;
    totalRecords: number;
    details: T[];
    message?: string;
    error?: any;
};
export declare enum FileType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    DOC = "DOCUMENT"
}
export declare enum FileMimeType {
    TEXT_PLAIN = "text/plain",
    TEXT_HTML = "text/html",
    APPLICATION_JSON = "application/json",
    APPLICATION_XML = "application/xml",
    APPLICATION_PDF = "application/pdf",
    APPLICATION_MSWORD = "application/msword",
    APPLICATION_EXCEL = "application/vnd.ms-excel",
    APPLICATION_POWERPOINT = "application/vnd.ms-powerpoint",
    IMAGE_JPEG = "image/jpeg",
    IMAGE_PNG = "image/png",
    IMAGE_GIF = "image/gif",
    AUDIO_MPEG = "audio/mpeg",
    AUDIO_WAV = "audio/wav",
    VIDEO_MP4 = "video/mp4",
    VIDEO_MPEG = "video/mpeg"
}
export type BaseTokenPayload = {
    id: string;
    sessionId: string;
    expired?: number;
};
export type AccessTokenPayload = BaseTokenPayload & {
    type: 'access';
    userInfoId?: string;
};
export type RefreshTokenPayload = BaseTokenPayload & {
    type: 'refresh';
};
export type ResetTokenPayload = {
    userId: string;
    type: 'reset';
};
export declare enum Currency {
    UNITED_ARAB_EMIRATES_DIRHAM = "AED",
    AFGHAN_AFGHANI = "AFN",
    ALBANIAN_LEK = "ALL",
    ARMENIAN_DRAM = "AMD",
    NETHERLANDS_ANTILLEAN_GUILDER = "ANG",
    ANGOLAN_KWANZA = "AOA",
    ARGENTINE_PESO = "ARS",
    AUSTRALIAN_DOLLAR = "AUD",
    ARUBAN_FLORIN = "AWG",
    AZERBAIJANI_MANAT = "AZN",
    BOSNIA_HERZEGOVINA_CONVERTIBLE_MARK = "BAM",
    BARBADIAN_DOLLAR = "BBD",
    BANGLADESHI_TAKA = "BDT",
    BULGARIAN_LEV = "BGN",
    BAHRAINI_DINAR = "BHD",
    BURUNDIAN_FRANC = "BIF",
    BERMUDIAN_DOLLAR = "BMD",
    BRUNEI_DOLLAR = "BND",
    BOLIVIAN_BOLIVIANO = "BOB",
    BOLIVIAN_MVDOL = "BOV",
    BRAZILIAN_REAL = "BRL",
    BAHAMIAN_DOLLAR = "BSD",
    BHUTANESE_NGULTRUM = "BTN",
    BOTSWANAN_PULA = "BWP",
    BELARUSIAN_RUBLE = "BYR",
    BELIZE_DOLLAR = "BZD",
    CANADIAN_DOLLAR = "CAD",
    CONGOLESE_FRANC = "CDF",
    SWISS_FRANC = "CHF",
    CHILEAN_UNIT_OF_ACCOUNT = "CLF",
    CHILEAN_PESO = "CLP",
    CHINESE_YUAN = "CNY",
    COLOMBIAN_PESO = "COP",
    COLOMBIAN_REAL_VALUE_UNIT = "COU",
    COSTA_RICAN_COLON = "CRC",
    CUBAN_PESO = "CUP",
    CAPE_VERDEAN_ESCUDO = "CVE",
    CZECH_REPUBLIC_KORUNA = "CZK",
    DJIBOUTIAN_FRANC = "DJF",
    DANISH_KRONE = "DKK",
    DOMINICAN_PESO = "DOP",
    ALGERIAN_DINAR = "DZD",
    EGYPTIAN_POUND = "EGP",
    ERITREAN_NAKFA = "ERN",
    ETHIOPIAN_BIRR = "ETB",
    EURO = "EUR",
    FIJIAN_DOLLAR = "FJD",
    FALKLAND_ISLANDS_POUND = "FKP",
    BRITISH_POUND_STERLING = "GBP",
    GEORGIAN_LARI = "GEL",
    GHANAIAN_CEDI = "GHS",
    GIBRALTAR_POUND = "GIP",
    GAMBIAN_DALASI = "GMD",
    GUINEAN_FRANC = "GNF",
    GUATEMALAN_QUETZAL = "GTQ",
    GUYANAESE_DOLLAR = "GYD",
    HONG_KONG_DOLLAR = "HKD",
    HONDURAN_LEMPIRA = "HNL",
    CROATIAN_KUNA = "HRK",
    HAITIAN_GOURDE = "HTG",
    HUNGARIAN_FORINT = "HUF",
    INDONESIAN_RUPIAH = "IDR",
    ISRAELI_NEW_SHEQEL = "ILS",
    INDIAN_RUPEE = "INR",
    IRAQI_DINAR = "IQD",
    IRANIAN_RIAL = "IRR",
    ICELANDIC_KRONA = "ISK",
    JAMAICAN_DOLLAR = "JMD",
    JORDANIAN_DINAR = "JOD",
    JAPANESE_YEN = "JPY",
    KENYAN_SHILLING = "KES",
    KYRGYSTANI_SOM = "KGS",
    CAMBODIAN_RIEL = "KHR",
    COMORIAN_FRANC = "KMF",
    NORTH_KOREAN_WON = "KPW",
    SOUTH_KOREAN_WON = "KRW",
    KUWAITI_DINAR = "KWD",
    CAYMAN_ISLANDS_DOLLAR = "KYD",
    KAZAKHSTANI_TENGE = "KZT",
    LAOTIAN_KIP = "LAK",
    LEBANESE_POUND = "LBP",
    SRI_LANKAN_RUPEE = "LKR",
    LIBERIAN_DOLLAR = "LRD",
    LESOTHO_LOTI = "LSL",
    LITHUANIAN_LITAS = "LTL",
    LATVIAN_LATS = "LVL",
    LIBYAN_DINAR = "LYD",
    MOROCCAN_DIRHAM = "MAD",
    MOLDOVAN_LEU = "MDL",
    MALAGASY_ARIARY = "MGA",
    MACEDONIAN_DENAR = "MKD",
    MYANMAR_KYAT = "MMK",
    MONGOLIAN_TUGRIK = "MNT",
    MACANESE_PATACA = "MOP",
    MAURITIAN_RUPEE = "MUR",
    MALDIVIAN_RUFIYAA = "MVR",
    MALAWIAN_KWACHA = "MWK",
    MEXICAN_PESO = "MXN",
    MEXICAN_UNIDAD_DE_INVERSION = "MXV",
    MALAYSIAN_RINGGIT = "MYR",
    MOZAMBICAN_METICAL = "MZN",
    NAMIBIAN_DOLLAR = "NAD",
    NIGERIAN_NAIRA = "NGN",
    NICARAGUAN_CORDOBA = "NIO",
    NORWEGIAN_KRONE = "NOK",
    NEPALESE_RUPEE = "NPR",
    NEW_ZEALAND_DOLLAR = "NZD",
    OMANI_RIAL = "OMR",
    PANAMANIAN_BALBOA = "PAB",
    PERUVIAN_NUEVO_SOL = "PEN",
    PAPUA_NEW_GUINEAN_KINA = "PGK",
    PHILIPPINE_PESO = "PHP",
    PAKISTANI_RUPEE = "PKR",
    POLISH_ZLOTY = "PLN",
    PARAGUAYAN_GUARANI = "PYG",
    QATARI_RIAL = "QAR",
    ROMANIAN_LEU = "RON",
    SERBIAN_DINAR = "RSD",
    RUSSIAN_RUBLE = "RUB",
    RWANDAN_FRANC = "RWF",
    SAUDI_RIYAL = "SAR",
    SOLOMON_ISLANDS_DOLLAR = "SBD",
    SEYCHELLOIS_RUPEE = "SCR",
    SUDANESE_POUND = "SDG",
    SWEDISH_KRONA = "SEK",
    SINGAPORE_DOLLAR = "SGD",
    SAINT_HELENA_POUND = "SHP",
    SIERRA_LEONEAN_LEONE = "SLL",
    SOMALI_SHILLING = "SOS",
    SURINAMESE_DOLLAR = "SRD",
    SOUTH_SUDANESE_POUND = "SSP",
    SALVADORAN_COLON = "SVC",
    SYRIAN_POUND = "SYP",
    SWAZI_LILANGENI = "SZL",
    THAI_BAHT = "THB",
    TAJIKISTANI_SOMONI = "TJS",
    TURKMENISTANI_MANAT = "TMT",
    TUNISIAN_DINAR = "TND",
    TONGAN_PANGA = "TOP",
    TURKISH_LIRA = "TRY",
    TRINIDAD_AND_TOBAGO_DOLLAR = "TTD",
    NEW_TAIWAN_DOLLAR = "TWD",
    TANZANIAN_SHILLING = "TZS",
    UKRAINIAN_HRYVNIA = "UAH",
    UGANDAN_SHILLING = "UGX",
    UNITED_STATES_DOLLAR = "USD",
    URUGUAYAN_PESO = "UYU",
    UZBEKISTAN_SOM = "UZS",
    VIETNAMESE_DONG = "VND",
    VANUATU_VATU = "VUV",
    SAMOAN_TALA = "WST",
    EAST_CARIBBEAN_DOLLAR = "XCD",
    YEMENI_RIAL = "YER",
    SOUTH_AFRICAN_RAND = "ZAR",
    ZAMBIAN_KWACHA = "ZMW",
    ZIMBABWEAN_DOLLAR = "ZWL"
}
