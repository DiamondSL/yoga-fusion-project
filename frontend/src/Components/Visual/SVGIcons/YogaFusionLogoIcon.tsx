import {SvgIcon} from "@mui/material";
import Logo from "@/app/logo.svg";
import React from "react";


type YogaFusionLogoProps = {
    onClick?: () => void;
}

const YogaFusionLogo = ({onClick}:YogaFusionLogoProps) => {
    return (
        <SvgIcon onClick={onClick} component={Logo} inheritViewBox={true} sx={{width: 'initial', height: 'initial'}} color={'primary'}/>
    );
}

export default YogaFusionLogo
