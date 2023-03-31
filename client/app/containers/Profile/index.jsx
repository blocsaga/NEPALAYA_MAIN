import { Route, Routes } from 'react-router-dom';
import { useInjectReducer } from '../../hooks/useInjectReducer';
import { useInjectSaga } from '../../hooks/useInjectSaga';
import Layout from './Components/Layout';
import {
  ChangePasswords,
  Information,
  VerifyEmail,
  Section,
  Assignment,
  Notification,
} from './Pages/Loadable';
import reducer from './reducer';
import saga from './saga';

const key = 'userPersonalInformationPage';

const Profile = (props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <>
      <Layout>
        <Routes>
          <Route exact path={'verify'} element={<VerifyEmail />} />
          <Route exact path={'change-password'} element={<ChangePasswords />} />
          <Route path={'information'} element={<Information />} />
          <Route path={'notification'} element={<Notification />} />
          <Route path={'routine'} element={<Section />} />
          <Route path={'assignments'} element={<Assignment />} />

          <Route path={'*'} element={<Information />} />
        </Routes>
      </Layout>
    </>
  );
};

export default Profile;
