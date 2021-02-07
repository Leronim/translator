declare interface Position {
    height: { value: number },
    order: { value: number },
    originalX: { value: number },
    originalY: { value: number },
    width: { value: number },
    x: { value: number },
    y: { value: number },
    text: string
}

declare interface Transition {
    x: { value: number },
    y: { value: number }
}

declare interface Word {
    id: number,
    text: string
}

declare module "*.svg" {
    import React from 'react';
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}
