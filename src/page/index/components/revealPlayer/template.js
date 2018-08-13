import React from 'react';
import {
    ARCHER_TABLE_TYPE,
    ARCHER_IMAGE_TYPE,
    ARCHER_TEXTAREA_TYPE,
    ARCHER_SHAPE_TYPE,
    SHAPE_TRIANGLE_TYPE,
} from 'page/common/constants';
import {
    DEFAULT_TABLE_DATA
} from '../../constants/constants';
import assign from 'lodash.assign';
import { shapeStyle } from '../../slide-components/archer-shape/style'

const TemplateMap = {};
const createStyle = (item) => {
    return {
        position: 'absolute',
        top: item.position.y || 0,
        left: item.position.x || 0,
    };
};

TemplateMap[ARCHER_TEXTAREA_TYPE] = (item) => {
    const style = createStyle(item);
    return (
        <p style={style}>{item.text}</p>
    );
};

TemplateMap[ARCHER_IMAGE_TYPE] = (item) => {
    const style = createStyle(item);
    return (
        <img
            style={style}
            width={item.size.width}
            height={item.size.height}
            data-src={item.img}
        />
    );
};

TemplateMap[ARCHER_TABLE_TYPE] = (item) => {
    const data = item.settings.data || DEFAULT_TABLE_DATA;
    const style = createStyle(item);
    return (
        <table style={style}>
            <tbody>
                {data.map((rowArray, row) => {
                    return (
                        <tr key={row}>
                            {rowArray.map((colItem, col) => {
                                return (<td key={col}>{colItem}</td>);
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

TemplateMap[ARCHER_SHAPE_TYPE] = (item) => {
    let style = createStyle(item);
    assign(style, shapeStyle(item.subtype, item.size.width, item.size.height));
    item.subtype !== SHAPE_TRIANGLE_TYPE && assign(style, item.size);

    return (
        <div
            style={style}
        />
    );
};

export const renderTemplate = (item) => {
    const template = TemplateMap[item.type];
    return template && template(item);
};
