import {useRouter} from "next/router";
import { Web3Auth } from "@web3auth/web3auth";
import { ADAPTER_EVENTS, CHAIN_NAMESPACES } from "@web3auth/base";
import { LOGIN_MODAL_EVENTS } from "@web3auth/ui";
import React, { useEffect, useState } from "react";

import Button from '@mui/material/Button';
import Image from "next/image";

function Login() {
    const [user, setUser] = useState(null);
    const [web3auth, setWeb3auth] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log("useEffect");

        const subscribeAuthEvents = (web3auth) => {
            console.log("subscribeAuthEvents ", subscribed);

            if (subscribed) {
                return;
            }
            web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
                console.log("Yeah!, you are successfully logged in", data);
                setUser(data);
                router.push("/dashboard");
            });

            web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
                console.log("connecting");
            });

            web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
                console.log("disconnected");
                setUser(null);
            });

            web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
                console.log("some error or user have cancelled login request", error);
            });

            web3auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {
                console.log("modal visibility", isVisible);
            });

            setSubscribed(true);
        };

        const polygonMumbaiConfig = {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            rpcTarget: "https://polygon-mumbai.infura.io/v3/7c0e52f11cb8492c94804f28d8a0ee7f",
            blockExplorer: "https://mumbai-explorer.matic.today",
            chainId: "0x13881",
            displayName: "Polygon Mumbai Testnet",
            ticker: "matic",
            tickerName: "matic",
        };

        const web3auth = new Web3Auth({
            chainConfig: polygonMumbaiConfig,
            clientId: "BD6ZuB1fJ415s15b8uDtbQkNBUCGX7Z4ONlHpuTo11BFtota8j9mgOZqdKc7yoUodzYUOf5L28-LDYSEPf_IZfA",
        });

        setWeb3auth(web3auth);

        // ⭐️ initialize modal on page mount.
        const initializeModal = async () => {
            console.log("initializeModal");
            subscribeAuthEvents(web3auth);
            await web3auth.initModal();
            setLoaded(true);
        };
        initializeModal();
    }, [subscribed]);

    const login = async () => {
        if (!web3auth) return;
        const provider = await web3auth.connect();
        await getUserInfo();
    };
    const logout = async () => {
        if (!web3auth) return;
        await web3auth.logout();
        setUser(null);
    };
    const getUserInfo = async () => {
        if (!web3auth) return;
        const userInfo = await web3auth.getUserInfo();
        if (userInfo) {
            setUser(userInfo);
        }
    };

    const renderUnauthenticated = () => {
        return (
            <div>
                <Button variant="contained" onClick={login}>
                    LOGIN
                </Button>
            </div>
        );
    };

    const renderAuthenticated = () => {
        return (
            <div className="App">
                <Button variant="contained" onClick={logout}>
                    LOG OUT
                </Button>
                <Button variant="contained" onClick={getUserInfo}>
                    Get User Info
                </Button>
            </div>
        );
    };
    return loaded ? (user ? renderAuthenticated() : renderUnauthenticated()): <h1>Loading....</h1>;
}
export default Login;
