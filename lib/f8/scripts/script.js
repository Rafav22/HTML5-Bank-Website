(function() {
	
	// login model
	var Credentials = Backbone.Model.extend({});

	var LoginView = Backbone.View.extend({
	  el: $("#login-form"),

	  events: {
		"click #login": "login"
	  },

	  login: function(){
		F8Loaded();
		$('.editable').addClass('f8');
		$('body').prepend('<div id="f8-editor"/>');
		$('#login-form').fadeOut();
		return false;
	  }
	});

	window.LoginView = new LoginView({model: new Credentials()});
	
	function F8Loaded () {
	// f8 editting
    var article = Backbone.Model.extend({
        defaults: {
            title: 'Default Title',
            body: 'Default body text'
        }
    });

    var articleView = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, 'save')
            this.model.bind('save', this.save);
        },

        events: {
            'mousedown .editable': 'editableClick'
        },

        editableClick: etch.editableInit,

        save: function() {

            // normally you would call model.save() here but this is a demo
            $(this.el).find('.editable').effect('highlight', {color: 'yellow'});
            $('.save-event').fadeIn('fast', function() {
                setTimeout($(this).fadeOut('slow'), 10000);
            });
        }
        
    });

    $article = $('.f8-editable-area');
    var model = new article();
    var view = new articleView({model: model, el: $article[0], tagName: $article[0].tagName});
	}
	
})()