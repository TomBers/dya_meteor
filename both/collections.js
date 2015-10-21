Votes = new Mongo.Collection("votes");
Comments = new Mongo.Collection("comments");
Questions = new Mongo.Collection("questions");
Analysis = new Mongo.Collection("analysis");
Count = new Mongo.Collection("count");
Survey = new Mongo.Collection("survey");
Contacts = new Mongo.Collection("Contacts");

Survey.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Survey.attachSchema(new SimpleSchema({
  owner: {
    type: String,
    label: "Owner",
    optional:true,
    max: 200
  },
  title: {
    type: String,
    label: "Title",
    unique: true,
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
           {label: "Survey", value: 'SV'},
          //  {label: "Single Page", value: 'SP'},
           {label: "Debate", value: 'DB'}
         ];
       }
      }
    }
  },
  // cols: {
  //   //  type: [String],
  //   type: String,
  //    optional: true,
  //    autoform: {
  //      afFieldInput: {
  //        type: "bootstrap-minicolors"
  //      }
  //    }
  //  },

  cols:{
    type:Array,
    label: "Colours",
    optional:true
  },
  'cols.$':{
    type: Object
  },
  'cols.$.col': {
    type: String,
       optional: true,
       autoform: {
         afFieldInput: {
           type: "bootstrap-minicolors"
         }
       }
 },
 styling:{
   type: String,
   optional: true,
     autoform: {
        rows: 5
     }
 },
 startMsg: {
   type: String,
   optional: false,
   label: "Introduction text",
   max: 200
 },
 endLink: {
   type: String,
   optional: true,
   label: "End Link (A web page to show at the end of the survey)",
   max: 200
 }
  }));



Questions.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Questions.attachSchema(new SimpleSchema({
  title: {
    type: String,
    // optional: true,
    label: "Title or Question",
    max: 200
  },
  survey: {
    type: String,
    // optional: true,
    label: "Survey",
    max: 200,
    // autoValue: function(d) {
    //   if (this.isInsert) {
    //
    //   }
    // }
  },
  // startMsg: {
  //   type: String,
  //   optional: true,
  //   label: "Start Msg",
  //   max: 200
  // },
  order: {
   type: Number,
   optional: true,
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
   optional: true,
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
          // {label: "Landing Page", value: 'LND'},
          {label: "User selects 1 choice from your options (Used for a vote)", value: 'RDO'},
          {label: "User selects 1 or more choices from your options (Used to show preferences)", value: 'CHK'},
          {label: "Pick Positive/Neutral/Negative from image", value: 'SML'},
          {label: "Comment", value: 'CMMT'},
          {label: "Scale", value: 'SCL'},
          {label: "Live (Do you agree or disagree with a point as it is discussed)", value: 'RI'}
          // ,{label: "Video", value: 'VID'}
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
  // piOpts: {
  //    type: [String],
  //    optional: true,
  //    autoform: {
  //      afFieldInput: {
  //        type: "text"
  //      }
  //    }
  //  },


}));
