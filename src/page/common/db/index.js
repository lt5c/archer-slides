export const commitOP = (op) => {
    const sharedb = window.sharedb;
    sharedb.submitOp(op);
};

export const ArcherAction = {
    getChangeObjectAction: (path, oldObj, newObj) => {
        const action = [{
            p: path,
            od: oldObj,
            oi: newObj,
        }];
        return action;
    },
    submit: (action) => {
        commitOP(action);
    },
    packageSubmit: (...actions) => {
        actions.forEach(action => {
            commitOP(action);
        });
    },
};
