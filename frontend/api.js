async function fetchJson(...args) {
  const resp = await fetch(...args);
  if (resp.ok)
    return resp.json();
  else
    throw await resp.json();
}

export function listUsers(groupId) {
  return fetchJson(`/users?groupId=${groupId}`);
}

export function listGroups() {
  return fetchJson("/groups");
}

export async function activateUsers(users) {
  try {
    const userIds = users.filter((user) => user.checked).map((user) => user.id);
    const payload = userIds.map((userId) => ({id: userId, isActivated: true}));
    const activatedUsers = await fetchJson("/users", {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    return activatedUsers;
  }
  catch (error) {
    if (error.code === "BANNED_USERS") {
      const names = error.banned_users.map((user) => user.name);
      throw new Error(`Cannot activate banned users: ${names.join(", ")}`);
    };
  }
};