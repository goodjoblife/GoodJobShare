export const getTaskAndRewardQuery = `
query TaskAndReward {
  tasks {
    id
    title
    description
    maxRunCount
    points
  }
  rewards {
    id
    title
    description
    points
  }
}
`;

export const unlockExperienceQuery = `
mutation($input:ID!) {
  unlockExperience(input: $input) {
    id
  }
}
`;
