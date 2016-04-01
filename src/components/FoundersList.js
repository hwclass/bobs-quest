import React from 'react';
import FoundersListItem from './FoundersListItem';
import ShowAllButton from './ShowAllButton';

const FoundersList = (props) => {

  const founders = props.foundersList.map((founder) => {
    return (
      <FoundersListItem 
        key={Math.random(Date.now() * 100)} 
        founder={founder} 
        onFoundersListItemClick={props.onFoundersListItemClick}/>
    )
  })

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <caption className="text-center">Founders List</caption>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Founder</th>
                <th>Location</th>
                <th>Country</th>
                <th>City</th>
                <th>Postal Code</th>
                <th>Address</th>
                <th>Home Page</th>
                <th>Garage Latitude</th>
                <th>Garage Longitude</th>
              </tr>
            </thead>
            <tbody>
              {founders}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="10">
                  <ShowAllButton onShowAllButtonClick={props.onShowAllButtonClick}/>
                </td>
              </tr>
              <tr>
                <td colSpan="10" className="text-center">
                  <span>Latest Update : </span>
                  <span>{props.latestUpdate}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  ) 
  
}

export default FoundersList;