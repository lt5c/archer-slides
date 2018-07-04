export const commitOP = (op) => {
    const sharedb = window.sharedb;
    sharedb.submitOp(op);
};
