import { ExperienceType } from './experience';

export type RatingDistribution = {
  count: number;
  rating: number;
};

export type AspectRatingStatistics = {
  aspect: string;
  averageRating: number;
  ratingCount: number;
  type: ExperienceType;
  ratingDistribution: RatingDistribution[];
};

export type AspectStatisticsData = {
  name: string;
  companyAspectRatingStatistics: AspectRatingStatistics[];
};
