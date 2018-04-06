import LandingPage from './containers/LandingPage';
import LaborRightsMenu from './containers/LaborRightsMenu';
import LaborRightsSingle from './containers/LaborRightsSingle';
import TimeAndSalary from './components/TimeAndSalary';
import TimeAndSalaryBoard from './containers/TimeAndSalary/TimeAndSalaryBoard';
import TimeAndSalaryCompany from './containers/TimeAndSalary/TimeAndSalaryCompany';
import TimeAndSalaryJobTitle from './containers/TimeAndSalary/TimeAndSalaryJobTitle';
import TimeAndSalaryNotFound from './components/TimeAndSalary/NotFound';
import CampaignTimeAndSalary from './components/CampaignTimeAndSalary';
import CampaignTimeAndSalaryBoard from './containers/CampaignTimeAndSalary/CampaignTimeAndSalaryBoard';
import CampaignTimeAndSalaryNotFound from './components/CampaignTimeAndSalary/NotFound';
import ExperienceSearchPage from './containers/ExperienceSearchPage';
import ExperienceDetail from './containers/ExperienceDetail';
import NotFound from './components/common/NotFound';
import ShareExperience from './components/ShareExperience';
import ShareExperienceEntry from './components/ShareExperience/Entry';
import InterviewForm from './containers/ShareExperience/InterviewFormContainer';
import TimeSalaryForm from './containers/ShareExperience/TimeSalaryFormContainer';
import CampaignTimeAndSalaryForm from './containers/ShareExperience/CampaignTimeAndSalaryFormContainer';
import WorkExperiencesForm from './containers/ShareExperience/WorkExperiencesFormContainer';
import Me from './containers/Me';
import About from './components/About';
import Faq from './components/Faq';
import Guidelines from './components/Guidelines';
import Privacy from './components/Privacy';
import Terms from './components/Terms';


const routes = [
  {
    path: '/',
    exact: true,
    component: LandingPage,
  },
  {
    path: '/labor-rights',
    exact: true,
    component: LaborRightsMenu,
  },
  {
    path: '/labor-rights/:id',
    exact: true,
    component: LaborRightsSingle,
  },
  {
    path: '/experiences/search',
    exact: true,
    component: ExperienceSearchPage,
  },
  {
    path: '/experiences/:id',
    component: ExperienceDetail,
  },
  {
    path: '/share',
    exact: true,
    component: ShareExperienceEntry,
  },
  {
    path: '/share',
    component: ShareExperience,
    routes: [
      {
        path: '/share/interview',
        exact: true,
        component: InterviewForm,
      },
      {
        path: '/share/time-and-salary',
        exact: true,
        component: TimeSalaryForm,
      },
      {
        path: '/share/time-and-salary/campaigns/:campaign_name',
        exact: true,
        component: CampaignTimeAndSalaryForm,
      },
      {
        path: '/share/work-experiences',
        exact: true,
        component: WorkExperiencesForm,
      },
    ],
  },
  {
    path: '/time-and-salary/campaigns/:campaign_name',
    component: CampaignTimeAndSalary,
    routes: [
      {
        path: '/time-and-salary/campaigns/:campaign_name/latest',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/campaigns/:campaign_name/sort/time-asc',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/campaigns/:campaign_name/work-time-dashboard',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/campaigns/:campaign_name/sort/work-time-asc',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/campaigns/:campaign_name/salary-dashboard',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/campaigns/:campaign_name/sort/salary-asc',
        exact: true,
        component: CampaignTimeAndSalaryBoard,
      },
      {
        component: CampaignTimeAndSalaryNotFound,
      },
    ],
  },
  {
    path: '/time-and-salary',
    component: TimeAndSalary,
    routes: [
      {
        path: '/time-and-salary/latest',
        exact: true,
        component: TimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/sort/time-asc',
        exact: true,
        component: TimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/work-time-dashboard',
        exact: true,
        component: TimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/sort/work-time-asc',
        exact: true,
        component: TimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/salary-dashboard',
        exact: true,
        component: TimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/sort/salary-asc',
        exact: true,
        component: TimeAndSalaryBoard,
      },
      {
        path: '/time-and-salary/company/:keyword/work-time-dashboard',
        exact: true,
        component: TimeAndSalaryCompany,
      },
      {
        path: '/time-and-salary/company/:keyword/sort/work-time-asc',
        exact: true,
        component: TimeAndSalaryCompany,
      },
      {
        path: '/time-and-salary/company/:keyword/salary-dashboard',
        exact: true,
        component: TimeAndSalaryCompany,
      },
      {
        path: '/time-and-salary/company/:keyword/sort/salary-asc',
        exact: true,
        component: TimeAndSalaryCompany,
      },
      {
        path: '/time-and-salary/job-title/:keyword/work-time-dashboard',
        exact: true,
        component: TimeAndSalaryJobTitle,
      },
      {
        path: '/time-and-salary/job-title/:keyword/sort/work-time-asc',
        exact: true,
        component: TimeAndSalaryJobTitle,
      },
      {
        path: '/time-and-salary/job-title/:keyword/salary-dashboard',
        exact: true,
        component: TimeAndSalaryJobTitle,
      },
      {
        path: '/time-and-salary/job-title/:keyword/sort/salary-asc',
        exact: true,
        component: TimeAndSalaryJobTitle,
      },
      {
        component: TimeAndSalaryNotFound,
      },
    ],
  },
  {
    path: '/me',
    exact: true,
    component: Me,
  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    path: '/faq',
    exact: true,
    component: Faq,
  },
  {
    path: '/guidelines',
    exact: true,
    component: Guidelines,
  },
  {
    path: '/privacy-policy',
    exact: true,
    component: Privacy,
  },
  {
    path: '/user-terms',
    exact: true,
    component: Terms,
  },
  {
    component: NotFound,
  },
];

export default routes;
