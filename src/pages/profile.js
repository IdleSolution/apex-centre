import React, { Component } from "react";
import axios from "axios";

import "./tracker.scss";

//components
import Layout from "../components/Layout/Layout";
import Spinner from "./../../src/components/UI/Spinner/Spinner";
import BasicInfo from "../components/Tracker/BasicInfo";
import Stat from "../components/Tracker/Stat";
import FavoriteLegend from "../components/Tracker/FavoriteLegend";
import Legend from "../components/Tracker/Legend";
import Button from "../components/UI/Button/Button";
import Rank from "./../components/Tracker/Rank";

//images
import img from "./img.png";
import bloodhound from "./../../static/img/tracker/Bloodhound.png";
import bangalore from "./../../static/img/tracker/Bangalore.png";
import caustic from "./../../static/img/tracker/Caustic.png";
import lifeline from "./../../static/img/tracker/Lifeline.png";
import mirage from "./../../static/img/tracker/Mirage.png";
import pathfinder from "./../../static/img/tracker/Pathfinder.png";
import wraith from "./../../static/img/tracker/Wraith.png";
import octane from "./../../static/img/tracker/Octane.png";

class Profile extends Component {
    state = {
        loading: false,
        showStats: false,
        stats: null,
        username: "",
        overallStats: {},
        platform: "PC",
        err: null,
        updateBlock: false,
        rank: null
    };

    componentDidMount() {
        const { search } = this.props.location;
        const username = search.match(/username=([^&]*)/);
        const platform = search.match(/platform=([^&]*)/);
        this.setState(
            {
                username: username[1],
                platform: platform[1].toUpperCase()
            },
            () => {
                this.onSearchUser();
            }
        );
    }

    onApplyStats = res => {
        const stats = res.data.legends.all;
        const keys = Object.keys(stats);
        let allKills = 0;
        let mostKills = 0;
        let overallStats = {};
        for (let key of keys) {
            if (stats[key].data) {
                let kills = parseInt(stats[key].data[0].value);
                allKills += kills;
                if(kills > mostKills) {
                    mostKills = kills;
                    overallStats.favoriteLegend = this.onCheckImage(key.toLocaleLowerCase());
                }
            }
        }
        overallStats.allKills = allKills;

        this.setState({
            overallStats: overallStats,
            stats: res.data,
            loading: false,
            showStats: true,
            rank: res.data.global.rank
        });
    };

    onSearchUser = () => {
        this.setState({ loading: true });
        axios
            .post(`https://cors-anywhere.herokuapp.com/https://api.mozambiquehe.re/bridge?version=4&platform=${this.state.platform}&player=${this.state.username}&auth=QQezd3iX7D1z7m6MexoR`, {
                authorization: "QQezd3iX7D1z7m6MexoR",
                username: this.state.username,
                platform: this.state.platform
            })
            .then(res => {
                this.onApplyStats(res);
            })

            .catch(e => {
                if (e.response) {
                    this.setState({ err: e.response.statusText });
                } else {
                    this.setState({ err: "Network Error. Try again later" });
                }
            });
    };


    onChangeUsername = e => {
        this.setState({ username: e.target.value });
    };

    onCheckImage = legend => {
        switch (legend) {
            case "bangalore":
                return bangalore;
            case "bloodhound":
                return bloodhound;
            case "caustic":
                return caustic;
            case "lifeline":
                return lifeline;
            case "mirage":
                return mirage;
            case "pathfinder":
                return pathfinder;
            case "wraith":
                return wraith;
            case "octane":
                return octane;
            default:
                return bloodhound;
        }
    };

    render() {
        let stat = [];
        if (this.state.stats) {
            const keys = Object.keys(this.state.stats.legends.all);
            for (let key of keys) {
                if (this.state.stats.legends.all[key].data) {
                    stat.push(
                        <Legend
                            name={key}
                            stats={this.state.stats.legends.all[key].data}
                            image={this.onCheckImage(key.toLowerCase())}
                        />
                    );
                }
            }
        }

        console.log(stat);

        if (!this.state.showStats) {
            if (this.state.err) {
                this.props.navigate(
                    `/tracker?err=${this.state.err.split(" ").join("_")}`
                );

                return <div />;
            } else {
                return (
                    <Layout>
                        <main className="account__loading-container">
                            <Spinner />
                        </main>
                    </Layout>
                );
            }
        }

        return (
            <Layout>
                <main className="tracking-container">
                    <BasicInfo
                        avatar={img}
                        username={this.state.stats.global.name}
                        platform={this.state.platform}
                    />

                    <div className="account-all-stats">
                        <div className="account-important-info">
                            <div className="account-overview">
                                <div className="account-overview-heading-container">
                                    <h3 className="account-stats-heading">
                                        Overview
                                    </h3>
                                </div>

                                <div className="account-overview-stats">
                                    <Stat
                                        name="Level"
                                        amount={this.state.stats.global.level}
                                        account
                                    />
                                    <Stat
                                        name="Kills"
                                        amount={
                                            this.state.overallStats.allKills
                                        }
                                        account
                                    />
                                </div>
                            </div>

                            <Rank
                                rankScore={this.state.rank.rankScore}
                                rankName={this.state.rank.rankName}
                                rankDiv={this.state.rank.rankDiv}
                                rankImg={this.state.rank.rankImg}
                            />

                            <FavoriteLegend
                                image={this.state.overallStats.favoriteLegend}
                            />
                        </div>

                        <div className="champions-container">{stat}</div>
                    </div>
                </main>
            </Layout>
        );
    }
}

export default Profile;
