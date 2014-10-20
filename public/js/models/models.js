window.Plant= Backbone.Model.extend({

    urlRoot: "/plants",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };
        
        this.validators.latitude = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a longitude"};
          };
            
        this.validators.longitude = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a latitude"};
          };
        
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        latitude: "",
        longitude: "",
        name: "",
        description: "",
        picture: null
    }
});

window.PlantCollection = Backbone.Collection.extend({

    model: Plant,

    url: "/plants"

});