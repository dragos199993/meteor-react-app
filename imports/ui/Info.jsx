import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import Links from '../api/links';
import { LINKS } from '../../constants/routes';

const style = {
  display: 'flex',
  justifyContent: 'space-between'
};

/*eslint-disable */
const Info = ({ links, currentUser }) => {

  const removeLink = (id) => {
    Meteor.call('links.remove', id);
  };

  const togglePrivate = (id, isPrivate) => {
    Meteor.call('links.setPrivate', id, isPrivate);
  };

  const toggleChecked = (id, checked) => {
    Meteor.call('links.setChecked', id, checked);
  };

  const makeLink = ({ _id, url, title, checked, username, isPrivate, owner }) => {
    const currentUserId = currentUser && currentUser._id;
    const showPrivateButton = owner === currentUserId;
    if (!showPrivateButton && isPrivate) {
      return null;
    }

    return (
      <ListGroupItem key={_id} style={style}>
        <a href={url}>
          {title}
          by
          {username}
        </a>
        {
          showPrivateButton &&
          <Button onClick={() => removeLink(_id)}>Remove</Button>
        }
        {
          showPrivateButton
          && (
            <Button onClick={() => togglePrivate(_id, isPrivate)}>
              {isPrivate ? 'Private' : 'Public'}
            </Button>
          )
        }
        {
          showPrivateButton &&
          <Button
            onClick={() => toggleChecked(_id, checked)}
            color={checked ? 'success' : 'danger'}
          >
            -
          </Button>
        }
      </ListGroupItem>
    );
  };

  if (!currentUser) {
    return null;
  }

  const allLinks = links.map(
    link => makeLink(link)
  );

  return (
    <ListGroup>
      {allLinks}
    </ListGroup>
  );
};

export default InfoContainer = withTracker(() => {
  Meteor.subscribe(LINKS);

  return {
    links: Links.find().fetch(),
    currentUser: Meteor.user()
  };
})(Info);
