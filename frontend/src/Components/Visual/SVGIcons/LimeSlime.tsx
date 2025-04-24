import {SvgIcon, SxProps} from "@mui/material";
import React from "react";
import {Theme} from "@mui/system";
import Icon3 from '../../../../public/icons/ListIcons/ListIcon_3.svg'



type LimeSlimeProps = {
    onClick?: () => void;
    width?: number | string;
    height?: number | string;
    sx?: SxProps<Theme>;
}

const LimeSlime = ({onClick, width = '41px', height = '41px', sx}: LimeSlimeProps) => {
    return (
        <SvgIcon onClick={onClick} component={Icon3} sx={{...sx, width: width, height: height}} inheritViewBox={true}
                 color={'primary'}/>
    );
}

export default LimeSlime

