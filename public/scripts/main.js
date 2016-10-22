require(['knockout', 'jquery', 'materialize'], function(ko, jquery, materialize) {
    
    var ViewModel = function() {
        this.firstName = ko.observable();
        this.lastName = ko.observable();
     
        this.fullName = ko.computed(function() {
            // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
            return this.firstName() + " " + this.lastName();
        }, this);
        this.newUrl = ko.observableArray(["url", "key"]);
        this.shouldShowMessage = ko.observable(false);

        this.submitUrl = function() {
            console.log(this.newUrl);
            this.shouldShowMessage(true);
        };
    };

 
    ko.applyBindings(new ViewModel()); // This makes Knockout get to work
});