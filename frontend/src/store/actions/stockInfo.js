export const PORTFOLIO = "PORTFOLIO";
export const FINISHEDLOADING = "FINISHEDLOADING";
export const PORTFOLIOSTOCKCHARTS = "PORTFOLIOSTOCKCHARTS";
export const FEATUREDSTOCKS = "FEATUREDSTOCKS";
export const BACKBUTTON = "BACKBUTTON";
export const STOCKINFO = "STOCKINFO";
export const WATCHLIST = "WATCHLIST";
export const PLANS = "PLANS";

export const portfolio = data => ({ type: PORTFOLIO, data });
export const portfolioStockCharts = data => ({ type: PORTFOLIOSTOCKCHARTS, data });
export const featuredStocks = data => ({ type: FEATUREDSTOCKS, data });
export const backButton = boolean => ({ type: BACKBUTTON, boolean });
export const finishedLoading = boolean => ({ type: FINISHEDLOADING, boolean });
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

export const buyStock = (id, token, stockSymbol, numShares, pps) => {
    return async () => {
        try {
            const res = await fetch("/api/stock_info/", {
                method: "POST",
                body: JSON.stringify({ userId: id, token: token, stockSymbol: stockSymbol, numShares: numShares, pps: pps }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw res;
            }
            portfolioData(id, token);

        } catch (err) {
            const error = await err.json();
            console.error(error);
        }
    }
}