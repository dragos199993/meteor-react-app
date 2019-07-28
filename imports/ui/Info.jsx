import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Links } from '../api/links';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Meteor } from 'meteor/meteor';

const style = {
  display: 'flex',
  justifyContent: 'space-between'
};

const Info = ({ links, currentUser }) => {

  const removeLink = (id) => {
    Meteor.call('links.remove', id);
  };

  const makeLink = ({ _id, url, title, checked, username }) => {
    return (
      <ListGroupItem key={ _id } style={ style }>
        <a href={ url } target="_blank">
          { title } -> by { username }
        </a>
        <Button onClick={ () => removeLink(_id) }>Remove</Button>
        <Button onClick={ () => toggleChecked(_id, checked) } color={ checked ? 'success' : 'danger' }>
          -
        </Button>
      </ListGroupItem>
    );
  };

  const toggleChecked = (id, checked) => {
    Meteor.call('links.setChecked', id, checked);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <ListGroup>
      {
        links.map(
          link => makeLink(link)
        )
      }
    </ListGroup>
  );
};

export default InfoContainer = withTracker(() => {
  return {
    links: Links.find().fetch(),
    currentUser: Meteor.user()
  };
})(Info);
