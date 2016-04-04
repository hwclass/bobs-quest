import React from 'react';
import testStyle from './../../client/css/test.css';

const FoundersListItem = ({founder, onFoundersListItemClick}) => {
  return (
    <tr className="geo-item" onClick={() => onFoundersListItemClick(founder)} key={founder.key}> {founder.CompanyName}, {founder.Founder}>
      <td>
        <img src={founder.Photo}/>
      </td>
      <td>{founder.Founder}</td>
      <td>{founder.City}</td>
      <td>{founder.Country}</td>
      <td>{founder.PostalCode}</td>
      <td>{founder.City}</td>
      <td>{founder.Street}</td>
      <td>{founder.HomePage}</td>
      <td>{founder.GarageLatitude}</td> 
      <td>{founder.GarageLongitude}</td>
    </tr>
  )
}
 
export default FoundersListItem;