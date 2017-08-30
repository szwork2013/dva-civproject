import React from 'react';
import { Router } from 'dva/router';

//import { Router, Route } from 'dva/router';

//import DoingBox from "./routes/DoingCases.js";
//
//import DoingCaseDetail from "./routes/DoingCaseDetail.js";
//
//import HandOver from "./routes/HandOver.js";
//
//import DoingCaseHand from "./routes/DoingCaseHand.js";


const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/Login',
      name: 'Login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/Login'));
          cb(null, require('./routes/Login'));
        });
      },
    },
    {
      path: '/',
      name: 'AppIndex',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/AppIndex'));
        });
      },
    },
    {
      path: '/FlowCenter',
      name: 'FlowCenter',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/FlowCenter'));
          cb(null, require('./routes/FlowCenter'));
        });
      },
    },
    {
      path: '/EventReport',
      name: 'EventReport',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/EventReport'));
          cb(null, require('./routes/EventReport'));
        });
      },
    },
    {
      path: '/DoingBox',
      name: 'DoingBox',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/DoingCases'));
          registerModel(app, require('./models/Header'));
          cb(null, require('./routes/DoingBox'));
        });
      },
    },
    {
      path: '/标准工单',
      name: '标准工单',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/DoingCases'));
          registerModel(app, require('./models/Header'));
          cb(null, require('./routes/DoingBox'));
        });
      },
    },
    {
      path: encodeURI('/标准工单'),
      name: encodeURI('标准工单'),
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/DoingCases'));
          registerModel(app, require('./models/Header'));
          cb(null, require('./routes/DoingBox'));
        });
      },
    },
    {
      path: '/DoingCaseDetail',
      name: 'DoingCaseDetail',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/CaseDetail'));
          registerModel(app, require('./models/CaseProcedures'));

          cb(null, require('./routes/DoingCaseDetail'));
          cb(null, require('./components/Common/CaseProcedure'));
        });
      },
    },
    {
      path: '/HandOver',
      name: 'HandOver',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/HandOver'));
          cb(null, require('./routes/HandOver'));
        });
      },
    },
    {
      path: '/DoingCaseHand',
      name: 'DoingCaseHand',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/CaseHand'));
          cb(null, require('./routes/DoingCaseHand'));
        });
      },
    },
    {
      path: '/ImgsShowView',
      name: 'ImgsShowView',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./routes/ImgsShowView'));
        });
      },
    },
    {
      path: '/AllCaseList',
      name: 'AllCaseList',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./modules/AllCaseBox/CaseListModel'));
          registerModel(app, require('./models/Header'));
          cb(null, require('./modules/AllCaseBox/CaseListComponent'));
        });
      },
    },
    {
      path: '/AllCaseDetail',
      name: 'AllCaseDetail',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./modules/AllCaseBox/CaseDetailModel'));
          registerModel(app, require('./models/CaseProcedures'));

          cb(null, require('./modules/AllCaseBox/CaseDetailComponent'));
          cb(null, require('./components/Common/CaseProcedure'));
        });
      },
    },
    {
      path:'/EventBox',
      name:'EventBox',
      getComponent(nextState,cb){
        require.ensure([], (require) => {
          registerModel(app, require('./modules/EventBox/model/EventCases'));
          registerModel(app, require('./models/Header'));
          cb(null, require('./modules/EventBox/component/EventBox'));
        });
      },
    },
    {
      path:'/EventDetail',
      name:'EventDetail',
      getComponent(nextState,cb){
        require.ensure([], (require) => {
          registerModel(app, require('./modules/EventBox/model/EventDetail'));
          cb(null, require('./modules/EventBox/component/EventDetail'));
        });
      },
    },
    {
      path:'/EventDispatchDetail',
      name:'EventDispatchDetail',
      getComponent(nextState,cb){
        require.ensure([], (require) => {
          registerModel(app, require('./modules/EventBox/model/EventDispatchDetail'));
          cb(null, require('./modules/EventBox/component/EventDispatchDetail'));
        });
      },
    },
    {
      path:'/PartrolCount',
      name:'PartrolCount',
      getComponent(nextState,cb){
        require.ensure([], (require) => {
          registerModel(app, require('./modules/PartrolCount/model/PartrolCases'));
          cb(null, require('./modules/PartrolCount/component/PartrolCount'));
        });
      },
    },
    {
      path:'/MaintainScan',
      name:'MaintainScan',
      getComponent(nextState,cb){
        require.ensure([], (require) => {
          registerModel(app, require('./modules/MaintainScan/model/MaintainScanCases'));
          registerModel(app, require('./modules/MaintainScan/model/MaintainScanList'));

          cb(null, require('./modules/MaintainScan/component/MaintainScan'));
        });
      },
    },
    {
      path:'/MaintainScanDetail',
      name:'MaintainScanDetail',
      getComponent(nextState,cb){
        require.ensure([], (require) => {
          registerModel(app, require('./modules/MaintainScan/model/MaintainScanDetail'));
          cb(null, require('./modules/MaintainScan/component/MaintainScanDetail'));
        });
      },
    },
    {
      path:'/PartrolScan',
      name:'PartrolScan',
      getComponent(nextState,cb){
        require.ensure([], (require) => {
          registerModel(app, require('./modules/PartrolScan/model/PartrolScan'));
          cb(null, require('./modules/PartrolScan/component/PartrolScan'));
        });
      },
    },
    {
      path:'/SelectPeople',
      name:'SelectPeople',
      getComponent(nextState,cb){
        require.ensure([], (require) => {
          registerModel(app, require('./modules/EventBox/model/SelectPeople'));
          cb(null, require('./modules/EventBox/component/SelectPeople'));
        });
      },
    },
  ];

  return <Router history={history} routes={routes}/>;
}

//function RouterConfig({ history }) {
//  return (
//    <Router history={history}>
//      <Route path="/" component={DoingBox} />
//      <Route path="/DoingBox" component={DoingBox} />
//      <Route path="/DoingCaseDetail" component={DoingCaseDetail} />
//      <Route path="/HandOver" component={HandOver} />
//      <Route path="/DoingCaseHand" component={DoingCaseHand} />
//    </Router>
//  );
//}

export default RouterConfig;
