import React, {FC} from "react";
import Image from "next/image";
import {SvgIcon} from "@mui/material";
import Star from "@/icons/Stars/Star.svg";

interface StarSvgIcon {
    className?: string
    id?: string
    style?: React.CSSProperties;
}


const StarSvgIcon:FC<StarSvgIcon> = (props) => {
    if (props.style?.width || props?.style?.height) {
        const width = Number(props.style.width?.toString().replace("px", "")) ?? 22;
        const height = Number(props.style.height?.toString().replace("px", "")) ?? 20;
        return (
            <Image color={'primary'} src={'icons/stars/star.svg'} width={width} height={height} alt={'star-icon'} style={{...props.style}} />
        )
    }
    else {
        return (
            <SvgIcon className={props?.className ?? undefined} id={props?.id ?? undefined} component={Star}
                     inheritViewBox={true} sx={{...props.style}} color={"primary"}/>
        );
    }
}

export default StarSvgIcon