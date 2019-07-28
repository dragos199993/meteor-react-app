import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Links = new Mongo.Collection('links');

Meteor.methods({
  'links.insert'(title, url) {
    check(title, String);
    check(url, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Links.insert({
      title,
      url,
      createdAt: new Date(),
      checked: false,
      owner: Meteor.userId(),
      username: Meteor.user().username
    })
  },

  'links.remove'(linkId) {
    check(linkId, String);

    Links.remove(linkId);
  },

  'links.setChecked'(linkId, checked) {
    check(linkId, String);
    check(checked, Boolean);

    Links.update(linkId, {
      $set: {
        checked: !checked
      }
    });
  }
});
