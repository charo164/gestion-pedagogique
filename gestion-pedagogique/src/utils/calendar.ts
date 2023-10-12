import { EventColor } from 'calendar-utils';

export const colorsEvent: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  green: {
    primary: '#008000',
    secondary: '#008000',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  gray: {
    primary: '#808080',
    secondary: '#D3D3D3',
  },
};

export function getColor(
  canceled: boolean,
  startTime: Date,
  endTime: Date
): EventColor {
  if (canceled) {
    return colorsEvent['gray'];
  }

  if (startTime < new Date() && endTime < new Date()) {
    return colorsEvent['gray'];
  }

  if (startTime > new Date() && endTime > new Date()) {
    return colorsEvent['yellow'];
  }

  if (startTime <= new Date() && endTime >= new Date()) {
    return colorsEvent['green'];
  }


  return colorsEvent['gray'];
}
