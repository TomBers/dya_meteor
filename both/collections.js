Votes = new Mongo.Collection("votes");
Comments = new Mongo.Collection("comments");
Questions = new Mongo.Collection("questions");
Analysis = new Mongo.Collection("analysis");
Count = new Mongo.Collection("count");
Survey = new Mongo.Collection("survey");

Survey.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Survey.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  surveyType: {
    type: String,
    label: "Survey Type",
    autoform: {
      afFieldInput: {
        type: "select",
       options: function () {
         return [
           {label: "Continuous Scrolling", value: 'CS'},
           {label: "Single Page", value: 'SP'},
           {label: "Debate", value: 'DB'}
         ];
       }
      }
    }
  },
 endLink: {
   type: String,
   optional: true,
   label: "End Link",
   max: 200
 }
  }));
// surveyType:'SV',survey:this.params._id,noPages:4,endLink:'http://bbc.co.uk'


Questions.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Questions.attachSchema(new SimpleSchema({
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
 visible: {
   type: Boolean,
   label: "Is this visible?",
   autoform: {
     afFieldInput: {
       type: "select",
      options: function () {
        return [
          {label: "Yes", value: true},
          {label: "No", value: false},
        ];
      }
     }
   }
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
          {label: "Multiple Choice", value: 'CHK'},
          {label: "Register Interest", value: 'RI'}
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
  },
  cols: {
     type: [String],
     optional: true,
     autoform: {
       afFieldInput: {
         type: "text"
       }
     }
   }

}));
