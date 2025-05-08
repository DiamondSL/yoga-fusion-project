import {SvgIcon, SxProps} from "@mui/material";
import React from "react";
import {Theme} from "@mui/system";
import RedArrowSVG from '../../../../public/icons/arrows/sectionSix_arrow1.svg'
import RedArrowCurvedSVG from '../../../../public/icons/arrows/sectionSix_arrow2.svg'


type RedArrowProps = {
    onClick?: () => void;
    width?: number | string;
    height?: number | string;
    sx?: SxProps<Theme>;
    className?: string;
}

const RedArrow = ({onClick, width = '80px', height = '80px', sx, className}: RedArrowProps) => {
    return (
        <SvgIcon onClick={onClick} component={RedArrowSVG} className={className} sx={{...sx, width: width, height: height}} inheritViewBox={true}
                 color={'primary'}/>
    );
}


const RedArrowCurved = ({onClick, width = '80px', height = '80px', sx, className}: RedArrowProps) => {
    return (
        <SvgIcon onClick={onClick} component={RedArrowCurvedSVG} className={className} sx={{...sx, width: width, height: height}} inheritViewBox={true}
                 color={'primary'}/>
    );
}

export { RedArrowCurved }
export default RedArrow

