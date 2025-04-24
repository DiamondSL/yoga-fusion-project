import {SvgIcon, SxProps} from "@mui/material";
import React from "react";
import Icon2 from '../../../../public/icons/ListIcons/ListIcon_2.svg'
import {Theme} from "@mui/system";


type RedStarProps = {
    onClick?: () => void;
    width?: number | string;
    height?: number | string;
    sx?: SxProps<Theme>;
}

const RedStar = ({onClick, width = '41px', height = '41px', sx}: RedStarProps) => {
    return (
        <SvgIcon onClick={onClick} component={Icon2} sx={{...sx, width: width, height: height}} inheritViewBox={true}
                 color={'primary'}/>
    );
}

export default RedStar

