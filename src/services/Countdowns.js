import xFetch from './xFetch';

// 添加
export async function addCountdown(data) {
  return xFetch('/countdown/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  });
}

// 按条件搜索
export async function getCountdowns(condition) {
  return xFetch('/countdown/all', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: condition,
  });
}

// 删除
export async function deleteCountdown(_id) {
  return xFetch('/countdown/' + _id + '/delete', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
