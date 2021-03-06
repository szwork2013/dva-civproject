import React, { Component } from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Grid, Icon, Toast } from 'antd-mobile';
import Header from '../components/Header/Header'
import DoingBox from './DoingBox'
import styles from './AppMain.css';


function AppMain({ dispatch }) {


  const itemMenuClick = (_el) => {
    let path = _el.path;
    if (!path) {
      Toast.fail('功能路径未配置', 2);
      return;
    }
    if (path[0] == '/') {
      dispatch(routerRedux.push({
        pathname: path
      }));
    } else {
      top.widgetManager.removeWidgets();
      //web4的功能
      let config = {
        icon: _el.icon.substr(3),
        label: _el.text,
        preload: false,
        url: path,
        widgetId: ""
      };
      top.widgetManager.addWidget(config);

      top.document.getElementById("WebApp").style.visibility = "hidden";
      top.document.getElementsByClassName("viewContainer")[0].style.visibility = "visible";

      top.document.getElementById("WebApp").style.display = "none";
      top.document.getElementsByClassName("viewContainer")[0].style.display = "block";

    }
  }

  const createGroupMenu = (widget) => {
    //item.icon||
    const data = [];
    const widgets = widget.widgets;
    widgets.map((item) => {
      data.push({
        icon: `../${item.icon}`,
        text: item.label,
        path: item.url
      });
    });
    return (
      <div key={widget.label}>
        <div className={styles.subTitle}>{widget.label}</div>
        <Grid className='GridContainer' data={data} hasLine={false} columnNum={4} onClick={(_el, index) => {
          itemMenuClick(_el);
        }} />
      </div>
    )
  }

  let data = [];

  data.push({
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAxNzI1MTk5NjY1IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY2MTciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODc3LjA3MTM4NiA2MjEuNjQ5MTI3djIzMS4yMTc5NTljMCAyMy40NzQ1MjItMTguOTc0MjI1IDQyLjQ0ODc0Ny00Mi40NDg3NDcgNDIuNDQ4NzQ3SDE4OS4zNzczNjFDMTY1LjkwMjgzOSA4OTUuMzE1ODMzIDE0Ni45Mjg2MTQgODc2LjIxOTk3OSAxNDYuOTI4NjE0IDg1Mi44NjcwODZWNjIxLjY0OTEyN2MwLTIzLjQ3NDUyMiAxOC45NzQyMjUtNDIuNDQ4NzQ3IDQyLjQ0ODc0Ny00Mi40NDg3NDcgMjMuNDc0NTIyIDAgNDIuNDQ4NzQ3IDE4Ljk3NDIyNSA0Mi40NDg3NDcgNDIuNDQ4NzQ3djE4OC43NjkyMTJoNTYwLjM0Nzc4NFY2MjEuNjQ5MTI3YzAtMjMuNDc0NTIyIDE4Ljk3NDIyNS00Mi40NDg3NDcgNDIuNDQ4NzQ3LTQyLjQ0ODc0NyAyMy4zNTI4OTIgMCA0Mi40NDg3NDcgMTguOTc0MjI1IDQyLjQ0ODc0NyA0Mi40NDg3NDd6TTM3Mi45MTY0OTggMzc2LjMyMjEyOWw5Ni41NzM5NC05OC42NDE2NDR2MzY3LjU2NDc5NGMwIDIzLjQ3NDUyMiAxOC45NzQyMjUgNDIuNDQ4NzQ3IDQyLjQ0ODc0NyA0Mi40NDg3NDYgMjMuNDc0NTIyIDAgNDIuNDQ4NzQ3LTE4Ljk3NDIyNSA0Mi40NDg3NDctNDIuNDQ4NzQ2VjI3Ny42ODA0ODVsOTYuNTczOTQgOTguNjQxNjQ0YzguMjcwODE2IDguNTE0MDc1IDE5LjMzOTExNCAxMi43NzExMTMgMzAuMjg1NzgyIDEyLjc3MTExMiAxMC43MDM0MDkgMCAyMS40MDY4MTgtNC4wMTM3NzggMjkuNjc3NjM0LTEyLjE2Mjk2NCAxNi43ODQ4OTEtMTYuNDIwMDAyIDE3LjAyODE1MS00My4zMDAxNTQgMC42MDgxNDgtNjAuMDg1MDQ2TDU0Mi4zNDY1OTcgMTQ0LjAwOTUwMmMtOC4wMjc1NTctOC4xNDkxODYtMTguOTc0MjI1LTEyLjc3MTExMy0zMC4yODU3ODItMTIuNzcxMTEzLTExLjQzMzE4NyAwLTIyLjM3OTg1NSA0LjYyMTkyNy0zMC4yODU3ODIgMTIuNzcxMTEzTDMxMi4zNDQ5MzQgMzE2Ljg0NTIzMWMtMTYuNDIwMDAyIDE2Ljc4NDg5MS0xNi4xNzY3NDMgNDMuNjY1MDQzIDAuNjA4MTQ4IDYwLjA4NTA0NnM0My42NjUwNDMgMTYuMDU1MTEzIDU5Ljk2MzQxNi0wLjYwODE0OHoiIHAtaWQ9IjY2MTgiIGZpbGw9IiNkODFlMDYiPjwvcGF0aD48L3N2Zz4=',
    text: '流程中心',
    path: '/FlowCenter'
  });

  data.push({
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAxNzI1MTIzNzgwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjU1NDUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyLjEgMjU2djI4Ny43YzAgMTcuNyAxNC4zIDMyIDMyIDMyczMyLTE0LjMgMzItMzJWMjU2YzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyeiBtNDM3IDM5My43TDc4OC44IDQ4OS40Yy0xMi41LTEyLjUtMzIuOC0xMi41LTQ1LjMgMHMtMTIuNSAzMi44IDAgNDUuM2wxMzcuNyAxMzcuN0w3NDQgODA5LjZjLTEyLjUgMTIuNS0xMi41IDMyLjggMCA0NS4zIDYuMiA2LjIgMTQuNCA5LjQgMjIuNiA5LjRzMTYuNC0zLjEgMjIuNi05LjRMOTQ5LjEgNjk1YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zeiIgZmlsbD0iI2Q4MWUwNiIgcC1pZD0iNTU0NiI+PC9wYXRoPjxwYXRoIGQ9Ik00MDUuOCAyNzguNEw1NDMgMTQxLjJsMTM3LjcgMTM3LjdjNi4yIDYuMiAxNC40IDkuNCAyMi42IDkuNHMxNi40LTMuMSAyMi42LTkuNGMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM0w1NjUuNyA3My4zYy02LTYtMTQuMS05LjQtMjIuNi05LjRzLTE2LjYgMy40LTIyLjYgOS40TDM2MC42IDIzMy4yYy0xMi41IDEyLjUtMTIuNSAzMi44IDAgNDUuMyAxMi41IDEyLjQgMzIuNyAxMi40IDQ1LjItMC4xeiBtLTUzLjcgNDg5LjRjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjEyNy45YzAgMTcuNyAxNC4zIDMyIDMyIDMyczMyLTE0LjMgMzItMzJWNzk5LjhjMC0xNy43LTE0LjQtMzItMzItMzJ6IG0xOTIuMiAwYy0xNy43IDAtMzIgMTQuMy0zMiAzMnYxMjcuOWMwIDE3LjcgMTQuMyAzMiAzMiAzMnMzMi0xNC4zIDMyLTMyVjc5OS44YzAtMTcuNy0xNC4zLTMyLTMyLTMyek04MDEuNSA2NzJjMC0xNy43LTE0LjMtMzItMzItMzItNS4xIDAtNTA4LjYtMC4xLTUyOC43LTAuMi02My44LTMuMy0xMTMuOC01NS45LTExMy44LTEyMCAwLTY2LjMgNTMuOS0xMjAuMiAxMjAuMi0xMjAuMiA2Ni4zIDAgMTIwLjIgNTMuOSAxMjAuMiAxMjAuMiAwIDEyLjUtMS45IDI0LjctNS42IDM2LjQtNS40IDE2LjggNCAzNC44IDIwLjggNDAuMiAxNi44IDUuMyAzNC44LTQgNDAuMi0yMC44IDUuNy0xOCA4LjYtMzYuOCA4LjYtNTUuOCAwLTEwMS42LTgyLjYtMTg0LjItMTg0LjItMTg0LjJTNjMgNDE4LjMgNjMgNTE5LjljMCA0Ny42IDE4LjEgOTIuOCA1MSAxMjcuMyAzMi44IDM0LjMgNzYuOSA1NC40IDEyNC4yIDU2LjcgMy44IDAuMiA1MjUuOSAwLjIgNTMxLjIgMC4yIDE3LjctMC4xIDMyLjEtMTQuNCAzMi4xLTMyLjF6IiBmaWxsPSIjZDgxZTA2IiBwLWlkPSI1NTQ3Ij48L3BhdGg+PC9zdmc+',
    text: '调度箱',
    path: '/EventBox'
  });

  data.push({
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAxNzI1Mjk5NDU3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjgwMzMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTcxLjA5MzMzMyAyMjguODY0TDQ4Mi42ODggNzE3LjMxMkgzMDYuNzMwNjY3di0xNzZMNzk1LjEzNiA1Mi45MDY2NjdBMzQuOTg2NjY3IDM0Ljk4NjY2NyAwIDAgMSA4MjAuMDEwNjY3IDQyLjY2NjY2N2M4Ljk2IDAgMTguMDA1MzMzIDMuMzI4IDI0Ljg3NDY2NiAxMC4yNGwxMjYuMjUwNjY3IDEyNi4yMDhjNi44MjY2NjcgNi44NjkzMzMgMTAuMTk3MzMzIDE1LjgyOTMzMyAxMC4xOTczMzMgMjQuODc0NjY2YTM0Ljk4NjY2NyAzNC45ODY2NjcgMCAwIDEtMTAuMjQgMjQuODc0NjY3ek04MjAuMDUzMzMzIDE0NS4zMjI2NjdMMzk0LjY2NjY2NyA1NzAuNjY2NjY3djU4LjY2NjY2Nmg1OC42NjY2NjZsNDI1LjM0NC00MjUuMzQ0LTU4LjY2NjY2Ni01OC42NjY2NjZ6TTUzMy4zMzMzMzMgMTcwLjY2NjY2N0gxNzAuNjY2NjY3djY4Mi42NjY2NjZoNjgyLjY2NjY2NnYtMzYyLjY2NjY2NmMwLTI0LjMyIDE5LjcxMi00My45ODkzMzMgNDMuOTg5MzM0LTQzLjk4OTMzNCAyNC4zMiAwIDQxLjM0NCAxOS43MTIgNDEuMzQ0IDQzLjk4OTMzNHYzODRjMCAzMi4zODQtMjEuMzMzMzMzIDY0LTY0IDY0aC03MjUuMzMzMzM0Yy0zMi4zODQgMC02NC0yMS4zMzMzMzMtNjQtNjR2LTcyNS4zMzMzMzRDODUuMzMzMzMzIDEwNi42NjY2NjcgMTE2Ljk0OTMzMyA4NS4zMzMzMzMgMTQ5LjMzMzMzMyA4NS4zMzMzMzNoMzg0YzI0LjMyIDAgNDIuNjY2NjY3IDE4LjM0NjY2NyA0Mi42NjY2NjcgNDIuNjY2NjY3IDAgMjQuMzItMTguMzQ2NjY3IDQyLjY2NjY2Ny00Mi42NjY2NjcgNDIuNjY2NjY3eiIgcC1pZD0iODAzNCIgZmlsbD0iI2Q4MWUwNiI+PC9wYXRoPjwvc3ZnPg==',
    text: '工单办理',
    path: '/DoingBox'
  });

  data.push({
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAxNzI1MDY5NDAzIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ4MTciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjEzLjg2OTcxNCAxNDAuODczMTQzaDIxNC42MDExNDNjMzIuMzI5MTQzIDAgNTguNTE0Mjg2IDI2LjE4NTE0MyA1OC41MTQyODYgNTguNTE0Mjg2djIyNC4yNTZjMCAzMi4zMjkxNDMtMjYuMTg1MTQzIDU4LjUxNDI4Ni01OC41MTQyODYgNTguNTE0Mjg1SDIxMy44Njk3MTRjLTMyLjMyOTE0MyAwLTU4LjUxNDI4Ni0yNi4xODUxNDMtNTguNTE0Mjg1LTU4LjUxNDI4NVYxOTkuMzg3NDI5YzAtMzIuMzI5MTQzIDI2LjE4NTE0My01OC41MTQyODYgNTguNTE0Mjg1LTU4LjUxNDI4NnpNMjEzLjg2OTcxNCA1NDYuNjY5NzE0aDIxNC42MDExNDNjMzIuMzI5MTQzIDAgNTguNTE0Mjg2IDI2LjE4NTE0MyA1OC41MTQyODYgNTguNTE0Mjg2djIyNC4yNTZjMCAzMi4zMjkxNDMtMjYuMTg1MTQzIDU4LjUxNDI4Ni01OC41MTQyODYgNTguNTE0Mjg2SDIxMy44Njk3MTRjLTMyLjMyOTE0MyAwLTU4LjUxNDI4Ni0yNi4xODUxNDMtNTguNTE0Mjg1LTU4LjUxNDI4NlY2MDUuMTg0YzAtMzIuMzI5MTQzIDI2LjE4NTE0My01OC41MTQyODYgNTguNTE0Mjg1LTU4LjUxNDI4NnpNNjEwLjQ1MDI4NiA2MzIuMzkzMTQzSDgyNS4wNTE0MjljMzIuMzI5MTQzIDAgNTguNTE0Mjg2IDI2LjE4NTE0MyA1OC41MTQyODUgNTguNTE0Mjg2djEzOC41MzI1NzFjMCAzMi4zMjkxNDMtMjYuMTg1MTQzIDU4LjUxNDI4Ni01OC41MTQyODUgNTguNTE0Mjg2SDYxMC40NTAyODZjLTMyLjMyOTE0MyAwLTU4LjUxNDI4Ni0yNi4xODUxNDMtNTguNTE0Mjg2LTU4LjUxNDI4NnYtMTM4LjUzMjU3MWMwLTMyLjMyOTE0MyAyNi4xODUxNDMtNTguNTE0Mjg2IDU4LjUxNDI4Ni01OC41MTQyODZ6TTYxMC40NTAyODYgMTQwLjg3MzE0M0g4MjUuMDUxNDI5YzMyLjMyOTE0MyAwIDU4LjUxNDI4NiAyNi4xODUxNDMgNTguNTE0Mjg1IDU4LjUxNDI4NnYzMTUuODMwODU3YzAgMzIuMzI5MTQzLTI2LjE4NTE0MyA1OC41MTQyODYtNTguNTE0Mjg1IDU4LjUxNDI4NUg2MTAuNDUwMjg2Yy0zMi4zMjkxNDMgMC01OC41MTQyODYtMjYuMTg1MTQzLTU4LjUxNDI4Ni01OC41MTQyODVWMTk5LjM4NzQyOWMwLTMyLjMyOTE0MyAyNi4xODUxNDMtNTguNTE0Mjg2IDU4LjUxNDI4Ni01OC41MTQyODZ6IiBwLWlkPSI0ODE4IiBmaWxsPSIjZDgxZTA2Ij48L3BhdGg+PC9zdmc+',
    text: '工单总览',
    path: '/AllCaseList'
  });

  const menus = [];

  menus.push(<div key='工单中心'>
    <div className={styles.subTitle}>工单中心</div>

    <Grid className='GridContainer' data={data} hasLine={false} columnNum={4} onClick={(_el, index) => {
      itemMenuClick(_el);
    }} />
  </div>);

  data = [];

  data.push({
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAwNTM2NjUxMTQ3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUwMTEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzc5LjY0NCAzOTcuNjU1SDQyMy4yMzZ2MzA5Ljk2N2gzNTYuNDA4VjM5Ny42NTV6IG0tNDQuNTcgMjY1LjQySDQ2Ny44MDNWNDQyLjJoMjY3LjI3MXYyMjAuODc2eiBtLTQ5MC4wMi0yNjUuNDJIMzYwLjYxdjMwOS45NjdIMjQ1LjA1NFYzOTcuNjU1eiIgZmlsbD0iI2Q4MWUwNiIgcC1pZD0iNTAxMiI+PC9wYXRoPjxwYXRoIGQ9Ik0xMTIuNTcgMTYyLjQ2N3Y2OTAuNTk4aDgwMC45MDZWMTYyLjQ2N0gxMTIuNTd6IG02NS42NzQgNDYuMjQ0SDg0Ny4xMXY2My42OTRIMTc4LjI0NHYtNjMuNjk0ek04NDYuNjkgNzg2LjIzNkgxNzkuNFYzMTguMzg3aDY2Ny4yOXY0NjcuODQ5eiIgZmlsbD0iI2Q4MWUwNiIgcC1pZD0iNTAxMyI+PC9wYXRoPjwvc3ZnPg==',
    text: '巡线统计',
    path: '/PartrolCount'
  });
  data.push({
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAwNTM2NjUxMTQ3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUwMTEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzc5LjY0NCAzOTcuNjU1SDQyMy4yMzZ2MzA5Ljk2N2gzNTYuNDA4VjM5Ny42NTV6IG0tNDQuNTcgMjY1LjQySDQ2Ny44MDNWNDQyLjJoMjY3LjI3MXYyMjAuODc2eiBtLTQ5MC4wMi0yNjUuNDJIMzYwLjYxdjMwOS45NjdIMjQ1LjA1NFYzOTcuNjU1eiIgZmlsbD0iI2Q4MWUwNiIgcC1pZD0iNTAxMiI+PC9wYXRoPjxwYXRoIGQ9Ik0xMTIuNTcgMTYyLjQ2N3Y2OTAuNTk4aDgwMC45MDZWMTYyLjQ2N0gxMTIuNTd6IG02NS42NzQgNDYuMjQ0SDg0Ny4xMXY2My42OTRIMTc4LjI0NHYtNjMuNjk0ek04NDYuNjkgNzg2LjIzNkgxNzkuNFYzMTguMzg3aDY2Ny4yOXY0NjcuODQ5eiIgZmlsbD0iI2Q4MWUwNiIgcC1pZD0iNTAxMyI+PC9wYXRoPjwvc3ZnPg==',
    text: '养护总览',
    path: '/MaintainScan'
  });
  data.push({
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAxNzI1MDY5NDAzIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ4MTciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjEzLjg2OTcxNCAxNDAuODczMTQzaDIxNC42MDExNDNjMzIuMzI5MTQzIDAgNTguNTE0Mjg2IDI2LjE4NTE0MyA1OC41MTQyODYgNTguNTE0Mjg2djIyNC4yNTZjMCAzMi4zMjkxNDMtMjYuMTg1MTQzIDU4LjUxNDI4Ni01OC41MTQyODYgNTguNTE0Mjg1SDIxMy44Njk3MTRjLTMyLjMyOTE0MyAwLTU4LjUxNDI4Ni0yNi4xODUxNDMtNTguNTE0Mjg1LTU4LjUxNDI4NVYxOTkuMzg3NDI5YzAtMzIuMzI5MTQzIDI2LjE4NTE0My01OC41MTQyODYgNTguNTE0Mjg1LTU4LjUxNDI4NnpNMjEzLjg2OTcxNCA1NDYuNjY5NzE0aDIxNC42MDExNDNjMzIuMzI5MTQzIDAgNTguNTE0Mjg2IDI2LjE4NTE0MyA1OC41MTQyODYgNTguNTE0Mjg2djIyNC4yNTZjMCAzMi4zMjkxNDMtMjYuMTg1MTQzIDU4LjUxNDI4Ni01OC41MTQyODYgNTguNTE0Mjg2SDIxMy44Njk3MTRjLTMyLjMyOTE0MyAwLTU4LjUxNDI4Ni0yNi4xODUxNDMtNTguNTE0Mjg1LTU4LjUxNDI4NlY2MDUuMTg0YzAtMzIuMzI5MTQzIDI2LjE4NTE0My01OC41MTQyODYgNTguNTE0Mjg1LTU4LjUxNDI4NnpNNjEwLjQ1MDI4NiA2MzIuMzkzMTQzSDgyNS4wNTE0MjljMzIuMzI5MTQzIDAgNTguNTE0Mjg2IDI2LjE4NTE0MyA1OC41MTQyODUgNTguNTE0Mjg2djEzOC41MzI1NzFjMCAzMi4zMjkxNDMtMjYuMTg1MTQzIDU4LjUxNDI4Ni01OC41MTQyODUgNTguNTE0Mjg2SDYxMC40NTAyODZjLTMyLjMyOTE0MyAwLTU4LjUxNDI4Ni0yNi4xODUxNDMtNTguNTE0Mjg2LTU4LjUxNDI4NnYtMTM4LjUzMjU3MWMwLTMyLjMyOTE0MyAyNi4xODUxNDMtNTguNTE0Mjg2IDU4LjUxNDI4Ni01OC41MTQyODZ6TTYxMC40NTAyODYgMTQwLjg3MzE0M0g4MjUuMDUxNDI5YzMyLjMyOTE0MyAwIDU4LjUxNDI4NiAyNi4xODUxNDMgNTguNTE0Mjg1IDU4LjUxNDI4NnYzMTUuODMwODU3YzAgMzIuMzI5MTQzLTI2LjE4NTE0MyA1OC41MTQyODYtNTguNTE0Mjg1IDU4LjUxNDI4NUg2MTAuNDUwMjg2Yy0zMi4zMjkxNDMgMC01OC41MTQyODYtMjYuMTg1MTQzLTU4LjUxNDI4Ni01OC41MTQyODVWMTk5LjM4NzQyOWMwLTMyLjMyOTE0MyAyNi4xODUxNDMtNTguNTE0Mjg2IDU4LjUxNDI4Ni01OC41MTQyODZ6IiBwLWlkPSI0ODE4IiBmaWxsPSIjZDgxZTA2Ij48L3BhdGg+PC9zdmc+',
    text: '巡检总览',
    path: '/PartrolScan'
  });

  menus.push(<div key='巡线中心'>
    <div className={styles.subTitle}>巡线中心</div>

    <Grid className='GridContainer' data={data} hasLine={false} columnNum={4} onClick={(_el, index) => {
      itemMenuClick(_el);
    }} />
  </div>);

  //Web4中的配（从web4进入才有）
  if (top._config) {
    const widgets = top._config.widgets;
    for (let i = 0; i < widgets.length; i++) {
      const curWidget = widgets[i];
      const menuGroupLabel = curWidget.label;
      if (menuGroupLabel == '地图') {
        continue;
      }
      const menu = createGroupMenu(curWidget);
      if (menu == '') {
        continue;
      }
      menus.push(menu);
    }
  }

  return (<div>{menus}</div>);
}

function mapStateToProps() {
  return {};
}
export default connect(mapStateToProps)(AppMain);

