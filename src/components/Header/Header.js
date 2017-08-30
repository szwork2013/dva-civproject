import React ,{Component} from 'react'
import{Link,IndexLink} from 'dva/router'
import styles from './Header.css'
import { connect } from 'dva';
class Header extends Component{
  constructor(props,context){
    super(props,context);
    this.state = {
      showHide:'none',
    }
    this.showNav = ()=>{
      if (this.state.showHide == 'block') {
        this.setState({showHide:'none'})
      }else {
        this.setState({showHide:'block'})
      }
    }
  }

  render(){
    let {nav,title,goback,params} = this.props;
    let navState = this.state.showHide;
    if (nav) {
      nav = (
        <div className={styles.head_menu} onClick={this.showNav}>
          <ul className={styles.head_listname} style={{display:navState}} >
            {
              this.props.DataMenuList.map((item,index)=>{
                  return <ListItem key={index} {...item}/>
              })
            }

          </ul>
        </div>
      );
    }

    if (goback) {
      goback =(<span className={styles.head_goback} onClick={() => window.history.back()}>返回</span>);
    }
    return(
      <div className={styles.normal}>
        {nav}
        {goback}
        {
          title&&<span className={styles.head_title}>{title}</span>
        }
      </div>
    )
  }
}
class ListItem extends Component{
  constructor(){
    super()

    this.state = {}
  }
  render(){
    let {Alias,Icon,Name,NodeID}=this.props;
    return (
      <li>
        <Link to='/'>
          <span>{Alias}</span>
          <span className={styles.head_arrow}></span>
        </Link>
      </li>
    );
  }

}

function mapStateToProps(state) {
  const { DataMenuList} = state.Header||[];
  return {
    DataMenuList
  };
}

export default connect(mapStateToProps)(Header);
