import '../css/reset.css';
import '../scss/style.scss';
import initApp from './components/app/app.component';
import initRegistration from './components/registration/registration'
import testStatisticsAPI from './API/testStatisticsAPI';

initRegistration()
initApp()
testStatisticsAPI()

