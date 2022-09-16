import config from '../../config';
import lightcookie from 'lightcookie';
export async function post({ request }) {
  const cookie = request.headers.get('cookie');
	const parsed = lightcookie.parse(cookie);
  const token = parsed.token;
  if(!token) {
    return;
  }
  const body = await request.arrayBuffer();
  console.log(body);
  const data = new FormData();
  data.append('file', body, 'upload.jpg');
  const response = await fetch(config.apiHost + '/upload', {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  })
  const json = await response.json();
  console.log(json);
}