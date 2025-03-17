export function formatCurrencyValue(value, currency = "USD") {
	if (value === undefined || value === null) return "N/A";

	const formatter = new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 6,
	});
	return formatter.format(value);
}

export function formatMarketCap(value, currency = "USD") {
	if (!value) return "N/A";

	const formatter = new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});
	const symbol = formatter.format(0).replace(/[0-9]/g, "").trim();

	if (value >= 1_000_000_000_000) {
		return `${symbol}${(value / 1_000_000_000_000).toFixed(2)}T`;
	} else if (value >= 1_000_000_000) {
		return `${symbol}${(value / 1_000_000_000).toFixed(2)}B`;
	} else if (value >= 1_000_000) {
		return `${symbol}${(value / 1_000_000).toFixed(2)}M`;
	} else if (value >= 1_000) {
		return `${symbol}${(value / 1_000).toFixed(2)}K`;
	} else {
		return formatCurrencyValue(value, currency);
	}
}

export function getPriceChangeClass(value) {
	return value < 0 ? "text-red-500 font-medium" : "text-green-500 font-medium";
}
