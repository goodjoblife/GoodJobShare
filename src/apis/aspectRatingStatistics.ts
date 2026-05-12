import { ExperienceType } from './experience';

export const fragmentAspectRatingStatisticsFields = /* GraphQL */ `
  fragment aspectRatingStatisticsFields on AspectRatingStatistics {
    aspect
    averageRating
    ratingCount
    type
    ratingDistribution {
      count
      rating
    }
  }
`;

export type RatingBin = {
  count: number;
  rating: number;
};

// Must be the same as fragment
export type AspectRatingStatistics = {
  aspect: string;
  averageRating: number;
  ratingCount: number;
  type: ExperienceType;
  ratingDistribution: RatingBin[];
};

export type AspectStatisticsData = {
  name: string;
  companyAspectRatingStatistics: AspectRatingStatistics[];
};
