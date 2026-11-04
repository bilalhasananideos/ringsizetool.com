/**
 * IndexNow key. NOT a secret: IndexNow works by publishing it at
 * https://ringsizetool.com/<key>.txt so Bing can check we own the host.
 * The file public/<KEY>.txt must contain exactly this string.
 * To rotate: new 32-hex key here, rename the public file, change its content.
 */
export const INDEXNOW_KEY = '5733e6ef3ddc5bdcd9a7ac1937d5b3ef';
