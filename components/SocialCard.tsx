'use client'
import React from "react";

export interface SocialCardData {
    title: string;
    username: string;
    iconComponent: React.ReactNode;
    accentColorName: string;
    backgroundColorName: string;
    url: string;
}

export default function SocialCard(props: SocialCardData) {
    function OnClickCard(){
        window.location.href = props.url;
    }

    return (
        <a onClick={OnClickCard} className="text-decoration-none">
            <div className={`card bg-${props.backgroundColorName} d-flex flex-column overflow-hidden position-relative`} style={{ height: '200px' }}>

                <div className={`card-status-start bg-${props.accentColorName}`}></div>

                <div className="d-flex align-items-center justify-content-center flex-fill" style={{ height: '50%' }}>
                    <div className={`text-${props.backgroundColorName}-fg`} style={{ height: '70%', width: '70%' }}>
                        {React.isValidElement(props.iconComponent) ?
                            React.cloneElement(props.iconComponent as React.ReactElement<any>, {
                                size: "100%",
                                stroke: 1.5,
                                className: "w-100 h-100"
                            }) : props.iconComponent
                        }
                    </div>
                </div>

                <div className="flex-fill" style={{ height: '50%' }}>
                    <div className="card-body d-flex flex-column justify-content-center h-100">
                        <h3 className={`card-title fw-bold mb-0 text-${props.backgroundColorName}-fg text-truncate`}>
                            {props.title}
                        </h3>
                        <div className={`small text-${props.backgroundColorName}-fg opacity-75 text-truncate`}>
                            {props.username}
                        </div>
                    </div>
                </div>

            </div>
        </a>
    )
}