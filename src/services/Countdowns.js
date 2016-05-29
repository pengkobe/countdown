import xFetch from './xFetch';

export async function getAll() {
  return xFetch('/api/countdowns');
}

export async function addCountdown(data) {
  return xFetch('http://localhost:3000/countdown/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: data
  });
}

// 按条件搜索
export async function getCountdowns(condition) {
  return xFetch('http://localhost:3000/countdown/all', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: condition
  });
}
