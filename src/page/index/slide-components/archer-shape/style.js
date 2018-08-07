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
        borderBottom: `${height}px solid green`,
        borderLeft: `${width / 2}px solid`,
        borderRight: `${width / 2}px solid`,
    };
};

const rectangleStyle = () => {
    return {
        width: '100%',
        height: '100%',
        background: 'green'
    };
};

const circleStyle = () => {
    return {
        width: '100%',
        height: '100%',
        background: 'green',
        borderRadius: '50%',
    }
}
