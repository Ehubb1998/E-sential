export const PORTFOLIO = "PORTFOLIO";
export const STOCKINFO = "STOCKINFO";
export const WATCHLIST = "WATCHLIST";
export const PLANS = "PLANS";

export const portfolio = data => ({ type: PORTFOLIO, data });
export const stockInfo = data => ({ type: STOCKINFO, data });
export const watchList = data => ({ type: WATCHLIST, data });
export const plans = data => ({ type: PLANS, data });

export const portfolioData = (id, token) => {
    return async (dispatch) => {
        const res = await fetch(`/api/stock_info/info/${id}/${token}/all/all`);

        const { StockInfo } = await res.json();
        dispatch(portfolio(StockInfo));
        window.localStorage.setItem("PORTFOLIO_SET", "true");
    }
}