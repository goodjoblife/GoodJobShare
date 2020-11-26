export const canViewExperience = (
  experienceId,
  unlockedExperienceRecords,
  firstTimeView,
) => {
  if (firstTimeView) {
    return true;
  }
  if (
    Array.isArray(unlockedExperienceRecords) &&
    unlockedExperienceRecords.findIndex(
      record => record.data.id === experienceId,
    ) !== -1
  ) {
    return true;
  }
  return false;
};
