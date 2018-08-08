import ArcherAction from 'page/common/db/ArcherAction';

export const registerHotListener = function() {
    this.hot.addHook('afterChange', onDataChange.bind(this));
    this.hot.addHook('afterCreateRow', onRowsChange.bind(this));
    this.hot.addHook('afterRemoveRow', onRowsChange.bind(this));
    this.hot.addHook('afterCreateCol', onColsChange.bind(this));
    this.hot.addHook('afterRemoveCol', onColsChange.bind(this));
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

const onRowsChange = function(index, amount, source) {
    console.dev('rowchange soruce', source);

    const action = getDataChangeAction.bind(this)();
    ArcherAction.submit(action);
};

const onColsChange = function(index, amount, source) {
    console.dev('colchange soruce', source);

    const action = getDataChangeAction.bind(this)();
    ArcherAction.submit(action);
};
