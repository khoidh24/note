export const getToken = () => {
  const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
  return match ? match[2] : undefined;
};