import React from 'react';
import { SLIDE_CMP_TYPE as TYPE, DEFAULT_TABLE_DATA } from 'page/index/constants/constants';

const TemplateMap = {};
const createStyle = (item) => {
    return {
        position: 'absolute',
        top: item.position.y || 0,
        left: item.position.x || 0,
    };
};

TemplateMap[TYPE.TEXTAREA] = (item) => {
    const style = createStyle(item);
    return (
        <h1 style={style}>{item.text}</h1>
    );
};

TemplateMap[TYPE.IMAGE] = (item) => {
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

TemplateMap[TYPE.TABLE] = (item) => {
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
