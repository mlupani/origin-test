export interface Result {
    data:   Actions[];
    status: string;
}

export interface Actions {
    symbol:   string;
    name:     string;
    currency: Currency;
    exchange: Exchange;
    country:  Country;
    type:     Type;
}

export enum Country {
    UnitedKingdomOfGreatBritainAndNorthernIreland = "United Kingdom of Great Britain and Northern Ireland",
    UnitedStates = "United States",
    UnitedStatesOfAmerica = "United States of America",
}

export enum Currency {
    Usd = "USD",
}

export enum Exchange {
    Nyse = "NYSE",
}

export enum Type {
    AmericanDepositaryReceipt = "American Depositary Receipt",
    ClosedEndFund = "Closed-end Fund",
    Common = "Common",
    CommonStock = "Common Stock",
    DepositaryReceipt = "Depositary Receipt",
    Equity = "EQUITY",
    Etf = "ETF",
    ExchangeTradedNote = "Exchange-traded Note",
    LimitedPartnership = "Limited Partnership",
    PreferredStock = "Preferred Stock",
    RealEstateInvestmentTrustREIT = "Real Estate Investment Trust (REIT)",
    Trust = "Trust",
    Unit = "Unit",
    UnitOfBeneficialInterest = "Unit Of Beneficial Interest",
}
