import lightcookie from 'lightcookie';

export function isLoggedIn(request: Request): boolean {
	const cookie = request.headers.get('cookie');
	const parsed = lightcookie.parse(cookie);
	return 'token' in parsed;
}

export function getToken(request: Request): string {
  const cookie = request.headers.get('cookie');
	const parsed = lightcookie.parse(cookie);
  return parsed.token;
}