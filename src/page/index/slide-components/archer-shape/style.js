import {
    SHAPE_TRIANGLE_TYPE,
    SHAPE_RECTANGLE_TYPE,
    SHAPE_CIRCLE_TYPE,
} from 'page/common/constants';

export const shapeStyle = (type, width, height) => {
    if (typeof width !== 'number' || typeof height !== 'number') {
        return {};
    }
    switch (type) {
        case SHAPE_TRIANGLE_TYPE:
            return triangleStyle(width, height);
        case SHAPE_RECTANGLE_TYPE:
            return rectangleStyle();
        case SHAPE_CIRCLE_TYPE:
            return circleStyle();
        default:
            return {};
    }
};

const triangleStyle = (width, height) => {
    return {
        width: 0,
        height: 0,
        borderBottom: `${height}px solid rgba(91,155,213,1)`,
        borderLeft: `${width / 2}px solid rgba(0,0,0,0)`,
        borderRight: `${width / 2}px solid rgba(0,0,0,0)`,
    };
};

const rectangleStyle = () => {
    return {
        width: '100%',
        height: '100%',
        background: 'rgba(91,155,213,1)',
    };
};

const circleStyle = () => {
    return {
        width: '100%',
        height: '100%',
        background: 'rgba(91,155,213,1)',
        borderRadius: '50%',
    };
};
