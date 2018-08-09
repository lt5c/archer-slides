export const TAB_PATH = 'tabs';
export const SLIDES_CONTENT_PATH = 'slides';

// Archer Section Type
export const ARCHER_TABLE_TYPE = 'tb';
export const ARCHER_IMAGE_TYPE = 'i';
export const ARCHER_TEXTAREA_TYPE = 't';
export const ARCHER_SHAPE_TYPE = 'sp';

// Archer Section init content
export const ARCHER_TABLE_INIT_CONTENT = {
    type: ARCHER_TABLE_TYPE,
    position: {
        x: 50,
        y: 50
    },
    size: {
        width: 200,
        height: 200,
    },
    settings: {
        data: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ],
    },
};
export const ARCHER_IMAGE_INIT_CONTENT = {
    type: ARCHER_IMAGE_TYPE,
    position: {
        x: 50,
        y: 50
    },
    size: {
        width: 100,
        height: 100,
    },
    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529576812899&di=1053f44867d04eb79767516d0ee2d99f&imgtype=0&src=http%3A%2F%2Fwww.windows7en.com%2Fuploads%2Fallimg%2F170516%2F1A9402V1-5.jpg',
};
export const ARCHER_TEXTAREA_INIT_CONTENT = {
    type: ARCHER_TEXTAREA_TYPE,
    position: {
        x: 50,
        y: 50
    },
    size: {
        width: 300,
        height: 100,
    },
    text: 'hello world',
    style: {
        fontSize: '24',
        textAlign: 'center',
        verticalAlign: 'middle',
    }
};

export const getArcherShapeInitContent = (shapeType) => {
    return {
        type: ARCHER_SHAPE_TYPE,
        position: {
            x: 50,
            y: 50,
        },
        size: {
            width: 200,
            height: 200
        },
        subtype: shapeType || SHAPE_RECTANGLE_TYPE,
    };
};

// ArcherShape subtype
export const SHAPE_RECTANGLE_TYPE = 'rectangle';
export const SHAPE_TRIANGLE_TYPE = 'triangle';
export const SHAPE_CIRCLE_TYPE = 'circle';
