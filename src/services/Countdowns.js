import xFetch from './xFetch';

export async function getAll() {
  return xFetch('/api/countdowns');
}

export async function addCountdown(data) {
  debugger;
  return xFetch('http://localhost:3000/countdown/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: data
  });
}
