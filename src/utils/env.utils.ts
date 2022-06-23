export const isProd = () => {
  const testPaths = ['localhost', '127.0.0.1', 'payment-dev'];

  const host = window.location.host;
  return !testPaths.some(path => host.includes(path));
};
