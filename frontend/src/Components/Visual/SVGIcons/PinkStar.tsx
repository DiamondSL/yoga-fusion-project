import {SvgIcon, SxProps} from "@mui/material";
import React from "react";
import pinkStar from '../img/icons/shape_pink.svg'
import {Theme} from "@mui/system";

type PinkStarProps = {
    onClick?: () => void;
    width?: number | string;
    height?: number | string;
    sx?: SxProps<Theme>;
}

const PinkStarVector = ({onClick, width = '41px', height = '41px', sx}: PinkStarProps) => {
    return (
        <SvgIcon onClick={onClick} component={pinkStar} sx={{...sx, width: width, height: height}} inheritViewBox={true}
                 color={'primary'}/>
    );
}

export default PinkStarVector
