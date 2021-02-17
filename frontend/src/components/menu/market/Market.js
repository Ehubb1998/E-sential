import React, {useState} from "react";
import { useParams, useHistory } from "react-router-dom";
// import { motion } from "framer-motion";
import StockInfo from "./StockInfo";

const Market = (props) => {
    let urlStockInfo = false;
    const stockProps = props.stock;
    if (stockProps) {
        urlStockInfo = true;
    }
    // const [expandedDivId, setExpandedDivId] = useState("");
    const [inExpanded, setInExpanded] = useState(false);
    // const [finishedInitial, setFinishedInitial] = useState(false);
    const [clickedStock, setClickedStock] = useState("");
    const featuredStocks = ["SNAP", "AAPL", "TWTR", "TSLA", "NFLX", "FB", "MSFT", "DIS", "GPRO", "SBUX", "GME", "UBER"];

    const { stock } = useParams();

    const handleClick = (e) => {
        setInExpanded(true);
        const stockName = e.target.id;
        setClickedStock(stockName);
    }


    return (
        <>
        <div className="stockContent__div">
            <div className="portfolio__totalValue-container">
                <div className="totalValue__div">
                    {inExpanded === false && urlStockInfo === false ? <div className="totalValue">Featured Stocks</div> : urlStockInfo === true ? <div className="totalValue">{stock}</div> : <div className="totalValue">{clickedStock}</div>}
                </div>
            </div>
            <div className="totalValue__bottomBorder"></div>
            <div className="stockChart">
                <div className="featuredStocks__container">
                    <div className="featuredStocks__row">
                        <div onClick={handleClick} id="SNAP" className="featuredStocks__div"></div>
                        <div onClick={handleClick} id="AAPL" className="featuredStocks__div"></div>
                        <div onClick={handleClick} id="TWTR" className="featuredStocks__div"></div>
                        <div onClick={handleClick} id="TSLA" className="featuredStocks__div"></div>
                    </div>
                    <div className="featuredStocks__row">
                        <div onClick={handleClick} id="NFLX" className="featuredStocks__div"></div>
                        <div onClick={handleClick} id="FB" className="featuredStocks__div"></div>
                        <div onClick={handleClick} id="MSFT" className="featuredStocks__div"></div>
                        <div onClick={handleClick} id="DIS" className="featuredStocks__div"></div>
                    </div>
                    <div className="featuredStocks__row">
                        <div onClick={handleClick} id="GPRO" className="featuredStocks__div"></div>
                        <div onClick={handleClick} id="SBUX" className="featuredStocks__div"></div>
                        <div onClick={handleClick} id="GME" className="featuredStocks__div"></div>
                        <div onClick={handleClick} id="UBER" className="featuredStocks__div"></div>
                    </div>
                    <div style={{ height: "5vh" }}></div>
                    {/* {inExpanded === false && urlStockInfo === false ? featuredStocks.map((stock) => (
                        <div key={stock} id={stock} onClick={handleClick} className="featuredStocks__div"></div>
                    )) : urlStockInfo === true ? <StockInfo stock={stock} /> : <StockInfo stock={clickedStock} />} */}
                </div>
            </div>
        </div>
        </>
    )
}

export default Market;

// Idea to expand div into fullscreen
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