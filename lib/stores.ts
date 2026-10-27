/** Today's weekday in Tashkent as the schedule counts it: 0 = Monday ... 6 = Sunday. */
const tashkentWeekday = () => {
  const name = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Tashkent', weekday: 'short' });
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(name);
};

/** "09:00–18:00" for today, or `null` when the shop does not work today. */
export const todayHours = (store: Pick<Store, 'schedule'>) => {
  const today = store.schedule?.find((day) => day.day === tashkentWeekday());
  return today?.is_open && today.open_time && today.close_time
    ? `${today.open_time}–${today.close_time}`
    : null;
};

/** The shop on a map (the coordinates are the place of the shop, nothing else is sent). */
export const storeMapUrl = (store: Pick<Store, 'latitude' | 'longitude'>) =>
  `https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`;
