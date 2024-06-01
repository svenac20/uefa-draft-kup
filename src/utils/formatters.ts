export function getMarketValue(marketValue: string, marketValueNumeral: string, marketValueCurrency: string) {
  //if its valid number
  if (marketValue.includes(",")) {
    const sanitizedInput = marketValue.replace(",", ".")
    const numberValue = parseFloat(sanitizedInput)
    const numberValueString = numberValue.toFixed(0)
  
    marketValueNumeral = marketValueNumeral.includes("mil") ? "M" : "K"
  
    return numberValueString + marketValueNumeral + marketValueCurrency.toLocaleUpperCase()
  }
  return "0";
}

