import config from '../../config';
import lightcookie from 'lightcookie';
export async function post({ request }) {
  const cookie = request.headers.get('cookie');
	const parsed = lightcookie.parse(cookie);
  const token = parsed.token;
  if(!token) {
    return;
  }
  try {
    const { title, content } = await request.json();
    const response = await fetch(config.apiHost + '/blog', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        content,
      })
    });
    const responseJson = await response.json();
    console.log(responseJson);
    return new Response(JSON.stringify(responseJson), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }
}