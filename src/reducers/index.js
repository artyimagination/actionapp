import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SignUpFormReducer from './SignUpFormReducer';
import CatogoriesReducer from './CatogoriesReducer';
import UserProfileReducer from './UserProfileReducer';
import StatesAndCitiesReducer from './StatesAndCitiesReducer';
import ChatReducer from './ChatReducer';
import ProjectReducer from './ProjectReducer';
import CastReducer from './CastReducer';
import CastListReducer from './CastListReducer';
import ProjectListReducer from './ProjectListReducer';
import ResetPasswordReducer from './ResetPasswordReducer';
import ProjectUserReducer from './ProjectUserReducer';
import AppliedProjectListReducer from './AppliedProjectListReducer';
import TypesReducer from './TypesReducer';

export default combineReducers({
  auth: AuthReducer,
  signup: SignUpFormReducer,
  resetPassword: ResetPasswordReducer,
  userprofile: UserProfileReducer,
  categories: CatogoriesReducer,
  types: TypesReducer,
  statesandcities: StatesAndCitiesReducer,
  chatdata: ChatReducer,
  projectdata: ProjectReducer,
  currentcast: CastReducer,
  castlist: CastListReducer,
  projectlist: ProjectListReducer,
  projectuser: ProjectUserReducer,
  appliedprojectlist: AppliedProjectListReducer
});
