import {SvgIcon, SxProps} from "@mui/material";
import React from "react";
import {Theme} from "@mui/system";
import Icon4 from '../../../../public/icons/ListIcons/ListIcon_4.svg'

type BlueSlimeProps = {
    onClick?: () => void;
    width?: number | string;
    height?: number | string;
    sx?: SxProps<Theme>;
}

const BlueSlime = ({onClick, width = '41px', height = '41px', sx}: BlueSlimeProps) => {
    return (
        <SvgIcon onClick={onClick} component={Icon4} sx={{...sx, width: width, height: height}} inheritViewBox={true}
                 color={'primary'}/>
    );
}

export default BlueSlime

