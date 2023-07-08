const mapping: Record<string, string> = {
  organizations: 'organization',
  submarines: 'submarine',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
