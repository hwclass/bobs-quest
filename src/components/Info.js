import React from 'react';

const Info = () => {
  const classes = {
    container : 'container',
    row : 'row',
    colxs12 : 'col-xs-12',
    info : 'custom-info'
  }
  return (
    <div className={classes.container, classes.info}>
      <div className={classes.row}>
        <div className={classes.colxs12}>
          This sample app is developed by <a href="https://www.github.com/hwclass">hwclass</a> for challengy aims. 
          You can use it what type app you are working on. Keep calm ;)
        </div>
      </div>
    </div>
  )
}

export default Info;