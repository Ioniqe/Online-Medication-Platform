export let securityToken = (): string => {
  const token = localStorage.getItem('token');
  let repl = token?.replace(/["]+/g, '');  

  if (token) {
    return 'Bearer ' + repl;
  } else {
    return "";
  }
}