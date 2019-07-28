import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import Links from '../api/links';
import { assert } from 'chai';

if (Meteor.isServer) {
  describe('Links', () => {
    describe('methods', () => {
      const userId = Random.id();
      let linkId;

      beforeEach(() => {
        Links.remove({});
        linkId = Links.insert({
          title: "test title",
          url: "test url",
          createdAt: new Date(),
          checked: false,
          isPrivate: true,
          owner: userId,
          username: "testUser"
        });
      });

      it('can delete owned link', () => {
        const deleteTask = Meteor.server.method_handlers['links.remove'];
        const invocation = { userId };

        deleteTask.apply(invocation, [linkId]);
        assert.equal(Links.find().count(), 0);
      });
    });
  });
}
