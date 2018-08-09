import ArcherAction from 'page/common/db/ArcherAction';

export const registerHotListener = function() {
    this.hot.addHook('afterChange', onDataChange.bind(this));
    this.hot.addHook('afterCreateRow', onCreateRow.bind(this));
    this.hot.addHook('afterRemoveRow', onRemoveRow.bind(this));
    this.hot.addHook('afterCreateCol', onCreateCol.bind(this));
    this.hot.addHook('afterRemoveCol', onRemoveCol.bind(this));
};

const getDataChangeAction = function() {
    const { settings } = this.props.data;
    const newData = this.hot.getData();
    const oldData = settings.data;
    const path = this.props.path.concat('settings', 'data');
    const action = ArcherAction.getObjectChangeAction(path, oldData, newData);
    return action;
};

const onDataChange = function(changes, source) {
    console.dev('datachange source', source);
    if (source === 'loadData') {
        // 只有编辑的changes，才会同步给后台
        return;
    }

    const action = getDataChangeAction.bind(this)();
    ArcherAction.submit(action);
};

const onRowsAndColsChange = function(amount, isRow, isCreate) {
    // data action
    const action1 = getDataChangeAction.bind(this)();
    // size action
    const hotSettings = this.hot.getSettings();
    const size = isRow ? hotSettings.rowHeights : hotSettings.colWidths;
    const sumsize = amount * size * (isCreate ? 1 : -1);
    console.dev('sumsize', sumsize);
    const path = this.props.path.concat('size', isRow ? 'height' : 'width');
    const action2 = ArcherAction.getNumberIncreaseAction(path, sumsize);

    ArcherAction.packageSubmit(action1, action2);
};

const onCreateRow = function(index, amount, source) {
    console.dev('createRow soruce', source);
    onRowsAndColsChange.bind(this)(amount, true, true);
};

const onRemoveRow = function(index, amount, source) {
    console.dev('removeRow soruce', source);
    onRowsAndColsChange.bind(this)(amount, true, false);
};

const onCreateCol = function(index, amount, source) {
    console.dev('createCol soruce', source);
    onRowsAndColsChange.bind(this)(amount, false, true);
};

const onRemoveCol = function(index, amount, source) {
    console.dev('removeCol soruce', source);
    onRowsAndColsChange.bind(this)(amount, false, false);
};
