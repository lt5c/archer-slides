import { getRandom } from 'utils';
import clonedeep from 'lodash.clonedeep';
import {
    SLIDES_CONTENT_PATH,
    TAB_PATH,
    // action type
    ARCHER_TABLE_TYPE,
    ARCHER_IMAGE_TYPE,
    ARCHER_TEXTAREA_TYPE,
    ARCHER_SHAPE_TYPE,
    // action initContent
    ARCHER_TABLE_INIT_CONTENT,
    ARCHER_IMAGE_INIT_CONTENT,
    ARCHER_TEXTAREA_INIT_CONTENT,
    getArcherShapeInitContent,
} from '../constants/';

import ArcherAction from './ArcherAction';

export const insertTab = (index) => {
    console.dev('insertTab', index);
    const tabid = `slide-${getRandom(5)}`;
    // 添加slide内容
    const content = {};
    const path1 = [SLIDES_CONTENT_PATH, tabid];
    const action1 = ArcherAction.getObjectInsertAction(path1, content);
    // 添加tabid
    const path2 = [TAB_PATH];
    const action2 = ArcherAction.getArrayInsertAction(path2, index + 1, tabid);

    ArcherAction.packageSubmit(action1, action2);

    return tabid;
};

export const insertTable = (tabid) => {
    return insertSection(tabid, ARCHER_TABLE_TYPE, ARCHER_TABLE_INIT_CONTENT);
};

export const insertImage = (tabid) => {
    return insertSection(tabid, ARCHER_IMAGE_TYPE, ARCHER_IMAGE_INIT_CONTENT);
};

export const insertTextarea = (tabid) => {
    return insertSection(tabid, ARCHER_TEXTAREA_TYPE, ARCHER_TEXTAREA_INIT_CONTENT);
};

export const insertShape = (tabid, shapeType) => {
    const content = getArcherShapeInitContent(shapeType);
    return insertSection(tabid, ARCHER_SHAPE_TYPE, content);
};

const insertSection = (tabid, actionType, initContent) => {
    if (!tabid) {
        return false;
    }
    const id = `${actionType}-${getRandom(5)}`;
    const content = clonedeep(initContent);
    const path = [SLIDES_CONTENT_PATH, tabid, id];
    const action = ArcherAction.getObjectInsertAction(path, content);

    ArcherAction.submit(action);

    return id;
};
