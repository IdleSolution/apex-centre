import React from "react";

const Rank = props => (
    <div>
        <div className="account-overview-heading-container">
            <h3 className="account-stats-heading">Rank</h3>
        </div>

        <div className="rank">
            <div className="rank-img-container">
                <img
                    className="rank-img"
                    src={props.rankImg}
                    alt=""
                />
            </div>
            <div className="rank-info">
                <p className="rank-exact">{props.rankName} {props.rankDiv}</p>
                <p>{props.rankScore} RP</p>
            </div>
        </div>
    </div>
);

export default Rank;
