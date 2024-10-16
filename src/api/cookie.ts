function setAuthTokenCookie(token: string, expiresInDays: number) {
  const date = new Date();
  date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);

  const expires = 'expires=' + date.toUTCString();
  document.cookie = `authToken=${token}; ${expires}; path=/; Secure; SameSite=Strict`;
}

function setCookie(name: string, key: string, expiresInDays: number) {
  const date = new Date();
  date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);

  const expires = 'expires=' + date.toUTCString();
  document.cookie = `${name}=${key}; ${expires}; path=/; Secure; SameSite=Strict`;
}

function getAuthTokenFromCookie() {
  const name = 'authToken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

function getCookie(name: string) {
  const cookiesString = document.cookie;
  const cookiesArray = cookiesString.split('; ');
  for (const cookie of cookiesArray) {
    const [cookieName, cookieValue] = cookie.split('=');

    if (cookieName.trim() === name) {
      return cookieValue;
    }
  }
  return undefined;
}

function clearAllCookie() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const cookieName = cookie.split('=')[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}
function clearCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export const cookie = {
  setAuthTokenCookie,
  getAuthTokenFromCookie,
  clearAllCookie,
  clearCookie,
  setCookie,
  getCookie,
};
