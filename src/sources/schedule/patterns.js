// Activity: ACTIVITY_NAME (SOME_ID)_TYPE
const Activity = /^(.*)\s*\(\d+\w?\)_\w{1,2}$/;
// Group: YEAR. letnik, PROGRAM LEVEL, skupina GROUP
const Group = /^(\d)\. letnik, (.*?)(?: ([I\d]+)[.-]?\s?st.*?)?(?:, skupina (\d+))?$/;

export { Activity, Group };