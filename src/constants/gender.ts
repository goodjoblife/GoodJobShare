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
  { value: Gender.MALE, label: '男性' },
  { value: Gender.FEMALE, label: '女性' },
  { value: Gender.OTHER, label: genderTranslation[Gender.OTHER] },
];
