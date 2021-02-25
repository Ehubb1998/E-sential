import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StockInfo from "./StockInfo";
import MiniStockData from "./MiniStockData";
import { backButton, featuredStocks } from "../../../store/actions/stockInfo";
import { finishedLoading } from "../../../store/actions/stockInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Market = (props) => {
    let urlStockInfo = false;
    const stockProps = props.stock;
    if (stockProps) {
        if (stockProps === "backButton") {
            window.localStorage.removeItem("back");
            window.localStorage.removeItem("component");
        } else {
            urlStockInfo = true;
        }
    }

    const dispatch = useDispatch();
    const backButtonRedux = useSelector(state => state.stockDataReducer.backButton);
    const featuredCharts = useSelector(state => state.stockDataReducer.featuredStocks);
    const [inExpanded, setInExpanded] = useState(false);
    const [clickedStock, setClickedStock] = useState("");
    const [loading, setLoading] = useState(true);
    const [miniStocks, setMiniStocks] = useState([]);
    const [iconColor, setIconColor] = useState("black");
    const [addedToWL, setAddedToWL] = useState(false);
    const [alreadyInWL, setAlreadyInWL] = useState(false);
    const featuredStockArray = ["SNAP", "AAPL", "TWTR", "TSLA", "NFLX", "FB", "MSFT", "DIS", "GPRO", "SBUX", "GME", "UBER"];
    const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");
    const userId = window.localStorage.getItem("ESENTIAL_USER_ID");
    
    const { stock } = useParams();

    const handleClick = (e) => {
        setInExpanded(true);
        const stockName = e.currentTarget.id;
        setClickedStock(stockName);
    }
    const overIcon = () => {
        setIconColor("green");
    }
    const leftIcon = () => {
        setIconColor("black");
    }
    const addToWatchListFunc = async () => {
        let stockName;
        if (clickedStock) {
            stockName = clickedStock.toLowerCase();
        } else {
            stockName = stock
        }
        const watchListApi = await fetch("api/watch_list/", {
            method: "POST",
            body: JSON.stringify({ userId: userId, stockName: stockName, token: token }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const results = await watchListApi.json();
        if (results === "Stock already in watch list") {
            setAlreadyInWL(true);
        } else {
            setAddedToWL(true);
        }
    }
    if (addedToWL || alreadyInWL) {
        setTimeout(() => {
            if (addedToWL) {
                setAddedToWL(false);
            } else {
                setAlreadyInWL(false);
            }
        }, 2000);
    }

    const stockApi = async (timeFrame, nameOfStock) => {
        const chartRequests = await fetch(`/api/stock_info/chart/${timeFrame}/${token}/${nameOfStock}`);
        if (timeFrame === "company") {
            const { CompanyInfo } = await chartRequests.json();
            return CompanyInfo
        }
        const { StockChart } = await chartRequests.json();
        const half = Math.ceil(StockChart.length / 2);
        const rightHalf = StockChart.splice(half, StockChart.length - 1);
        const halfOfRight = Math.ceil(rightHalf.length / 2);
        const rightOfHalf = rightHalf.splice(halfOfRight, StockChart.length - 1);
        return rightOfHalf;
    }

    const featuredStockData = async (stockArray, timeFrame) => {
        let stockDataArray = [];
        for (let i = 0; i < stockArray.length; i++) {
            let stock = stockArray[i];

            const stockChart = await stockApi(timeFrame, stock);
            const companyInfo = await stockApi("company", stock);

            stockChart["company"] = companyInfo.companyName;
            stockChart["symbol"] = companyInfo.symbol;
            let lastObj = stockChart[stockChart.length - 1];
            let currentPPS = lastObj.close;
            stockChart["currentPPS"] = currentPPS;
            stockDataArray.push(stockChart);
        }
        return stockDataArray;
    }

    useEffect(() => {
        dispatch(finishedLoading(false))
        if (backButtonRedux === true) {
            setInExpanded(false);
            dispatch(backButton(false));
        }
        const featuredStocksFunc = async () => {
            if (featuredCharts && loading === true) {
                setLoading(false);
                setMiniStocks(featuredCharts);
                return;
            }
            if (loading === true) {
                const stockData = await featuredStockData(featuredStockArray, "today");
                setMiniStocks(stockData);
                setLoading(false);
                dispatch(featuredStocks(stockData))
            }
        }
        featuredStocksFunc();
        // eslint-disable-next-line
    }, [backButtonRedux]);

    const loadingWheel = (
        <div id="loader">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );

    return (
        <>
        <div className="stockContent__div">
            <div className="portfolio__totalValue-container">
                <div style={{ justifyContent: "flex-start" }} className="totalValue__div">
                    {inExpanded === false && urlStockInfo === false ? <div className="totalValue">Featured Stocks</div> : urlStockInfo === true ? <div className="totalValue">{stock.toUpperCase()}</div> : <div className="totalValue">{clickedStock}</div>}
                    {inExpanded || urlStockInfo ? <div onMouseEnter={overIcon} onMouseLeave={leftIcon} onClick={addToWatchListFunc} style={{ marginLeft: "1.5%", cursor: "pointer" }}>
                        {iconColor === "green" ? <FontAwesomeIcon icon={faEye} size="lg" color="rgb(0, 200, 5)" /> : <FontAwesomeIcon size="lg" icon={faEye} />}
                    </div> : <></>}
                    {addedToWL ? <p style={{ color: "rgb(0, 200, 5)", marginLeft: "1.5%" }}>Added To Watch List</p> : alreadyInWL ? <p style={{ color: "#ff4400", marginLeft: "1.5%" }}>Already In Watch List</p> : <></>}
                </div>
            </div>
            <div className="totalValue__bottomBorder"></div>
            <div style={(loading === false && featuredCharts && inExpanded === false && urlStockInfo === false) || (loading === false && inExpanded === false && urlStockInfo === false) ? {} : { height: "67%" }} className="stockChart">
                {(loading === false && featuredCharts && inExpanded === false && urlStockInfo === false) || (loading === false && inExpanded === false && urlStockInfo === false) ? <div className="featuredStocks__container">
                    <div className="featuredStocks__row">
                        <div onClick={handleClick} id="SNAP" className="featuredStocks__div hvr-grow"><MiniStockData i={0} stockArray={miniStocks} /></div>
                        <div onClick={handleClick} id="AAPL" className="featuredStocks__div hvr-grow"><MiniStockData i={1} stockArray={miniStocks} /></div>
                        <div onClick={handleClick} id="TWTR" className="featuredStocks__div hvr-grow"><MiniStockData i={2} stockArray={miniStocks} /></div>
                        <div onClick={handleClick} id="TSLA" className="featuredStocks__div hvr-grow"><MiniStockData i={3} stockArray={miniStocks} /></div>
                    </div>
                    <div className="featuredStocks__row">
                        <div onClick={handleClick} id="NFLX" className="featuredStocks__div hvr-grow"><MiniStockData i={4} stockArray={miniStocks} /></div>
                        <div onClick={handleClick} id="FB" className="featuredStocks__div hvr-grow"><MiniStockData i={5} stockArray={miniStocks} /></div>
                        <div onClick={handleClick} id="MSFT" className="featuredStocks__div hvr-grow"><MiniStockData i={6} stockArray={miniStocks} /></div>
                        <div onClick={handleClick} id="DIS" className="featuredStocks__div hvr-grow"><MiniStockData i={7} stockArray={miniStocks} /></div>
                    </div>
                    <div className="featuredStocks__row">
                        <div onClick={handleClick} id="GPRO" className="featuredStocks__div hvr-grow"><MiniStockData i={8} stockArray={miniStocks} /></div>
                        <div onClick={handleClick} id="SBUX" className="featuredStocks__div hvr-grow"><MiniStockData i={9} stockArray={miniStocks} /></div>
                        <div onClick={handleClick} id="GME" className="featuredStocks__div hvr-grow"><MiniStockData i={10} stockArray={miniStocks} /></div>
                        <div onClick={handleClick} id="UBER" className="featuredStocks__div hvr-grow"><MiniStockData i={11} stockArray={miniStocks} /></div>
                    </div>
                    <div style={{ height: "5vh" }}></div>
                </div> : urlStockInfo === true ? <StockInfo stock={stock} stockURL={stock} /> : loading ? loadingWheel : <StockInfo stock={clickedStock} />}
            </div>
        </div>
        </>
    )
}

export default Market;

// Idea to expand div into fullscreen
// import { motion } from "framer-motion";

// const [expandedDivId, setExpandedDivId] = useState("");
// const [finishedInitial, setFinishedInitial] = useState(false);

// const testDiv = (
//     <>
//     <motion.div
//         id={expandedDivId}
//         className="featuredStocks__div-expanded"
//         initial={{ width: "22%", height: "32%" }}
//         animate={{ width: "97%", height: "49%" }}
//         transition={{ duration: 0.2 }}
//     ></motion.div>
//     </>
// )

    // <>
    // <div className={inExpanded === false ? "stockContent__div" : "stockContent__div-expanded"}>
    //     <div className="portfolio__totalValue-container">
    //         <div className="totalValue__div">
    //             <div className="totalValue">Featured Stocks</div>
    //         </div>
    //     </div>
    //     <div className="totalValue__bottomBorder"></div>
    //     <div style={{ height: "150%" }} className="stockChart">
    //         {inExpanded === false ? <div className="featuredStocks__container">
    //             {inExpanded === false ? featuredStocks.map((stock) => (
    //                 <div id={stock} onClick={expandDiv} className="featuredStocks__div"></div>
    //             )) : stockInfo}
    //         </div> : finishedInitial === true ? stockInfoTransition : initialTransitionLeft }
    //     </div>
    // </div>
    // </>


        // const expandDiv = (e) => {
    //     setExpandedDivId(e.target.id);
    //     setInExpanded(true);
    // }

    // const stockInfo = (
    //     <>
    //     <h2>Test</h2>
    //     </>
    // );

    // const initialTransitionLeft = (
    //     <>
    //     <motion.div
    //         className="featuredStocks__container"
    //         initial={{ x: 0 }}
    //         animate={{ x: "-100%" }}
    //         transition={{ duration: 1 }}
    //     >
    //         {featuredStocks.map((stock) => (
    //             <div id={stock} onClick={expandDiv} className="featuredStocks__div"></div>
    //         ))}
    //     </motion.div>
    //     </>
    // )

    // const stockInfoTransition = (
    //     <>
    //     <motion.div
    //         initial={{ x: "100" }}
    //         animate={{ x: 0 }}
    //         transition={{ duration: 1 }}
    //     >
    //         {stockInfo}
    //     </motion.div>
    //     </>
    // )

    // setTimeout(() => {
    //     setFinishedInitial(true);
    // }, 2000);