import config from '../../config';
export async function post({ request }) {
  try {
    const { email, password } = await request.json();
    const response = await fetch(config.apiHost + '/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      })
    });
    const responseJson = await response.json();
    if (responseJson.success == 0) {
      return new Response(JSON.stringify(responseJson), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify(responseJson), {
        status: 200, headers: {
          Location: '/',
          'Set-Cookie': `token=${responseJson.token}; Path=/; Max-Age=604800`,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }
}