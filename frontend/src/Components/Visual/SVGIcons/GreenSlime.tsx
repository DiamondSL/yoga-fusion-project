import {SvgIcon, SxProps} from "@mui/material";
import React from "react";
import Icon5 from '../../../../public/icons/ListIcons/ListIcon_5.svg'
import {Theme} from "@mui/system";

type GreenSlimeProps = {
    onClick?: () => void;
    width?: number | string;
    height?: number | string;
    sx?: SxProps<Theme>;
}

const GreenSlime = ({onClick, width = '41px', height = '41px', sx}: GreenSlimeProps) => {
    return (
        <SvgIcon onClick={onClick} component={Icon5} sx={{...sx, width: width, height: height}} inheritViewBox={true}
                 color={'primary'}/>
    );
}

export default GreenSlime
