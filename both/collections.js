Votes = new Mongo.Collection("votes");
Comments = new Mongo.Collection("comments");
Debates = new Mongo.Collection("debates");
History = new Mongo.Collection("history");
Count = new Mongo.Collection("count");


Debates.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Debates.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  survey: {
    type: String,
    label: "Survey",
    max: 200
  },
  startMsg: {
    type: String,
    optional: true,
    label: "Start Msg",
    max: 200
  },
  order: {
   type: Number,
   label: "Order",
   min: 0
 },
 dependsOn: {
   type: String,
   optional: true,
   label: "Depends On",
   max: 200
 },
 type: {
   type: String,
   label: "Type",
   autoform: {
     afFieldInput: {
       type: "select",
      options: function () {
        return [
          {label: "Landing Page", value: 'LND'},
          {label: "Single Choice", value: 'RDO'},
          {label: "Multiple Choice", value: 'CHK'}
        ];
      }
     }
   }
 },
 opts: {
    type: [String],
    optional: true,
    autoform: {
      afFieldInput: {
        type: "text"
      }
    }
  }

}));
