import React from "react";
import Particles from 'react-particles-js';

const NoStocks = (props) => {
    const portfolio = (
        <div className="buyStockDiv"><span className="buyStockSpan">Buy Stocks to see portfolio</span></div>
    );
    const watchLater = (
        <div className="buyStockDiv"><span className="buyStockSpan">Add Stocks to your Watch List</span></div>
    );
    const plans = (
        <div className="buyStockDiv"><span className="buyStockSpan">Create a Plan</span></div>
    )
    return (
        <>
        <div className="stockContent__div">
            {props.tab === "watchLater" ? watchLater : props.tab === "plans" ? plans : portfolio}
            <Particles
                className='particles'
                height="69.2vh"
                width="95.2vw"
                params={{
                    particles: {
                        color: {
                            value: 'rgb(0, 200, 5)',
                        },
                        number: {
                            value: 80,
                        },
                        size: {
                            value: 4,
                        },
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'repulse',
                            },
                        },
                    },
                }}
            />
        </div>
        </>
    )
}

export default NoStocks;