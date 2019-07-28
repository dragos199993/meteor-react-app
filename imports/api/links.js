import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { LINKS } from '../../constants/routes';
import { NOT_AUTHORIZED } from '../../constants/response';

const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish(LINKS, function linksPublication() {
    return Links.find({
      $or: [
        { isPrivate: { $ne: true } },
        { owner: this.userId }
      ]
    });
  });
}

Meteor.methods({
  'links.insert'(title, url) {
    check(title, String);
    check(url, String);

    if (!this.userId) {
      throw new Meteor.Error(NOT_AUTHORIZED);
    }

    Links.insert({
      title,
      url,
      createdAt: new Date(),
      checked: false,
      isPrivate: true,
      owner: Meteor.userId(),
      username: Meteor.user().username
    })
  },

  'links.remove'(linkId) {
    check(linkId, String);
    const link = Links.findOne(linkId);
    console.log(link.owner);
    if (link.owner !== this.userId) {
      throw new Meteor.Error(NOT_AUTHORIZED);
    }

    Links.remove(linkId);
  },

  'links.setChecked'(linkId, checked) {
    check(linkId, String);
    check(checked, Boolean);

    const link = Links.findOne(linkId);

    if (link.owner !== this.userId) {
      throw new Meteor.Error(NOT_AUTHORIZED);
    }

    Links.update(linkId, {
      $set: {
        checked: !checked
      }
    });
  },

  'links.setPrivate'(linkId, isPrivate) {
    check(linkId, String);
    check(isPrivate, Boolean);

    const link = Links.findOne(linkId);

    if (link.owner !== this.userId) {
      throw new Meteor.Error(NOT_AUTHORIZED);
    }

    Links.update(linkId, { $set: { isPrivate: !isPrivate } });
  }
});

export default Links;
