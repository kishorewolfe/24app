

export const desktopOS = [
    {
      label: 'Office Space',
      value: 72.72,
    },
    {
      label: 'Shop/Showroom',
      value: 16.38,
    },
    {
      label: 'Commercial Land',
      value: 3.83,
    },
    {
      label: 'Warehouse/Godown',
      value: 2.42,
    },
    {
      label: 'Industrial Building',
      value: 4.65,
    },
    {
        label: 'Industrial Shed',
        value: 24.65,
      },
  ];
  
  export const mobileOS = [
    {
      label: 'House/Villa',
      value: 70.48,
    },
    {
      label: 'Plot',
      value: 28.8,
    },
    {
      label: 'Flat',
      value: 0.71,
    },
  ];
  
  export const platforms = [
    {
      label: 'Mobile',
      value: 59.12,
    },
    {
      label: 'Desktop',
      value: 40.88,
    },
  ];
  
  const normalize = (v: number, v2: number) => Number.parseFloat(((v * v2) / 100).toFixed(2));
  
  export const mobileAndDesktopOS = [
    ...mobileOS.map((v) => ({
      ...v,
      label: v.label === 'Other' ? 'Other (Mobile)' : v.label,
      value: normalize(v.value, platforms[0].value),
    })),
    ...desktopOS.map((v) => ({
      ...v,
      label: v.label === 'Other' ? 'Other (Desktop)' : v.label,
      value: normalize(v.value, platforms[1].value),
    })),
  ];
  
  export const valueFormatter = (item: { value: number }) => `${item.value}%`;
  