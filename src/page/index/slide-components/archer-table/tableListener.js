import { ArcherAction } from 'page/common/db'

const getDataChangeAction = function() {
    const { settings } = this.props.data;
    const newData = this.hot.getData();
    const oldData = settings.data;
    const path = this.props.path.concat('settings', 'data');
    const action = ArcherAction.getChangeObjectAction(path, oldData, newData);
    return action;
};

export const onDataChange = function(changes, source) {
    console.dev('datachange source', source);
    if (source === 'loadData') {
        // 只有编辑的changes，才会同步给后台
        return;
    }

    const action = getDataChangeAction.bind(this)();
    ArcherAction.submit(action);
};

export const onRowsChange = function(index, amount, source) {
    console.dev('rowchange soruce', source);
};
