export const GENDER_VALUES = ['male', 'female', 'other'] as const;

export type Gender = typeof GENDER_VALUES[number];

export const GENDER_TRANSLATION: Record<Gender, string> = {
  male: '男',
  female: '女',
  other: '其他',
};

export const GENDER_OPTIONS = GENDER_VALUES.map(value => ({
  value,
  label: GENDER_TRANSLATION[value],
}));
