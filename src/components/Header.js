import React from 'react';

const Header = () => {
  const classes = {
    nav : 'navbar navbar-default navbar-fixed-top',
    container : 'container',
    navbarHeader : 'navbar-header',
    navbarToggleCollapsed : 'navbar-toggle collapsed',
    srOnly : 'sr-only',
    iconBar : 'icon-bar',
    navbarBrand : 'navbar-brand',
    navbarCollapseCollapse : 'navbar-collapse collapse',
    navNavbarNavNavbarRight : 'nav navbar-nav navbar-right',
    about : 'about'
  }
  const customAttr = {
    data : {
      toggle : {
        collapse : 'collapse'
      },
      target : '#navbar'
    },
    aria : {
      expanded : 'false',
      controls : 'navbar'
    }
  }
  return (
    <nav className={classes.nav}>
      <div className={classes.container}>
        <div className={classes.navbarHeader}>
          <button type="button" className={classes.navbarToggleCollapsed} data-toggle={customAttr.data.toggle.collapse} data-target={customAttr.data.target} aria-expanded={customAttr.aria.expanded} aria-controls={customAttr.aria.controls}>
            <span className={classes.srOnly}>Toggle navigation</span>
            <span className={classes.iconBar}></span>
            <span className={classes.iconBar}></span>
            <span className={classes.iconBar}></span>
          </button>
          <a className={classes.navbarBrand} href="#">Bobs Quest</a>
        </div>
        <div id="navbar" className={classes.navbarCollapseCollapse}>
          <ul className={classes.navNavbarNavNavbarRight}>
            <li><a href="#" className={classes.about}>About</a></li>
          </ul>
        </div>
      </div>
    </nav>
	)
};

export default Header;