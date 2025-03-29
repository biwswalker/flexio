export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  const _name = name;
  const _first = _name.split(' ')[0];
  const _last = _name.split(' ')[1];
  return {
    sx: {
      bgcolor: stringToColor(_name),
    },
    children: `${_first[0] ?? ''}${_last ? _last[0] : ''}`,
  };
}
