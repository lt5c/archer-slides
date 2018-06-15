export const commitOP (op) {
  let oplist = localStorage.getItem('oplist') || '{}';
  oplist = JSON.parse(oplist);
  oplist.push(op);
  oplist = JSON.stringify(oplist);
  localStorage.setItem('oplist', oplist);
}
