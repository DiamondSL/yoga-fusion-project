import {SvgIcon, SxProps} from "@mui/material";
import React from "react";
import {Theme} from "@mui/system";
import Rating from '../../../../public/icons/shapes/rating.svg'

type RatingIconProps = {
    onClick?: () => void;
    width?: number | string;
    height?: number | string;
    sx?: SxProps<Theme>;
}

const RatingIcon = ({onClick, width = '41px', height = '41px', sx}: RatingIconProps) => {
    return (
        <SvgIcon onClick={onClick} component={Rating} sx={{...sx, width: width, height: height}} inheritViewBox={true}
                 color={'primary'}/>
    );
}

export default RatingIcon

