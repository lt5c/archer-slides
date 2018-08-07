import React from 'react';
import {
    ARCHER_TABLE_TYPE,
    ARCHER_IMAGE_TYPE,
    ARCHER_TEXTAREA_TYPE,
    ARCHER_SHAPE_TYPE,
} from 'page/common/constants';
import {
    DEFAULT_TABLE_DATA
} from '../../constants/constants';

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
        <h1 style={style}>{item.text}</h1>
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

export const renderTemplate = (item) => {
    const template = TemplateMap[item.type];
    return template && template(item);
};
