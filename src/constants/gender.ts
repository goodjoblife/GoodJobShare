export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export const genderTranslation: Record<Gender, string> = {
  [Gender.MALE]: '男',
  [Gender.FEMALE]: '女',
  [Gender.OTHER]: '其他',
};

export const GENDER_OPTIONS = [
  { value: Gender.MALE, label: genderTranslation[Gender.MALE] },
  { value: Gender.FEMALE, label: genderTranslation[Gender.FEMALE] },
  { value: Gender.OTHER, label: genderTranslation[Gender.OTHER] },
];
