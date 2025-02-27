import {SvgIcon} from "@mui/material";
import Logo from "@/app/logo.svg";
import React from "react";

const YogaFusionLogo = () => {
    return (
        <SvgIcon component={Logo} inheritViewBox={true} sx={{width: 'initial', height: 'initial'}} color={'primary'}/>
    );
}

export default YogaFusionLogo
