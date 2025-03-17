import API from "./API";

export default {
    getCryptoData(params = {}) {
        const defaultParams = {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
            price_change_percentage: "24h"
        };
        
        const queryParams = { ...defaultParams, ...params };
        
        return API().get('/coins/markets', { params: queryParams });
    }
}